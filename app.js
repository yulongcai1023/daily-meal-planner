import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { createDailyMenu, getRecipeDatabaseStats } from "./recipe-engine.js?v=20260715-strict2";
import { EXERCISES, SPLITS, generateWorkoutPlan, getExerciseAlternatives, validateWorkoutPlan } from "./workout-engine.js?v=20260715-workout1";

const firebaseConfig = {
  apiKey: "AIzaSyD2POa9NJxDPVz0CfCHVQQJEYnYkmUAnEM",
  authDomain: "food-b5162.firebaseapp.com",
  projectId: "food-b5162",
  storageBucket: "food-b5162.firebasestorage.app",
  messagingSenderId: "467674185358",
  appId: "1:467674185358:web:99c6473e18219e7a6d13df",
  measurementId: "G-KQ8G0VY4S2"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// 食谱推荐逻辑已迁移到 recipe-engine.js：食材、做法、模板和份量都由模块化数据库动态组合。

const form = document.querySelector("#profile-form");
const results = document.querySelector("#results");
let latestProfile = null;

const authModal = document.querySelector("#auth-modal");
const authForm = document.querySelector("#auth-form");
const authUsername = document.querySelector("#auth-username");
const authPassword = document.querySelector("#auth-password");
const authConfirmPassword = document.querySelector("#auth-confirm-password");
const authSecurityCode = document.querySelector("#auth-security-code");
const authNewPassword = document.querySelector("#auth-new-password");
const authError = document.querySelector("#auth-error");
const toast = document.querySelector("#toast");
const forgotPasswordButton = document.querySelector("#forgot-password");
let authMode = "login";
let currentUser = null;
let currentUserProfile = null;
let toastTimer = null;
let currentWorkoutPlan = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function normalizeUsername(username) {
  return username.trim().toLocaleLowerCase();
}

function validateUsername(username) {
  return /^[\p{L}\p{N}_-]{3,20}$/u.test(username);
}

function usernameToAuthEmail(username) {
  return `${normalizeUsername(username)}@daily-meal-planner.local`;
}

function setFieldVisibility(name, visible) {
  const wrapper = document.querySelector(`[data-auth-field="${name}"]`);
  if (!wrapper) return;
  wrapper.hidden = !visible;
  const input = wrapper.querySelector("input");
  if (input) input.required = visible;
}

function newSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
}

async function hashSecret(secret, salt) {
  if (!globalThis.crypto?.subtle) throw new Error("当前浏览器不支持安全加密，请换用新版浏览器。");
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(secret), "PBKDF2", false, ["deriveBits"]);
  const digest = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    salt: encoder.encode(salt),
    iterations: 120000,
    hash: "SHA-256"
  }, keyMaterial, 256);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

function setAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll("[data-auth-mode]").forEach(tab => {
    const active = tab.dataset.authMode === mode;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isRecover = mode === "recover";
  document.querySelector("#auth-title").textContent = isLogin ? "欢迎回来" : isRegister ? "创建云端账号" : "找回密码";
  document.querySelector("#auth-description").textContent = isLogin
    ? "输入用户名和密码，登录后自动从 Firebase 恢复身体数据。"
    : isRegister
      ? "注册用户名后，每次生成食谱都会自动同步到 Firebase。"
      : "输入用户名、安全码和新密码，验证通过后重置登录密码。";
  document.querySelector("#auth-submit").textContent = isLogin ? "登录并恢复档案" : isRegister ? "注册并开始使用" : "验证安全码并重置密码";
  authPassword.autocomplete = isLogin ? "current-password" : "new-password";
  setFieldVisibility("password", !isRecover);
  setFieldVisibility("confirm-password", isRegister);
  setFieldVisibility("security-code", isRegister || isRecover);
  setFieldVisibility("new-password", isRecover);
  forgotPasswordButton.hidden = isRecover;
  authError.textContent = "";
}

function openAuth(mode = "login") {
  setAuthMode(mode);
  authModal.classList.add("is-open");
  authModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  authUsername.focus();
}

function closeAuth() {
  authModal.classList.remove("is-open");
  authModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  authForm.reset();
  authError.textContent = "";
}

function applyProfile(profile) {
  if (!profile) return;
  document.querySelector("#height").value = profile.height;
  document.querySelector("#weight").value = profile.weight;
  document.querySelector("#age").value = profile.age;
  document.querySelector("#sex").value = profile.sex;
  const activity = document.querySelector(`input[name="activity"][value="${profile.activity}"]`);
  const goal = document.querySelector(`input[name="goal"][value="${profile.goal}"]`);
  if (activity) activity.checked = true;
  if (goal) goal.checked = true;
}

async function loadCloudUser(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? snapshot.data() : null;
}

function formatFirebaseError(error) {
  const messages = {
    "auth/email-already-in-use": "这个邮箱已经注册过，请直接登录。",
    "auth/invalid-email": "请输入有效的邮箱地址。",
    "auth/invalid-credential": "用户名或密码不正确。",
    "auth/user-not-found": "没有找到这个用户名对应的账号。",
    "auth/wrong-password": "用户名或密码不正确。",
    "auth/weak-password": "密码强度太弱，至少需要 6 个字符。",
    "auth/operation-not-allowed": "Firebase 还没有启用邮箱密码登录，请先在 Firebase Console 开启 Email/Password。",
    "permission-denied": "Firestore 权限不足，请确认安全规则已部署。",
    "auth/username-taken": "这个用户名已经被注册，请换一个。",
    "auth/recovery-failed": "用户名或安全码不正确。"
  };
  return messages[error.code] || error.message || "操作失败，请稍后重试。";
}

async function updateAuthUI(restoreProfile = false) {
  if (!currentUser) {
    document.querySelector("#guest-actions").hidden = false;
    document.querySelector("#user-actions").hidden = true;
    return;
  }
  document.querySelector("#guest-actions").hidden = true;
  document.querySelector("#user-actions").hidden = false;
  document.querySelector("#current-username").textContent = currentUserProfile?.username || currentUser.email || "已登录用户";
  if (restoreProfile) {
    try {
      currentUserProfile = await loadCloudUser(currentUser.uid);
      document.querySelector("#current-username").textContent = currentUserProfile?.username || currentUser.email || "已登录用户";
      if (currentUserProfile?.profile) {
        applyProfile(currentUserProfile.profile);
        latestProfile = currentUserProfile.profile;
        showToast("已从 Firebase 恢复个人数据");
      }
    } catch (error) {
      showToast(formatFirebaseError(error));
    }
  }
}

async function saveProfileForCurrentUser(profile) {
  if (!currentUser) return;
  await setDoc(doc(db, "users", currentUser.uid), {
    username: currentUserProfile?.username || null,
    authEmail: currentUser.email,
    profile,
    updatedAt: serverTimestamp()
  }, { merge: true });
  showToast("个人数据已同步到 Firebase");
}

document.querySelector("#open-auth").addEventListener("click", () => openAuth("login"));
document.querySelector("#logout-button").addEventListener("click", async () => {
  await signOut(auth);
  showToast("已退出登录");
});
forgotPasswordButton.addEventListener("click", () => setAuthMode("recover"));
document.querySelectorAll("[data-close-auth]").forEach(element => element.addEventListener("click", closeAuth));
document.querySelectorAll("[data-auth-mode]").forEach(tab => tab.addEventListener("click", () => setAuthMode(tab.dataset.authMode)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && authModal.classList.contains("is-open")) closeAuth();
});

