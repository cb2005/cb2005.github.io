import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUcIUdcklBqwYcUPczSqUs8Wu0Jz4RnFg",
  authDomain: "cuttingroomlogin.firebaseapp.com",
  projectId: "cuttingroomlogin",
  storageBucket: "cuttingroomlogin.firebasestorage.app",
  messagingSenderId: "172062643144",
  appId: "1:172062643144:web:55505b71643fd4073366fd",
  measurementId: "G-0KJXKG26TR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener("DOMContentLoaded", () => {
  const cancelButton = document.querySelector("#cancel-btn");
  
  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      window.location.href = "../login/index.html";
    });
  } else {
    console.error("Cancel button not found");
  }
});
















const cancelButton = document.querySelector("#cancel-btn");
cancelButton.addEventListener("click", () => {
  window.location.href = "../login/index.html"
});  




const email = document.querySelector("#email");
const password = document.querySelector("#password");

const registerButton = document.querySelector("#register-btn");

registerButton.addEventListener("click", async () => {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Registration Successful");
      window.location.href = "../login/index.html";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
  });
});
















