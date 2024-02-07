import UserModel from "./javaScript/User.model.js";
import { mockData } from "./javaScript/mock/index.js";

document.addEventListener("DOMContentLoaded", () => {
  mockData();
  const form = document.querySelector("#form-login");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const elements = event.target.elements;

    const email = event.target.elements["email-login"].value;
    const password = elements["password"].value;

    const user = new UserModel({
      email,
      password,
    });

    user.logIn();
  });
});
