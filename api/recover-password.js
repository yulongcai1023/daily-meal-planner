const crypto = require("node:crypto");

const PROJECT_ID = "food-b5162";
const DATABASE_ID = "(default)";
let cachedAccessToken = null;

function getServiceAccount() {
  const source = process.env.FIREBASE_SERVICE_ACCOUNT_B64 ? "b64" : "json";
  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT_B64 || "";
  const raw = encoded
    ? Buffer.from(encoded.replace(/\s/g, ""), "base64").toString("utf8")
    : process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT");
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Invalid service account JSON from ${source}; encodedLength=${encoded.length}; decodedLength=${raw.length}; startsWithBrace=${raw.trim().startsWith("{")}`);
  }
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken() {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60000) {
    return cachedAccessToken.token;
  }

  const serviceAccount = getServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: serviceAccount.client_email,
    scope: [
      "https://www.googleapis.com/auth/datastore",
      "https://www.googleapis.com/auth/identitytoolkit"
    ].join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsigned)
    .sign(serviceAccount.private_key);
  const assertion = `${unsigned}.${base64url(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  const tokenText = await response.text();
  let token;
  try {
    token = JSON.parse(tokenText);
  } catch {
    throw new Error(`Token response was not JSON; status=${response.status}; head=${tokenText.slice(0, 60)}`);
  }
  if (!response.ok) throw new Error(token.error_description || token.error || "Unable to get access token");

  cachedAccessToken = {
    token: token.access_token,
    expiresAt: Date.now() + Number(token.expires_in || 3600) * 1000
  };
  return cachedAccessToken.token;
}

function normalizeUsername(username) {
  return String(username || "").trim().toLocaleLowerCase();
}

function validateUsername(username) {
  return /^[\p{L}\p{N}_-]{3,20}$/u.test(String(username || ""));
}

function hashSecret(secret, salt) {
  return crypto.pbkdf2Sync(String(secret), String(salt), 120000, 32, "sha256").toString("hex");
}

function fieldString(document, field) {
  return document?.fields?.[field]?.stringValue || "";
}

async function firestoreGet(path, token) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${encodeURIComponent(DATABASE_ID)}/documents/${path}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.status === 404) return null;
  const text = await response.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`Firestore read response was not JSON; status=${response.status}; head=${text.slice(0, 60)}`);
  }
  if (!response.ok) throw new Error(body.error?.message || "Firestore read failed");
  return body;
}

async function firestorePatch(path, fields, token) {
  const updateMask = Object.keys(fields).map(field => `updateMask.fieldPaths=${encodeURIComponent(field)}`).join("&");
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${encodeURIComponent(DATABASE_ID)}/documents/${path}?${updateMask}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fields })
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(body.error?.message || "Firestore update failed");
  return body;
}

async function updateAuthPassword(uid, newPassword, token) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:update`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      localId: uid,
      password: newPassword,
      returnSecureToken: false
    })
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(body.error?.message || "Password update failed");
  return body;
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const text = Buffer.concat(chunks).toString("utf8");
  if (!text.trim()) return {};
  return JSON.parse(text);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ code: "method-not-allowed", message: "Only POST is allowed." });
  }

  try {
    const { username, securityCode, newPassword } = await readJsonBody(req);
    const normalizedUsername = normalizeUsername(username);

    if (!validateUsername(username) || String(securityCode || "").length < 6 || String(newPassword || "").length < 6) {
      return res.status(400).json({ code: "auth/recovery-failed", message: "Invalid recovery request." });
    }

    const token = await getAccessToken();
    const usernameDocument = await firestoreGet(`usernames/${encodeURIComponent(normalizedUsername)}`, token);
    if (!usernameDocument) {
      return res.status(401).json({ code: "auth/recovery-failed", message: "Recovery check failed." });
    }

    const uid = fieldString(usernameDocument, "uid");
    const userDocument = uid ? await firestoreGet(`users/${encodeURIComponent(uid)}`, token) : null;
    if (!userDocument) {
      return res.status(401).json({ code: "auth/recovery-failed", message: "Recovery check failed." });
    }

    const expectedHash = fieldString(userDocument, "recoveryCodeHash");
    const salt = fieldString(userDocument, "recoverySalt");
    if (!expectedHash || !salt) {
      return res.status(401).json({ code: "auth/recovery-failed", message: "Recovery check failed." });
    }

    const actualHash = hashSecret(securityCode, salt);
    const expected = Buffer.from(expectedHash, "hex");
    const actual = Buffer.from(actualHash, "hex");
    if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
      return res.status(401).json({ code: "auth/recovery-failed", message: "Recovery check failed." });
    }

    await updateAuthPassword(uid, String(newPassword), token);
    await firestorePatch(`users/${encodeURIComponent(uid)}`, {
      passwordResetAt: { timestampValue: new Date().toISOString() },
      updatedAt: { timestampValue: new Date().toISOString() }
    }, token);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error.stack || error.message || error);
    return res.status(500).json({ code: "server-error", message: "Password recovery failed." });
  }
};
