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
import { INGREDIENT_CATALOG, generateRecipesFromInventory } from "./inventory-engine.js?v=20260715-inventory1";

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

// 食谱推荐逻辑已迁移到 inventory-engine.js：只使用用户选择的现有食材生成候选食谱。

const form = document.querySelector("#profile-form");
const results = document.querySelector("#results");
let latestProfile = null;
const INVENTORY_STORE_KEY = "dailyMealPlanner.inventory.v1";
let inventoryState = [];
let customIngredients = [];

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

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

const categoryLabels = {
  protein: "蛋白质",
  staple: "主食",
  vegetable: "蔬菜",
  fruit: "水果",
  nut: "坚果和种子",
  seasoning: "调味料"
};

function readInventoryStore() {
  try {
    const data = JSON.parse(localStorage.getItem(INVENTORY_STORE_KEY)) || {};
    inventoryState = Array.isArray(data.inventory) ? data.inventory : [];
    customIngredients = Array.isArray(data.customIngredients) ? data.customIngredients : [];
  } catch {
    inventoryState = [];
    customIngredients = [];
  }
}

function saveInventoryStore() {
  localStorage.setItem(INVENTORY_STORE_KEY, JSON.stringify({ inventory: inventoryState, customIngredients }));
}

function allIngredients() {
  return [...INGREDIENT_CATALOG, ...customIngredients];
}

function stateFor(id) {
  return inventoryState.find(item => item.id === id);
}

function upsertInventory(id, patch = {}) {
  const existing = stateFor(id);
  if (patch.role && patch.role !== "forbidden") patch.forbidden = false;
  if (patch.role === "forbidden") patch.forbidden = true;
  if (existing) Object.assign(existing, patch);
  else inventoryState.push({ id, role: "available", stock: null, ...patch });
  saveInventoryStore();
  renderSelectedIngredients();
  renderIngredientCatalog();
}

function removeInventory(id) {
  inventoryState = inventoryState.filter(item => item.id !== id);
  saveInventoryStore();
  renderSelectedIngredients();
  renderIngredientCatalog();
}

function renderIngredientCatalog() {
  const host = document.querySelector("#ingredient-catalog");
  if (!host) return;
  const keyword = document.querySelector("#ingredient-search")?.value.trim().toLowerCase() || "";
  const ingredients = allIngredients().filter(ingredient => {
    if (!keyword) return true;
    return [ingredient.name, ...(ingredient.aliases || [])].some(text => text.toLowerCase().includes(keyword));
  });
  host.innerHTML = Object.entries(categoryLabels).map(([category, label]) => {
    const items = ingredients.filter(ingredient => ingredient.category === category);
    if (!items.length) return "";
    return `<section class="ingredient-category"><h3>${label}</h3><div class="ingredient-grid">
      ${items.map(ingredient => {
        const selected = Boolean(stateFor(ingredient.id));
        return `<label class="ingredient-option ${selected ? "is-selected" : ""}">
          <input type="checkbox" data-ingredient-id="${ingredient.id}" ${selected ? "checked" : ""} />
          <span>${ingredient.name}</span>
        </label>`;
      }).join("")}
    </div></section>`;
  }).join("");
  host.querySelectorAll("[data-ingredient-id]").forEach(input => {
    input.addEventListener("change", event => {
      const id = event.currentTarget.dataset.ingredientId;
      if (event.currentTarget.checked) upsertInventory(id);
      else removeInventory(id);
    });
  });
}

