
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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





const password = document.querySelector("#password");
const email = document.querySelector("#email");

const loginButton = document.querySelector("#login-btn");
loginButton.addEventListener("click", async () => {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      sessionStorage.setItem("user", user.uid);
      window.location.href = "../home/index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
})

















const registerButton = document.querySelector("#register-btn");
registerButton.addEventListener("click", () => {
  window.location.href = "../registration/index.html"
});