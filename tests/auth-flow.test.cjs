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
      dataset: {},
      hidden: false,
      value: "",
      checked: false,
      textContent: "",
      innerHTML: "",
      autocomplete: ""
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
const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8") + ";globalThis.__setAuthMode=setAuthMode";
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
  setTimeout,
  clearTimeout
};

vm.createContext(context);
vm.runInContext(source, context);

(async () => {
  context.__setAuthMode("register");
  element("#auth-username").value = "mealuser";
  element("#auth-password").value = "secret123";
  await element("#auth-form").handlers.submit({ preventDefault() {} });

  element("#height").value = "181";
  element("#weight").value = "77.5";
  element("#age").value = "32";
  element("#sex").value = "male";
  element("input[name=activity]:checked").value = "1.55";
  element("input[name=goal]:checked").value = "gain";
  await element("#profile-form").handlers.submit({ preventDefault() {} });

  element("#logout-button").handlers.click();
  element("#height").value = "150";

  context.__setAuthMode("login");
  element("#auth-username").value = "mealuser";
  element("#auth-password").value = "secret123";
  await element("#auth-form").handlers.submit({ preventDefault() {} });

  const account = JSON.parse(localStorage.getItem("dailyMealPlanner.accounts.v1")).mealuser;
  const checks = {
    registered: Boolean(account),
    passwordIsNotPlaintext: !Object.values(account).includes("secret123"),
    profileSaved: account.profile.height === 181 && account.profile.goal === "gain",
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
