const app = document.getElementById("app");
const screenContainer = document.querySelector(".screen");

const OWNER_EMAIL = "true@user.com";
const OTP_CODE = "123321";
const PHONE_CODE = "456456";
const BACKUP_CODES = ["BX92-QA7", "MN34-KP2"];
const TRUSTED_DEVICE = "Pixel-8";

let state = "boot";
let history = [];

function render(html) {
  app.classList.remove("app-closing");
  app.innerHTML = `<div class="content">${html}</div>`;
}

function pushState(next) {
  history.push(state);
  state = next;
  draw();
}

function goBack() {
  if (!history.length) return;
  state = history.pop();
  draw();
}

function draw() {
  if (state === "boot") return boot();
  if (state === "language") return language();
  if (state === "region") return region();
  if (state === "menu") return menu();
  if (state === "email") return emailEntry();
  if (state === "phone") return phoneEntry();
  if (state === "device") return deviceApproval();
  if (state === "backup") return backupEntry();
  if (state === "otp") return otpEntry();
  if (state === "faceEmail") return faceScan();
  if (state === "emailOTP") return emailOtpEntry();
  if (state === "unlocked") return unlocked();
}

/* ---------- Flow Screens ---------- */

function boot() {
  render(`<div style="height:100%;display:flex;align-items:center;justify-content:center;"><h2>Samsung</h2></div>`);
  setTimeout(() => pushState("language"), 1200);
}

function language() {
  render(`<h2>Welcome</h2><p>Select your language</p><button onclick="pushState('region')">English (India)</button>`);
}

function region() {
  render(`<h2>Choose your region</h2><button onclick="pushState('menu')">India</button>`);
}

function menu() {
  render(`
    <h2>Verify Ownership</h2>
    <button onclick="pushState('email')">Email + Phone</button>
    <button onclick="pushState('device')">Trusted Device + Phone</button>
    <button onclick="pushState('backup')">Backup Code + OTP</button>
    <button onclick="pushState('faceEmail')">Face + Email OTP</button>
  `);
}

/* ---------- Email + Phone ---------- */

function emailEntry() {
  render(`
    <h2>Email Verification</h2>
    <input id="email" type="email" placeholder="Registered Email">
    <div id="msg"></div>
    <button onclick="checkEmail()">Continue</button>
  `);
}

function checkEmail() {
  const email = document.getElementById("email").value.trim();
  const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  if (!pattern.test(email)) return showError("Invalid email format");
  if (email !== OWNER_EMAIL) return showError("Email not recognised");

  pushState("phone");
}

function phoneEntry() {
  render(`
    <h2>Phone Verification</h2>
    <input id="phonecode" inputmode="numeric" placeholder="456456">
    <div id="msg"></div>
    <button onclick="verifyPhone()">Verify</button>
  `);
}

function verifyPhone() {
  const code = document.getElementById("phonecode").value.trim();

  if (!/^\d+$/.test(code)) return showError("Digits only");
  if (code !== PHONE_CODE) return showError("Incorrect phone code");

  pushState("unlocked");
}

/* ---------- Device + Phone ---------- */

function deviceApproval() {
  render(`<h2>Trusted Device</h2><p>Approve from ${TRUSTED_DEVICE}</p><button onclick="pushState('phone')">Approve</button>`);
}

/* ---------- Backup + OTP ---------- */

function backupEntry() {
  render(`
    <h2>Backup Code</h2>
    <input id="backup">
    <div id="msg"></div>
    <button onclick="checkBackup()">Continue</button>
  `);
}

function checkBackup() {
  const code = document.getElementById("backup").value.trim();

  if (!BACKUP_CODES.includes(code)) return showError("Invalid backup code");

  pushState("otp");
}

function otpEntry() {
  render(`
    <h2>OTP Verification</h2>
    <input id="otp" inputmode="numeric" placeholder="123321">
    <div id="msg"></div>
    <button onclick="verifyOtp()">Verify</button>
  `);
}

function verifyOtp() {
  const code = document.getElementById("otp").value.trim();

  if (!/^\d+$/.test(code)) return showError("Digits only");
  if (code !== OTP_CODE) return showError("Incorrect OTP");

  pushState("unlocked");
}

/* ---------- Face + Email OTP ---------- */

function faceScan() {
  render(`
    <h2>Face Verification</h2>
    <img src="face-scan.png" class="face-scan">
    <p>Scanning...</p>
  `);
  setTimeout(() => pushState("emailOTP"), 2000);
}

function emailOtpEntry() {
  render(`
    <h2>Email OTP</h2>
    <p>Code sent to ${OWNER_EMAIL}</p>
    <input id="otp" inputmode="numeric" placeholder="123321">
    <div id="msg"></div>
    <button onclick="verifyEmailOtp()">Verify</button>
  `);
}

function verifyEmailOtp() {
  const code = document.getElementById("otp").value.trim();

  if (!/^\d+$/.test(code)) return showError("Digits only");
  if (code !== OTP_CODE) return showError("Incorrect OTP");

  pushState("unlocked");
}

/* ---------- Final ---------- */

function unlocked() {
  render(`<h2>Device Unlocked</h2><button onclick="closeApp()">Home</button>`);
}

function closeApp() {
  app.classList.add("app-closing");
  setTimeout(() => {
    app.innerHTML = "";
    const home = document.createElement("div");
    home.className = "home-screen";
    home.onclick = () => {
      history = [];
      state = "boot";
      draw();
    };
    screenContainer.appendChild(home);
  }, 500);
}

function showError(text) {
  const box = document.getElementById("msg");
  box.textContent = text;
  box.style.color = "red";
}

draw();