authForm.addEventListener("submit", async event => {
  event.preventDefault();
  authError.textContent = "";
  const username = authUsername.value.trim();
  const normalizedUsername = normalizeUsername(username);
  const password = authPassword.value;
  const confirmPassword = authConfirmPassword.value;
  const securityCode = authSecurityCode.value;
  const newPassword = authNewPassword.value;
  if (!validateUsername(username)) {
    authError.textContent = "用户名需为 3–20 个文字、字母、数字、下划线或短横线。";
    return;
  }
  if (authMode !== "recover" && password.length < 6) {
    authError.textContent = "密码至少需要 6 个字符。";
    return;
  }
  if (authMode === "register" && password !== confirmPassword) {
    authError.textContent = "两次输入的密码不一致。";
    return;
  }
  if ((authMode === "register" || authMode === "recover") && securityCode.length < 6) {
    authError.textContent = "安全码至少需要 6 个字符。";
    return;
  }
  if (authMode === "recover" && newPassword.length < 6) {
    authError.textContent = "新密码至少需要 6 个字符。";
    return;
  }
  try {
    if (authMode === "register") {
      const usernameRef = doc(db, "usernames", normalizedUsername);
      const existingUsername = await getDoc(usernameRef);
      if (existingUsername.exists()) throw { code: "auth/username-taken" };
      const authEmail = usernameToAuthEmail(username);
      const credential = await createUserWithEmailAndPassword(auth, authEmail, password);
      const recoverySalt = newSalt();
      const recoveryCodeHash = await hashSecret(securityCode, recoverySalt);
      await setDoc(doc(db, "users", credential.user.uid), {
        username,
        normalizedUsername,
        authEmail,
        recoverySalt,
        recoveryCodeHash,
        profile: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
      await setDoc(usernameRef, {
        uid: credential.user.uid,
        username,
        authEmail,
        createdAt: serverTimestamp()
      });
    } else {
      if (authMode === "recover") {
        const response = await fetch("/api/recover-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, securityCode, newPassword })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw { code: result.code || "auth/recovery-failed", message: result.message };
        await signInWithEmailAndPassword(auth, usernameToAuthEmail(username), newPassword);
      } else {
        await signInWithEmailAndPassword(auth, usernameToAuthEmail(username), password);
      }
    }
    closeAuth();
    showToast(authMode === "register" ? "注册成功，已登录" : authMode === "recover" ? "密码已重置并登录" : "登录成功");
  } catch (error) {
    authError.textContent = formatFirebaseError(error);
  }
});

onAuthStateChanged(auth, user => {
  currentUser = user;
  if (!user) currentUserProfile = null;
  updateAuthUI(true);
});

function calculate(profile) {
  const { height, weight, age, sex, activity, goal } = profile;
  const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);
  const maintenance = bmr * activity;
  const multiplier = goal === "lose" ? .85 : goal === "gain" ? 1.12 : 1;
  const lowerLimit = sex === "male" ? 1500 : 1200;
  const calories = Math.round(Math.max(maintenance * multiplier, lowerLimit) / 10) * 10;
  const activityProteinBonus = activity >= 1.725 ? .25 : activity >= 1.55 ? .15 : activity >= 1.375 ? .05 : 0;
  const proteinPerKg = (goal === "lose" ? 1.7 : goal === "gain" ? 1.85 : 1.45) + activityProteinBonus;
  const protein = Math.round(weight * proteinPerKg);
  const fatRatio = goal === "lose" ? .25 : goal === "gain" ? .26 : .28;
  const fat = Math.round(calories * fatRatio / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  const bmi = weight / ((height / 100) ** 2);
  return { bmr: Math.round(bmr), maintenance: Math.round(maintenance), calories, protein, fat, carbs, bmi, floorApplied: maintenance * multiplier < lowerLimit };
}

function bmiText(bmi) {
  if (bmi < 18.5) return "偏低";
  if (bmi < 24) return "正常范围";
  if (bmi < 28) return "偏高";
  return "较高";
}

function createMenu(profile, nutrition) {
  return createDailyMenu(profile, nutrition);
}

const recipeModal = document.querySelector("#recipe-modal");
const recipeCloseButton = document.querySelector(".recipe-close");
let recipeReturnFocus = null;

function recipeInstructions(meal, mealType) {
  const names = meal.foods.map(([name]) => name);
  const first = names[0] || "食材";
  const rest = names.slice(1);
  const restText = rest.join("、");
  const noCook = /酸奶|水果|坚果|奇亚籽|奶酪/.test(meal.name) || names.some(name => /酸奶|水果|坚果|奇亚籽|奶酪|巴旦木|杏仁|核桃|腰果|开心果|榛子/.test(name));

  if (noCook) {
    return {
      time: meal.time || "3–10 分钟",
      steps: [
        `将${names.filter(name => !/酸奶|奶酪|燕麦|奇亚籽|杏仁|核桃|腰果|开心果|榛子|巴旦木/.test(name)).join("、") || first}洗净切块。`,
        `杯中加入${names.filter(name => /酸奶|奶酪|燕麦|奇亚籽/.test(name)).join("、") || first}。`,
        restText ? `放入${restText}。` : `放入${first}。`,
        `轻轻混合${names.join("、")}，摆盘即可。`
      ],
      tip: "此兜底做法只使用当前食材列表，不额外引入未列出的食材或加热动作。"
    };
  }

  return {
    time: meal.time || "15–30 分钟",
    steps: [
      `将${names.join("、")}按食谱份量准备好。`,
      restText ? `处理${first}，并将${restText}洗净切好。` : `处理${first}至适口大小。`,
      `按菜品需要完成${names.join("、")}的熟制或组合。`,
      `确认${names.join("、")}状态适口后装盘。`
    ],
    tip: "此兜底做法只使用当前食材列表，不额外引入未列出的食材。"
  };
}

function openRecipe(meal, mealType, trigger) {
  const guide = meal.steps ? { time: meal.time, steps: meal.steps, tip: meal.tip || "按需微调盐和酱料，烹调油建议计量使用。" } : recipeInstructions(meal, mealType);
  recipeReturnFocus = trigger;
  document.querySelector("#recipe-detail-icon").textContent = meal.icon;
  document.querySelector("#recipe-detail-meta").textContent = `${mealType} · 约 ${meal.kcal} kcal · 蛋白 ${meal.protein || "-"}g · 脂肪 ${meal.fat || "-"}g · 碳水 ${meal.carbs || "-"}g · ${guide.time}`;
  document.querySelector("#recipe-title").textContent = meal.name;
  document.querySelector("#recipe-ingredients").innerHTML = meal.foods.map(([name, amount, unit]) => `<li><span>${name}</span><b>${amount}${unit}</b></li>`).join("");
  document.querySelector("#recipe-steps").innerHTML = guide.steps.map(step => `<li>${step}</li>`).join("");
  document.querySelector("#recipe-tip").textContent = `小贴士：${guide.tip}`;
  recipeModal.classList.add("is-open");
  recipeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  recipeCloseButton.focus();
}

function closeRecipe() {
  recipeModal.classList.remove("is-open");
  recipeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (recipeReturnFocus) recipeReturnFocus.focus();
}

document.querySelectorAll("[data-close-recipe]").forEach(element => element.addEventListener("click", closeRecipe));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && recipeModal.classList.contains("is-open")) closeRecipe();
});