function renderSelectedIngredients() {
  const host = document.querySelector("#selected-ingredients");
  if (!host) return;
  const ingredients = allIngredients();
  if (!inventoryState.length) {
    host.innerHTML = `<p class="privacy-note">还没有选择食材。至少选择 2–3 种食材后再生成。</p>`;
    return;
  }
  host.innerHTML = inventoryState.map(entry => {
    const ingredient = ingredients.find(item => item.id === entry.id);
    if (!ingredient) return "";
    return `<div class="selected-card" data-selected-id="${entry.id}">
      <strong>${ingredient.name}</strong>
      <input type="number" min="0" step="1" placeholder="库存" value="${entry.stock || ""}" aria-label="${ingredient.name}库存" />
      <select aria-label="${ingredient.name}使用方式">
        <option value="available" ${entry.role === "available" ? "selected" : ""}>可以使用</option>
        <option value="must" ${entry.role === "must" ? "selected" : ""}>必须使用</option>
        <option value="priority" ${entry.role === "priority" ? "selected" : ""}>优先消耗</option>
        <option value="forbidden" ${entry.role === "forbidden" ? "selected" : ""}>禁忌/过敏</option>
      </select>
      <button type="button" aria-label="删除${ingredient.name}">×</button>
    </div>`;
  }).join("");
  host.querySelectorAll(".selected-card").forEach(card => {
    const id = card.dataset.selectedId;
    card.querySelector("input").addEventListener("input", event => upsertInventory(id, { stock: event.target.value ? Number(event.target.value) : null }));
    card.querySelector("select").addEventListener("change", event => upsertInventory(id, { role: event.target.value }));
    card.querySelector("button").addEventListener("click", () => removeInventory(id));
  });
}

function setupInventoryUI() {
  readInventoryStore();
  renderIngredientCatalog();
  renderSelectedIngredients();
  document.querySelector("#ingredient-search")?.addEventListener("input", renderIngredientCatalog);
  document.querySelector("#select-common-seasonings")?.addEventListener("click", () => {
    ["salt", "black_pepper", "water", "cooking_oil", "soy_sauce", "vinegar", "olive_oil", "garlic", "ginger", "scallion"].forEach(id => upsertInventory(id));
    showToast("已选择常用调味料");
  });
  document.querySelector("#clear-inventory")?.addEventListener("click", () => {
    inventoryState = [];
    saveInventoryStore();
    renderIngredientCatalog();
    renderSelectedIngredients();
  });
  document.querySelector("#add-custom-ingredient")?.addEventListener("click", () => {
    const nameInput = document.querySelector("#custom-ingredient-name");
    const name = nameInput.value.trim();
    if (!name) return;
    const category = document.querySelector("#custom-ingredient-category").value;
    const id = `custom_${Date.now()}`;
    customIngredients.push({ id, name, category, aliases: [], unit: category === "seasoning" ? "g" : "g", caloriesPer100g: 0, proteinPer100g: 0, fatPer100g: 0, carbsPer100g: 0, isStaple: category === "staple", isSeasoning: category === "seasoning", isOptional: true, tags: [] });
    upsertInventory(id);
    nameInput.value = "";
  });
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

function selectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
}

function createMenu(profile, nutrition) {
  return generateRecipesFromInventory(inventoryState, {
    profile,
    nutrition,
    mealTypes: selectedValues("mealType"),
    filters: selectedValues("recipeFilter"),
    count: 6,
    allowBasicSeasoning: document.querySelector("#allow-basic-seasoning").checked,
    strictSeasoning: document.querySelector("#strict-seasoning").checked
  });
}

const recipeModal = document.querySelector("#recipe-modal");
const recipeCloseButton = document.querySelector(".recipe-close");
const deductInventoryButton = document.querySelector("#deduct-inventory");
let recipeReturnFocus = null;
let activeRecipe = null;

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
  activeRecipe = meal;
  recipeReturnFocus = trigger;
  document.querySelector("#recipe-detail-icon").textContent = meal.icon;
  document.querySelector("#recipe-detail-meta").textContent = `${mealType} · 约 ${meal.kcal} kcal · 蛋白 ${meal.protein || "-"}g · 脂肪 ${meal.fat || "-"}g · 碳水 ${meal.carbs || "-"}g · ${guide.time}`;
  document.querySelector("#recipe-title").textContent = meal.name;
  document.querySelector("#recipe-ingredients").innerHTML = meal.foods.map(([name, amount, unit]) => `<li><span>${name}</span><b>${amount}${unit}</b></li>`).join("");
  document.querySelector("#recipe-steps").innerHTML = guide.steps.map(step => `<li>${step}</li>`).join("");
  document.querySelector("#recipe-tip").textContent = `本食谱完全根据你选择的现有食材生成。小贴士：${guide.tip}`;
  deductInventoryButton.hidden = !meal.ingredients?.some(ingredient => stateFor(ingredient.id)?.stock);
  recipeModal.classList.add("is-open");
  recipeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  recipeCloseButton.focus();
}

