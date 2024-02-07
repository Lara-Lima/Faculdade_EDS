import UserModel from "../../javaScript/User.model.js";
import { availableCountries } from "../../javaScript/currency-country.js";

function showToast() {
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);

  toast.show();
}
document.addEventListener("DOMContentLoaded", async () => {
  // Verifica se há um usuário logado. Se sim, redireciona para a página do usuário.

  const logOutButtonElement = document.querySelector("#log-out");
  logOutButtonElement.addEventListener("click", () => {
    UserModel.logOut();
    window.location.href = "../../index.html";
  });

  const form = document.getElementById("form-edit-profile");
  const countrySelect = document.getElementById("country-select");
  const countries = await availableCountries();

  // Preenche as opções do campo de seleção de países com os dados dos países disponíveis.
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.id;
    option.innerText = country.portugueseName;
    countrySelect.appendChild(option);
  });

  const loggedUser = UserModel.getLoggedUser();

  document.getElementById("profile-img").src = loggedUser.image;
  document.getElementById("country-select").value = loggedUser.countryId;
  document.getElementById("email").value = loggedUser.email;
  document.getElementById("user-name").value = loggedUser.name;
  document.getElementById("password").value = loggedUser.password;
  document.getElementById("lunchTimeStart").value = loggedUser.lunchTimeStart;
  document.getElementById("lunchTimeEnd").value = loggedUser.lunchTimeEnd;
  document.getElementById("officeHourStart").value = loggedUser.officeHourStart;
  document.getElementById("officeHourEnd").value = loggedUser.officeHourEnd;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const elements = event.target.elements;
    const newUser = {
      name: elements["name"].value,
      email: elements["email"].value,
      password: elements["password"].value,
      countryId: elements["country-select"].value,
      lunchTimeStart: elements["lunchTimeStart"].value,
      lunchTimeEnd: elements["lunchTimeEnd"].value,
      officeHourStart: elements["officeHourStart"].value,
      officeHourEnd: elements["officeHourEnd"].value,
    };

    const updatedUser = new UserModel({ id: loggedUser.id });
    updatedUser.update({
      ...newUser,
      availableCountries: countries,
    });
    showToast();
  });
});