function render(profile) {
  const nutrition = calculate(profile);
  const menu = createMenu(profile, nutrition);
  const actual = menu.reduce((sum, meal) => sum + meal.kcal, 0);
  const labels = ["早餐", "午餐", "加餐", "晚餐"];
  const goalLabels = { lose: "温和减脂", maintain: "保持体重", gain: "稳步增重" };
  const stats = getRecipeDatabaseStats();
  results.innerHTML = `
    <div class="result-head">
      <div><h2>今日食养方案</h2><p>${goalLabels[profile.goal]} · 预计维持热量 ${nutrition.maintenance} kcal · ${stats.proteins}类蛋白 / ${stats.vegetables}种蔬菜 / ${stats.methods}种做法 · 可组合约 ${stats.comboEstimate.toLocaleString()} 种</p></div>
      <button class="refresh-btn" id="refresh-menu" type="button">换一组 ↻</button>
    </div>
    <div class="metrics">
      <div class="metric"><strong>${nutrition.calories}</strong><span>目标千卡 kcal</span></div>
      <div class="metric"><strong>${nutrition.protein}g</strong><span>蛋白质</span></div>
      <div class="metric"><strong>${nutrition.carbs}g</strong><span>碳水</span></div>
      <div class="metric"><strong>${nutrition.fat}g</strong><span>脂肪</span></div>
    </div>
    <p class="bmi-note">BMI ${nutrition.bmi.toFixed(1)} · ${bmiText(nutrition.bmi)}　|　基础代谢约 ${nutrition.bmr} kcal</p>
    <div class="meal-list">
      ${menu.map((meal, index) => `
        <article class="meal" data-meal-index="${index}" role="button" tabindex="0" aria-label="查看${meal.name}的详细做法">
          <div class="meal-icon">${meal.icon}</div>
          <div><h3>${labels[index]} · ${meal.name}</h3><p>${meal.foods.map(([f, a, u]) => `${f} ${a}${u}`).join(" ／ ")}</p><span class="meal-action">${meal.method || "家常"} · 蛋白 ${meal.protein || 0}g · 脂肪 ${meal.fat || 0}g · 碳水 ${meal.carbs || 0}g · 查看详细做法 →</span></div>
          <span class="meal-kcal">${meal.kcal} kcal</span>
        </article>`).join("")}
    </div>
    <div class="intake-bar"><p><span>食谱计划摄入</span><b>${actual} / ${nutrition.calories} kcal</b></p><div class="track"><span style="width:${Math.min(100, actual / nutrition.calories * 100)}%"></span></div></div>
    <p class="safety">${nutrition.floorApplied ? "已触发基础安全下限，未继续降低热量。" : "建议每日实际摄入保持在目标值上下约 10% 内。"} 食材重量为可食部估算值；烹调油、酱料和含糖饮料也需计入。连续 2–3 周观察体重与精神状态后再小幅调整。</p>`;
  document.querySelector("#refresh-menu").addEventListener("click", () => render(profile));
  document.querySelectorAll(".meal").forEach(card => {
    const open = () => openRecipe(menu[Number(card.dataset.mealIndex)], labels[Number(card.dataset.mealIndex)], card);
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
    });
  });
}

const TRAINING_STORAGE_KEY = "dailyMealPlanner.trainingSettings.v1";
const TRAINING_OPTION_GROUPS = {
  equipment: ["无器械", "瑜伽垫", "弹力带", "可调哑铃", "固定哑铃", "壶铃", "杠铃", "深蹲架", "史密斯机", "卧推凳", "拉力器", "高位下拉器", "腿举机", "腿屈伸机", "腿弯举机", "跑步机", "椭圆机", "单车", "划船机", "引体向上杆", "双杠", "牧师椅", "爬楼机", "器械推胸", "器械肩推", "髋外展机", "跳绳"],
  limitations: ["无明显限制", "肩部不适", "腰部不适", "膝盖不适", "手腕不适", "肘部不适", "不能做深蹲类动作", "不能做硬拉类动作", "不适合高冲击"],
  muscles: ["全身均衡", "胸", "背", "肩", "手臂", "臀", "腿", "核心"],
  styles: ["喜欢自由重量", "喜欢固定器械", "喜欢自重训练", "喜欢力量训练", "喜欢循环训练", "不喜欢跑步", "不喜欢高强度间歇训练"]
};

const goalLabelMap = {
  fatLoss: "减脂",
  muscleGain: "增肌",
  shape: "塑形",
  strength: "力量提升",
  conditioning: "体能提升",
  health: "健康活动"
};
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const equipmentIconMap = { "无器械": "🤸", "瑜伽垫": "🧘", "弹力带": "🪢", "可调哑铃": "🏋️", "固定哑铃": "🏋️", "壶铃": "🔔", "杠铃": "🏋️", "深蹲架": "🏋️", "史密斯机": "🏋️", "卧推凳": "🪑", "拉力器": "🧵", "高位下拉器": "🧲", "腿举机": "🦵", "腿屈伸机": "🦵", "腿弯举机": "🦵", "跑步机": "🏃", "椭圆机": "👟", "单车": "🚴", "划船机": "🚣", "引体向上杆": "🧗", "双杠": "💪", "牧师椅": "🪑", "爬楼机": "🪜", "器械推胸": "🏋️", "器械肩推": "💪", "髋外展机": "🍑", "跳绳": "🪢" };
const limitationIconMap = { "无明显限制": "✅", "肩部不适": "💪", "腰部不适": "🦴", "膝盖不适": "🦵", "手腕不适": "🖐", "肘部不适": "💪", "不能做深蹲类动作": "🚫", "不能做硬拉类动作": "⚠️", "不适合高冲击": "🪶" };
const muscleIconMap = { "全身均衡": "⚖️", "胸": "🛡️", "背": "🪽", "肩": "💪", "手臂": "💪", "臀": "🍑", "腿": "🦵", "核心": "🔥" };

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function setupSectionTabs() {
  document.querySelectorAll(".top-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.sectionTarget;
      document.querySelectorAll(".top-tab").forEach(item => item.classList.toggle("is-active", item === tab));
      document.querySelectorAll(".app-section").forEach(section => {
        const active = section.id === `${target}-section`;
        section.classList.toggle("is-active", active);
        section.hidden = !active;
      });
    });
  });
}

