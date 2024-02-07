import TeamModel from "../javaScript/Team.model.js";
import {
  convertCurrency,
  fetchCountryData,
} from "../javaScript/currency-country.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Obtém o ID da equipe da URL ou usa um ID de time que existe no mock
  const teamId =
    window.location.search.split("=")[1] ||
    "7a2b34c5-9e8d-6f7a-5c4b-3a2b1c0d9e8d";

  const team = new TeamModel({ id: teamId });
  const teamWithUsers = team.getById();

  const titelTeam = document.querySelector(".title-team");
  titelTeam.textContent = team.name;

  const currenciesCode = [
    ...new Set(teamWithUsers.users.map((user) => user.currency)),
  ];

  const currencyForm = document.querySelector("#currency-form");

  const combinations = await fetchCountryData();

  currenciesCode.forEach((currencyCode) => {
    const formGroup = document.createElement("div");
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const spanIconWrapper = document.createElement("span");
    const icon = document.createElement("i");
    const input = document.createElement("input");

    label.setAttribute("for", currencyCode);
    label.textContent = combinations.find(
      (combination) => combination.currency === currencyCode
    ).currencyName;

    formGroup.classList.add("form-group");
    wrapper.classList.add("input-group", "flex-nowrap", "mb-4");
    spanIconWrapper.classList.add("input-group-text");
    icon.classList.add("bi", "bi-coin");
    input.classList.add("form-control");

    formGroup.append(label, wrapper);
    wrapper.append(spanIconWrapper, input);
    spanIconWrapper.append(icon);

    input.setAttribute("type", "number");
    input.setAttribute("min", "0");
    input.setAttribute("step", "0.01");
    input.setAttribute("placeholder", currencyCode);
    input.setAttribute("name", currencyCode);
    input.setAttribute("id", currencyCode);

    let timeout;
    // A função debounce recebe uma função e um delay, e retorna uma nova função
    // que só pode ser executada após o delay
    const debounce = (func, delay) => {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };

    // Essa função é responsável por converter o valor da moeda para as outras moedas,
    // é executada toda vez que o usuário digita um valor no input
    // alem disso utiliza o debounce para evitar que a função seja executada a todo momento que o usuário digita
    // para evitar muitas requisições
    input.addEventListener("input", async (event) => {
      debounce(async () => {
        const currencyValue = event.target.value;
        const currencyCode = event.target.name;

        const convertion = Object.entries(
          await convertCurrency(currencyCode, currenciesCode)
        ).map(([_, value]) => value);

        currenciesCode
          .filter((currency) => currency !== currencyCode)
          .forEach((currencyCode) => {
            const hasConvertion = convertion.find(
              (value) => value.codein === currencyCode
            );
            const input = document.getElementById(currencyCode);
            if (hasConvertion) {
              input.value = (hasConvertion.bid * currencyValue).toFixed(2);
            } else {
              input.value = "";
            }
          });
      }, 300);
    });

    currencyForm.appendChild(formGroup);
  });
});
