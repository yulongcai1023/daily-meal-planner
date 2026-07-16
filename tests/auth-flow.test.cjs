const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { webcrypto } = require("crypto");
const { TextEncoder } = require("util");

function makeStorage() {
  const values = new Map();
  return {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key)
  };
}

const classes = { add() {}, remove() {}, contains() { return false; }, toggle() {} };
const elements = new Map();
const normalize = selector => selector.replaceAll('"', "");
function element(selector) {
  const key = normalize(selector);
  if (!elements.has(key)) {
    elements.set(key, {
      handlers: {},
      addEventListener(type, handler) { this.handlers[type] = handler; },
      classList: classes,
      setAttribute() {},
      focus() {},
      reset() {},
      scrollIntoView() {},
      insertAdjacentHTML() {},
      querySelector: () => null,
      dataset: {},
      hidden: false,
      required: false,
      value: "",
      checked: false,
      textContent: "",
      innerHTML: "",
      autocomplete: "",
      options: []
    });
  }
  return elements.get(key);
}

const document = {
  querySelector: element,
  querySelectorAll: () => [],
  addEventListener() {},
  body: { classList: classes }
};

const localStorage = makeStorage();
const sessionStorage = makeStorage();
const firestore = new Map();
let authUser = null;
let authCallback = null;
let uidCounter = 1;

function doc(_db, collection, id) {
  return { path: `${collection}/${id}`, collection, id };
}

async function getDoc(ref) {
  const data = firestore.get(ref.path);
  return { exists: () => Boolean(data), data: () => data };
}

async function setDoc(ref, data, options = {}) {
  const current = firestore.get(ref.path) || {};
  firestore.set(ref.path, options.merge ? { ...current, ...data } : data);
}

async function createUserWithEmailAndPassword(_auth, email) {
  authUser = { uid: `uid_${uidCounter++}`, email };
  authCallback?.(authUser);
  return { user: authUser };
}

async function signInWithEmailAndPassword(_auth, email) {
  const usernameDoc = [...firestore.values()].find(row => row.authEmail === email && row.uid);
  authUser = { uid: usernameDoc?.uid || "uid_1", email };
  authCallback?.(authUser);
  return { user: authUser };
}

async function signOut() {
  authUser = null;
  authCallback?.(null);
}

function onAuthStateChanged(_auth, callback) {
  authCallback = callback;
  callback(authUser);
}

let source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
source = source.replace(/^\uFEFF/, "");
source = source
  .replace(/^import\s*\{[\s\S]*?\}\s*from\s*"[^"]+";\r?\n/gm, "")
  .replace(/^import\s+[^;]+;\r?\n/gm, "");
source += ";globalThis.__setAuthMode=setAuthMode";

const context = {
  document,
  window: { innerWidth: 1200 },
  localStorage,
  sessionStorage,
  crypto: webcrypto,
  TextEncoder,
  Uint8Array,
  Array,
  Set,
  Math,
  Number,
  Object,
  Date,
  JSON,
  setTimeout,
  clearTimeout,
  fetch: async () => ({ ok: true, json: async () => ({}) }),
  initializeApp: () => ({}),
  getAuth: () => ({}),
  getFirestore: () => ({}),
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  serverTimestamp: () => "timestamp",
  createDailyMenu: () => [],
  getRecipeDatabaseStats: () => ({ proteins: 0, vegetables: 0, methods: 0, comboEstimate: 0 }),
  EXERCISES: [],
  SPLITS: {},
  generateWorkoutPlan: () => ({ plan: null, errors: ["mock"] }),
  getExerciseAlternatives: () => [],
  validateSplitCompatibility: () => ({ ok: true }),
  validateWorkoutPlan: () => ({ ok: true, errors: [] }),
  renderFitnessDashboard: () => "",
  renderSheetOptions: () => "",
  renderTrainingOptionList: () => ""
};

vm.createContext(context);
vm.runInContext(source, context);

(async () => {
  context.__setAuthMode("register");
  element("#auth-username").value = "mealuser";
  element("#auth-password").value = "secret123";
  element("#auth-confirm-password").value = "secret123";
  element("#auth-security-code").value = "safe123";
  await element("#auth-form").handlers.submit({ preventDefault() {} });

  element("#height").value = "181";
  element("#weight").value = "77.5";
  element("#age").value = "32";
  element("#sex").value = "male";
  element("input[name=activity]:checked").value = "1.55";
  element("input[name=goal]:checked").value = "gain";
  await element("#profile-form").handlers.submit({ preventDefault() {} });

  await element("#logout-button").handlers.click();
  element("#height").value = "150";

  context.__setAuthMode("login");
  element("#auth-username").value = "mealuser";
  element("#auth-password").value = "secret123";
  await element("#auth-form").handlers.submit({ preventDefault() {} });

  const user = firestore.get("users/uid_1");
  const checks = {
    registered: Boolean(user),
    recoveryCodeIsHashed: Boolean(user.recoveryCodeHash) && user.recoveryCodeHash !== "safe123",
    profileSaved: user.profile.height === 181 && user.profile.goal === "gain",
    heightRestored: element("#height").value === 181,
    activityRestored: element("input[name=activity][value=1.55]").checked,
    goalRestored: element("input[name=goal][value=gain]").checked
  };
  console.log(JSON.stringify(checks, null, 2));
  if (Object.values(checks).some(value => !value)) process.exit(1);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