function recipeBadges(meal) {
  return [
    meal.needsExtraIngredients === false ? "无需额外食材" : "需要额外食材",
    meal.difficulty ? `难度 ${meal.difficulty}` : "",
    meal.basicSeasonings?.length ? `基础调味：${meal.basicSeasonings.join("、")}` : "",
    meal.remainingStock?.length ? `剩余：${meal.remainingStock.map(i => `${i.name}${i.remaining}${i.unit}`).join("、")}` : ""
  ].filter(Boolean).map(text => `<span>${text}</span>`).join("");
}

function closeRecipe() {
  recipeModal.classList.remove("is-open");
  recipeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (recipeReturnFocus) recipeReturnFocus.focus();
}

document.querySelectorAll("[data-close-recipe]").forEach(element => element.addEventListener("click", closeRecipe));
deductInventoryButton.addEventListener("click", () => {
  if (!activeRecipe) return;
  for (const ingredient of activeRecipe.ingredients || []) {
    const entry = stateFor(ingredient.id);
    if (!entry?.stock) continue;
    entry.stock = Math.max(0, Number(entry.stock) - Number(ingredient.grams || 0));
  }
  saveInventoryStore();
  renderSelectedIngredients();
  renderIngredientCatalog();
  showToast("已按本食谱扣减库存");
  if (latestProfile) render(latestProfile);
  closeRecipe();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && recipeModal.classList.contains("is-open")) closeRecipe();
});

function render(profile) {
  const nutrition = calculate(profile);
  const result = createMenu(profile, nutrition);
  const menu = result.recipes || [];
  const actual = menu.reduce((sum, meal) => sum + meal.kcal, 0);
  const goalLabels = { lose: "温和减脂", maintain: "保持体重", gain: "稳步增重" };
  if (!menu.length) {
    results.innerHTML = `
      <div class="result-head"><div><h2>暂时无法生成合理食谱</h2><p>${goalLabels[profile.goal]} · 目标 ${nutrition.calories} kcal</p></div></div>
      <div class="inventory-note">${(result.errors || ["当前食材较少。"]).map(error => `<p>${error}</p>`).join("")}</div>
      <p class="safety">系统不会自动加入你没有选择的食材。请补充蛋白质、主食或蔬菜后再试。</p>`;
    return;
  }
  results.innerHTML = `
    <div class="result-head">
      <div><h2>现有食材候选食谱</h2><p>${goalLabels[profile.goal]} · 预计维持热量 ${nutrition.maintenance} kcal · 仅使用你选择的食材</p></div>
      <button class="refresh-btn" id="refresh-menu" type="button">重新生成 ↻</button>
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
          <div><h3>候选 ${index + 1} · ${meal.name}</h3><p>${meal.foods.map(([f, a, u]) => `${f} ${a}${u}`).join(" ／ ")}</p><span class="meal-action">${meal.method || "家常"} · ${meal.time} · 蛋白 ${meal.protein || 0}g · 脂肪 ${meal.fat || 0}g · 碳水 ${meal.carbs || 0}g · 查看详细做法 →</span><div class="recipe-badges">${recipeBadges(meal)}</div></div>
          <span class="meal-kcal">${meal.kcal} kcal</span>
        </article>`).join("")}
    </div>
    <div class="intake-bar"><p><span>候选食谱平均热量</span><b>${Math.round(actual / menu.length)} kcal / 道</b></p><div class="track"><span style="width:${Math.min(100, (actual / menu.length) / (nutrition.calories * .35) * 100)}%"></span></div></div>
    <p class="safety">本食谱完全根据你选择的现有食材生成。若当前食材无法满足蛋白质或主食目标，系统只会提示补充，不会未经确认自动加入。</p>`;
  document.querySelector("#refresh-menu").addEventListener("click", () => render(profile));
  document.querySelectorAll(".meal").forEach(card => {
    const open = () => openRecipe(menu[Number(card.dataset.mealIndex)], "现有食材食谱", card);
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
    });
  });
}

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
  if (!inventoryState.length) {
    error.textContent = "请先选择家里现有的食材。";
    return;
  }
  if (!selectedValues("mealType").length) {
    error.textContent = "请至少选择一种用餐类型。";
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

setupInventoryUI();
