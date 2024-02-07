import { mockData } from "./javaScript/mock/index.js";

const modalRegister = document.getElementById("modal-register");
const modalLogin = document.getElementById("modal-login");
const buttonLoginChangeContent = document.getElementById(
  "btn-login-modal-change-content"
);
const buttonRegisterChangeContent = document.getElementById(
  "btn-register-modal-change-content"
);

const backdrop = document.createElement("div");

function abrirModal(modal) {
  modal.classList.add("show");
  modal.style.display = "block";
  document.body.classList.add("modal-open");
  backdrop.classList.add("modal-backdrop");
  document.body.appendChild(backdrop);
}

function fecharModal(modal) {
  modal.classList.remove("show");
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
  document.body.removeChild(backdrop);
}

function changeModal(currentModal, newModal) {
  fecharModal(currentModal);
  abrirModal(newModal);
}

document.addEventListener("DOMContentLoaded", () => {
  mockData();
  buttonRegisterChangeContent.addEventListener(
    "click",
    changeModal(modalRegister, modalLogin)
  );
  buttonLoginChangeContent.addEventListener(
    "click",
    changeModal(modalLogin, modalRegister)
  );
});
