import UserModel from "./javaScript/User.model.js";
import { createUUID } from "./javaScript/generate-id.js";
import { availableCountries } from "./javaScript/currency-country.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Verifica se há um usuário logado. Se sim, redireciona para a página do usuário.
  if (UserModel.getLoggedUser()) {
    window.location.href = "./private-pages/team/team.html";
  }

  const form = document.getElementById("register-user");
  const countrySelect = document.getElementById("country-select");
  const countries = await availableCountries();

  // Preenche as opções do campo de seleção de países com os dados dos países disponíveis.
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.id;
    option.innerText = country.portugueseName;
    countrySelect.appendChild(option);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const elements = event.target.elements;

    // Obtém os valores dos campos do formulário de registro do usuário.
    const name = elements["name"].value;
    const email = event.target.elements["email"].value;
    const password = elements["password"].value;
    const countryId = elements["country"].value;
    const lunchTimeStart = elements["lunchTimeStart"].value;
    const lunchTimeEnd = elements["lunchTimeEnd"].value;
    const officeHourStart = elements["officeHourStart"].value;
    const officeHourEnd = elements["officeHourEnd"].value;

    // Encontra os dados do país selecionado com base na moeda selecionada.
    const countryData = countries.find((country) => countryId === country.id);
    const currency = countryData.currency;
    const countryName = countryData.portugueseName;

    // Cria uma nova instância do modelo de usuário com os dados fornecidos.
    const user = new UserModel({
      id: createUUID(),
      name,
      email,
      password,
      country: countryName,
      countryId,
      currency,
      lunchTimeStart,
      lunchTimeEnd,
      officeHourStart,
      officeHourEnd,
      timezone: new Date().getTimezoneOffset(),
    });

    // Cria o novo usuário, define-o como usuário atual e redireciona para a página do usuário.
    user.create();
    user.setCurrentUser();
    window.location.href = "./private-pages/team/team.html";
  });
});