function optionIcon(value, name) {
  if (name === "training-equipment") return equipmentIconMap[value] || "🏷️";
  if (name === "training-limitations") return limitationIconMap[value] || "⚕️";
  if (name === "training-muscles") return muscleIconMap[value] || "🎯";
  return "✓";
}

function renderTagOptions(id, values, name, selected = []) {
  const container = document.querySelector(id);
  if (!container) return;
  const selectedSet = new Set(selected);
  if (name === "training-styles") {
    container.innerHTML = values.map(value => `
      <label class="switch-option">
        <input type="checkbox" name="${name}" value="${escapeHtml(value)}" ${selectedSet.has(value) ? "checked" : ""}>
        <span class="switch-ui"></span>
        <span>${escapeHtml(value)}</span>
      </label>
    `).join("");
    return;
  }
  container.innerHTML = values.map(value => `
    <label class="tag-option chip-option" data-chip-label="${escapeHtml(value)}">
      <input type="checkbox" name="${name}" value="${escapeHtml(value)}" ${selectedSet.has(value) ? "checked" : ""}>
      <span><b>${optionIcon(value, name)}</b>${escapeHtml(value)}</span>
    </label>
  `).join("");
}

function checkedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value);
}

function loadTrainingSettings() {
  try {
    return JSON.parse(localStorage.getItem(TRAINING_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveTrainingSettings(settings) {
  localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(settings));
}

async function saveWorkoutPlanForCurrentUser(settings, plan) {
  if (!currentUser) return;
  await setDoc(doc(db, "trainingProfiles", currentUser.uid), {
    userId: currentUser.uid,
    ...settings,
    updatedAt: serverTimestamp()
  }, { merge: true });
  await setDoc(doc(db, "workoutPlans", `${currentUser.uid}_${plan.id}`), {
    userId: currentUser.uid,
    ...plan,
    status: "active",
    version: 1,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp()
  }, { merge: true });
}

function collectTrainingSettings() {
  const dislikedRaw = document.querySelector("#disliked-exercises")?.value || "";
  let limitations = checkedValues("training-limitations");
  if (limitations.includes("无明显限制") && limitations.length > 1) limitations = limitations.filter(item => item !== "无明显限制");
  return {
    primaryGoal: document.querySelector("#training-primary-goal").value,
    secondaryGoal: document.querySelector("#training-secondary-goal").value,
    experienceLevel: document.querySelector("#experience-level").value,
    weeklyTrainingDays: Number(document.querySelector("#weekly-training-days").value),
    sessionDuration: Number(document.querySelector("#session-duration").value),
    trainingLocation: document.querySelector("#training-location").value,
    availableEquipment: checkedValues("training-equipment"),
    limitations,
    priorityMuscles: checkedValues("training-muscles"),
    preferredStyles: checkedValues("training-styles"),
    selectedSplit: document.querySelector("#selected-split").value,
    cardioPreference: document.querySelector("#cardio-preference").value,
    dislikedExercises: dislikedRaw.split(/[，,、\n]/).map(item => item.trim()).filter(Boolean)
  };
}

function applyTrainingSettings(settings = {}) {
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    if (element && value !== undefined) element.value = value;
  };
  setValue("#training-primary-goal", settings.primaryGoal);
  setValue("#training-secondary-goal", settings.secondaryGoal);
  setValue("#experience-level", settings.experienceLevel);
  setValue("#weekly-training-days", settings.weeklyTrainingDays);
  setValue("#session-duration", settings.sessionDuration);
  setValue("#training-location", settings.trainingLocation);
  setValue("#selected-split", settings.selectedSplit);
  setValue("#cardio-preference", settings.cardioPreference);
  const disliked = document.querySelector("#disliked-exercises");
  if (disliked && settings.dislikedExercises) disliked.value = settings.dislikedExercises.join("、");
  renderTagOptions("#equipment-options", TRAINING_OPTION_GROUPS.equipment, "training-equipment", settings.availableEquipment || ["瑜伽垫", "可调哑铃"]);
  renderTagOptions("#limitation-options", TRAINING_OPTION_GROUPS.limitations, "training-limitations", settings.limitations || ["无明显限制"]);
  renderTagOptions("#muscle-options", TRAINING_OPTION_GROUPS.muscles, "training-muscles", settings.priorityMuscles || ["全身均衡"]);
  renderTagOptions("#style-options", TRAINING_OPTION_GROUPS.styles, "training-styles", settings.preferredStyles || ["喜欢力量训练"]);
  const experience = settings.experienceLevel || "beginner";
  const segmentValue = experience === "novice" ? "beginner" : experience;
  const segment = document.querySelector(`input[name="experience-segment"][value="${segmentValue}"]`);
  if (segment) segment.checked = true;
}

function updateTrainingCompletion() {
  const checks = Array.from(document.querySelectorAll(".exercise-done"));
  const done = checks.filter(input => input.checked).length;
  const percent = checks.length ? Math.round(done / checks.length * 100) : 0;
  document.querySelectorAll("#training-completion, #hero-training-completion").forEach(target => target.textContent = `${percent}%`);
  document.querySelectorAll("#training-progress-bar, #hero-training-progress-bar").forEach(target => target.style.width = `${percent}%`);
}

function setWorkoutLoading(loading) {
  const button = document.querySelector("#generate-workout-button");
  if (!button) return;
  button.disabled = loading;
  button.classList.toggle("is-loading", loading);
  button.innerHTML = loading ? `<span class="spinner"></span> Building Plan...` : `<span>⚡</span> Generate Workout`;
}

function exerciseIcon(exercise) {
  if (/胸/.test(exercise.category)) return "🏋️";
  if (/背/.test(exercise.category)) return "🪽";
  if (/肩|手臂/.test(exercise.category)) return "💪";
  if (/腿|臀/.test(exercise.category)) return "🦵";
  if (/核心/.test(exercise.category)) return "🔥";
  if (/有氧/.test(exercise.category)) return "🏃";
  return "🏋️";
}

function openExerciseSheet(dayIndex, exerciseIndex) {
  const sheet = document.querySelector("#exercise-sheet");
  const options = document.querySelector("#sheet-options");
  const current = currentWorkoutPlan?.days?.[dayIndex]?.exercises?.[exerciseIndex];
  if (!sheet || !options || !current) return;
  const alternatives = getExerciseAlternatives(current.exerciseId, currentWorkoutPlan.settings)
    .filter(item => !currentWorkoutPlan.days[dayIndex].exercises.some(row => row.exerciseId === item.id));
  options.innerHTML = alternatives.length ? alternatives.map(item => `
    <button class="sheet-option" type="button" data-alt-id="${item.id}" data-day-index="${dayIndex}" data-exercise-index="${exerciseIndex}">
      <span>${exerciseIcon(item)}</span>
      <div><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.englishName)} · ${item.equipment.join("、")}</small></div>
    </button>
  `).join("") : `<p class="sheet-empty">当前设置下暂时没有更合适的替换动作。</p>`;
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeExerciseSheet() {
  const sheet = document.querySelector("#exercise-sheet");
  if (!sheet) return;
  sheet.classList.remove("is-open");
  sheet.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function replaceExercise(dayIndex, exerciseIndex, altId) {
  const next = EXERCISES.find(item => item.id === altId);
  if (!next || !currentWorkoutPlan) return;
  const current = currentWorkoutPlan.days[dayIndex].exercises[exerciseIndex];
  currentWorkoutPlan.days[dayIndex].exercises[exerciseIndex] = {
    ...current,
    exerciseId: next.id,
    name: next.name,
    englishName: next.englishName,
    category: next.category,
    targetMuscles: [...next.primaryMuscles, ...next.secondaryMuscles].filter((value, i, arr) => arr.indexOf(value) === i),
    equipment: next.equipment,
    instructions: next.instructions,
    commonMistakes: next.commonMistakes,
    alternatives: getExerciseAlternatives(next.id, currentWorkoutPlan.settings).map(alt => ({ id: alt.id, name: alt.name }))
  };
  const validation = validateWorkoutPlan(currentWorkoutPlan, currentWorkoutPlan.settings);
  if (!validation.ok) {
    showToast(validation.errors[0] || "替换后校验未通过。");
    return;
  }
  closeExerciseSheet();
  renderWorkoutPlan(currentWorkoutPlan);
}

function renderWorkoutPlan(plan) {
  currentWorkoutPlan = plan;
  const splitName = SPLITS[plan.splitType]?.name || plan.splitType;
  const trainingDays = plan.days.filter(day => !day.isRest);
  const totalExercises = trainingDays.reduce((sum, day) => sum + day.exercises.length, 0);
  const totalMinutes = trainingDays.reduce((sum, day) => sum + day.estimatedDuration, 0);
  const todayIndex = plan.days.findIndex(day => !day.isRest);
  const today = plan.days[todayIndex] || plan.days[0];
  const resultsNode = document.querySelector("#training-results");
  resultsNode.innerHTML = `
    <div class="workout-overview-card">
      <div>
        <span class="pill">${goalLabelMap[plan.goal] || plan.goal}</span>
        <h2>${today.isRest ? "Recovery Day" : today.theme}</h2>
        <p>${today.isRest ? "今天安排恢复，让身体真正长回来。" : escapeHtml(today.focus)}</p>
      </div>
      <div class="overview-metrics">
        <div><strong>${today.isRest ? "0" : today.estimatedDuration}</strong><span>分钟</span></div>
        <div><strong>${today.isRest ? "0" : today.exercises.length}</strong><span>动作</span></div>
        <div><strong>${today.isRest ? "—" : today.estimatedCalories}</strong><span>kcal</span></div>
      </div>
      <div class="today-progress">
        <div><span>Today's Progress</span><b id="training-completion">0%</b></div>
        <div class="fitness-progress"><span id="training-progress-bar" style="width:0%"></span></div>
      </div>
    </div>

    <div class="week-strip" aria-label="一周训练视图">
      ${plan.days.map((day, dayIndex) => `
        <button class="week-day ${dayIndex === todayIndex ? "is-active" : ""} ${day.isRest ? "is-rest" : ""}" type="button" data-scroll-day="${dayIndex}">
          <span>${dayNames[dayIndex] || `Day ${dayIndex + 1}`}</span>
          <b>${escapeHtml(day.isRest ? "Rest" : day.theme)}</b>
          <small>${day.isRest ? "恢复" : `${day.exercises.length} 动作`}</small>
        </button>
      `).join("")}
    </div>

    <div class="plan-meta-row">
      <div><strong>${splitName}</strong><span>训练分化</span></div>
      <div><strong>${trainingDays.length} 天</strong><span>每周训练</span></div>
      <div><strong>${totalExercises}</strong><span>动作总数</span></div>
      <div><strong>${totalMinutes} 分钟</strong><span>周训练时长</span></div>
    </div>

    ${plan.warnings.length ? `<div class="warning-list compact">${plan.warnings.map(item => `<p>⚠️ ${escapeHtml(item)}</p>`).join("")}</div>` : ""}

    <div class="workout-week modern-week">
      ${plan.days.map((day, dayIndex) => day.isRest ? `
        <article class="workout-day rest-day modern-day" id="workout-day-${dayIndex}">
          <div class="workout-day-head"><div><span class="pill muted">${dayNames[dayIndex]}</span><h3>${day.theme}</h3><p>${day.recovery.join(" · ")}</p></div><span>Rest</span></div>
        </article>
      ` : `
        <article class="workout-day modern-day" id="workout-day-${dayIndex}">
          <div class="workout-day-head">
            <div><span class="pill">${dayNames[dayIndex]}</span><h3>${day.day} · ${day.theme}</h3><p>${escapeHtml(day.focus)}</p></div>
            <span>${day.estimatedDuration} min · 🔥 ${day.estimatedCalories}</span>
          </div>
          <div class="prep-row">
            <details class="prep-card"><summary>🔥 热身 <b>5分钟</b></summary><p>${day.warmup.join("；")}</p></details>
            <details class="prep-card"><summary>🧘 Cool Down <b>3–5分钟</b></summary><p>${day.cooldown.join("；")}</p></details>
          </div>
          <div class="exercise-list modern-exercises">
            ${day.exercises.map((exercise, exerciseIndex) => `
              <details class="exercise-card" data-day-index="${dayIndex}" data-exercise-index="${exerciseIndex}">
                <summary>
                  <div class="exercise-main">
                    <span class="exercise-avatar">${exerciseIcon(exercise)}</span>
                    <div><b>${escapeHtml(exercise.name)}</b><small>${escapeHtml(exercise.category)} · ${exercise.targetMuscles.join(" / ")}</small></div>
                  </div>
                  <div class="exercise-prescription">
                    <span>${exercise.sets} × ${exercise.reps}</span>
                    <span>${exercise.intensity.replace("RIR ", "RIR ")}</span>
                    <span>${exercise.restSeconds}秒</span>
                  </div>
                  <button class="exercise-menu" type="button" data-open-sheet="${dayIndex}:${exerciseIndex}" aria-label="替换动作">⋮</button>
                </summary>
                <div class="exercise-detail">
                  <div class="exercise-visual">GIF</div>
                  <div>
                    <h4>动作说明</h4>
                    <ol>${exercise.instructions.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
                    <p><b>目标肌群：</b>${exercise.targetMuscles.join("、")}</p>
                    <p><b>常见错误：</b>${exercise.commonMistakes.map(escapeHtml).join("、")}</p>
                    ${exercise.alternatives.length ? `<p><b>替代动作：</b>${exercise.alternatives.map(item => escapeHtml(item.name)).join("、")}</p>` : ""}
                  </div>
                  <div class="workout-log-card">
                    <h4>Workout Log</h4>
                    <label>Weight<input type="number" min="0" step="0.5" placeholder="20 kg"></label>
                    <label>Reps<input type="text" placeholder="10"></label>
                    <label>RIR<input type="text" placeholder="2"></label>
                    <label>Notes<input type="text" placeholder="今天状态、动作感受"></label>
                    <label class="done-switch"><input class="exercise-done" type="checkbox"><span>完成动作</span></label>
                    <button class="save-set-button" type="button">Save Set</button>
                  </div>
                </div>
              </details>
            `).join("")}
          </div>
          ${day.cardio ? `<div class="cardio-card">🏃 有氧：${escapeHtml(day.cardio.name)} · ${day.cardio.reps} · ${escapeHtml(day.cardio.note)}</div>` : ""}
        </article>
      `).join("")}
    </div>

    <details class="plan-note modern-note">
      <summary>进阶、饮食联动与安全提示</summary>
      <p><b>进阶规则：</b>${plan.progression.join(" ")}</p>
      <p><b>饮食联动：</b>${escapeHtml(plan.nutritionLink)}</p>
      ${plan.safety.map(item => `<p>安全提示：${escapeHtml(item)}</p>`).join("")}
    </details>
  `;
  document.querySelectorAll(".exercise-done").forEach(input => input.addEventListener("change", updateTrainingCompletion));
  document.querySelectorAll("[data-scroll-day]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(`#workout-day-${button.dataset.scrollDay}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  document.querySelectorAll("[data-open-sheet]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const [dayIndex, exerciseIndex] = button.dataset.openSheet.split(":").map(Number);
      openExerciseSheet(dayIndex, exerciseIndex);
    });
  });
  document.querySelectorAll(".save-set-button").forEach(button => button.addEventListener("click", () => showToast("本组记录已保存在当前页面。")));
  updateTrainingCompletion();
}

function setupTrainingUI() {
  setupSectionTabs();
  applyTrainingSettings(loadTrainingSettings());
  document.querySelectorAll('input[name="experience-segment"]').forEach(input => {
    input.addEventListener("change", () => {
      const select = document.querySelector("#experience-level");
      if (select) select.value = input.value;
    });
  });
  document.querySelector("#equipment-search")?.addEventListener("input", event => {
    const keyword = event.target.value.trim().toLocaleLowerCase();
    document.querySelectorAll("#equipment-options .chip-option").forEach(chip => {
      chip.hidden = keyword && !chip.dataset.chipLabel.toLocaleLowerCase().includes(keyword);
    });
  });
  document.querySelectorAll("[data-toggle-chips]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.toggleChips}`);
      if (!target) return;
      target.classList.toggle("is-collapsed");
      button.textContent = target.classList.contains("is-collapsed") ? "展开更多" : "收起";
    });
  });
  document.querySelectorAll("[data-close-sheet]").forEach(item => item.addEventListener("click", closeExerciseSheet));
  document.querySelector("#sheet-options")?.addEventListener("click", event => {
    const option = event.target.closest(".sheet-option");
    if (!option) return;
    replaceExercise(Number(option.dataset.dayIndex), Number(option.dataset.exerciseIndex), option.dataset.altId);
  });
  const trainingForm = document.querySelector("#training-form");
  if (!trainingForm) return;
  trainingForm.addEventListener("submit", async event => {
    event.preventDefault();
    const settings = collectTrainingSettings();
    const error = document.querySelector("#training-error");
    setWorkoutLoading(true);
    if (!settings.availableEquipment.length && settings.trainingLocation !== "homeNone") {
      error.textContent = "请至少选择一种可用器械；如果没有器械，请选择“无器械”。";
      setWorkoutLoading(false);
      return;
    }
    error.textContent = "";
    saveTrainingSettings(settings);
    const { plan, errors, warnings } = generateWorkoutPlan(settings, latestProfile || currentUserProfile || {});
    if (!plan) {
      error.textContent = `暂时无法生成安全计划：${(errors || warnings || []).join("；")}`;
      setWorkoutLoading(false);
      return;
    }
    try {
      await saveWorkoutPlanForCurrentUser(settings, plan);
      if (currentUser) showToast("训练计划已保存到账号。");
    } catch (saveError) {
      showToast(formatFirebaseError(saveError));
    }
    renderWorkoutPlan(plan);
    setWorkoutLoading(false);
    if (window.innerWidth < 900) document.querySelector("#training-results").scrollIntoView({ behavior: "smooth" });
  });
}

setupTrainingUI();

form.addEventListener("submit", async event => {
  event.preventDefault();
  const profile = {
    height: Number(document.querySelector("#height").value),
    weight: Number(document.querySelector("#weight").value),
    age: Number(document.querySelector("#age").value),
    sex: document.querySelector("#sex").value,
    activity: Number(document.querySelector('input[name="activity"]:checked').value),
    goal: document.querySelector('input[name="goal"]:checked').value
  };
  const error = document.querySelector("#form-error");
  if (profile.height < 130 || profile.height > 220 || profile.weight < 35 || profile.weight > 250 || profile.age < 18 || profile.age > 80) {
    error.textContent = "请填写范围内的有效数据（仅适用于 18–80 岁成年人）。";
    return;
  }
  error.textContent = "";
  latestProfile = profile;
  try {
    await saveProfileForCurrentUser(profile);
  } catch (saveError) {
    showToast(formatFirebaseError(saveError));
  }
  render(profile);
  if (window.innerWidth < 900) results.scrollIntoView({ behavior: "smooth" });
});
