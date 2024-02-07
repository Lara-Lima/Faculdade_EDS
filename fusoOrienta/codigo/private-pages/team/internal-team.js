import TeamModel from "../../javaScript/Team.model.js";
import TeamUsersModel from "../../javaScript/TeamUsers.model.js";
import UserMemberModel from "../../javaScript/UserMember.model.js";
import UserModel from "../../javaScript/User.model.js";
import {
  convertCurrency,
  fetchCountryData,
} from "../../javaScript/currency-country.js";
import {
  renderDaysOfWeek,
  renderBestTimes,
  convertUsersToTimeZone,
  renderMeetings,
  handleFormRegisterMeeting,
} from "./utils/internal-team.js";

let memberToDelete;
const loggedUser = UserModel.getLoggedUser();

const modalDelete = new bootstrap.Modal(
  document.getElementById("modal-delete-member-team")
);

const deleteTeamMember = document.querySelector(".btn-delete-member");

deleteTeamMember.addEventListener("click", () => {
  const membroDeleted = new TeamUsersModel(memberToDelete);

  const teamId =
    window.location.search.split("=")[1] ||
    "7a2b34c5-9e8d-6f7a-5c4b-3a2b1c0d9e8d";
  membroDeleted.delete();
  modalDelete.hide();
  renderMemberList(teamId);
  renderAddMembersModal(teamId);

  const team = new TeamModel({ id: teamId });
  const teamWithUsers = team.getById();
  renderBestTimes(
    convertUsersToTimeZone({
      users: teamWithUsers.users,
      loggedUser,
    })
  );
  currenciesDetails([
    ...new Set(teamWithUsers.users.map((user) => user.currency)),
  ]);
});

function getCurrentHourForTwoTimezones(
  baseTimeZoneInHour,
  timeZoneIwantToKnowTheHourInHour
) {
  var date = new Date();
  var utc = date.getTime() + date.getTimezoneOffset() * 60000;
  var dateWithBaseTimeZone = new Date(utc + 3600000 * baseTimeZoneInHour);
  var dateWithTimeZoneIwantToKnowTheHour = new Date(
    utc + 3600000 * timeZoneIwantToKnowTheHourInHour
  );
  return {
    baseTimeZoneHour: dateWithBaseTimeZone.getHours(),
    timeZoneIwantToKnowTheHour: dateWithTimeZoneIwantToKnowTheHour.getHours(),
  };
}

function memberCard({
  id,
  teamId,
  name,
  image,
  officeHourEnd,
  officeHourStart,
  lunchTimeEnd,
  lunchTimeStart,
  timezone,
}) {
  const memberDiv = document.createElement("div");
  const img = document.createElement("img");
  const innerDiv = document.createElement("div");
  const h5 = document.createElement("h5");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const button = document.createElement("button");
  const timezoneElement = document.createElement("p");

  timezoneElement.classList.add("m-2");
  timezoneElement.innerHTML = `fuso-horário: ${timezone / 60}`;

  const itsMe = loggedUser.id === id;

  memberDiv.classList.add("member");
  p1.classList.add("m-2");
  button.classList.add("btn", "btn-brand", "btn-enviar-convite", "btn-sm");
  p2.classList.add("m-2");
  p3.classList.add("m-2");

  img.src = image;
  img.alt = "";
  h5.innerHTML = itsMe ? `${name} (Eu)` : name;

  p1.innerHTML = `<i class="bi bi-clock-history"></i> Trabalho: ${officeHourStart} - ${officeHourEnd}`;

  p2.innerHTML = `<i class="bi bi-cup-hot"></i> Almoço:${lunchTimeStart} - ${lunchTimeEnd}`;

  const localTime = getCurrentHourForTwoTimezones(
    loggedUser.timezone / 60,
    timezone / 60
  );
  p3.innerHTML = `<i class="bi bi-globe-americas"></i> Horário Local: ${
    localTime.timeZoneIwantToKnowTheHour
  }:${new Date().getMinutes().toString().padStart(2, "0")} horas.`;
  button.textContent = itsMe ? "Sair da Equipe" : "Excluir da Equipe";

  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#modal-delete-member-team");

  innerDiv.appendChild(h5);
  innerDiv.appendChild(timezoneElement);

  innerDiv.appendChild(p1);
  innerDiv.appendChild(p2);
  innerDiv.appendChild(p3);
  innerDiv.appendChild(button);
  memberDiv.appendChild(img);
  memberDiv.appendChild(innerDiv);

  button.addEventListener("click", () => {
    modalDelete.show();
    h5.innerHTML = name;
    memberToDelete = {
      userId: id,
      teamId,
    };
  });

  return memberDiv;
}

async function currenciesDetails(currenciesCode) {
  const currencyForm = document.querySelector("#currency-form");
  const combinations = await fetchCountryData();
  currencyForm.innerHTML = "";

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
}

function renderAddMembersModal(teamId) {
  const team = new TeamModel({ id: teamId });
  const teamWithUsers = team.getById();
  const contentMemberList = document.getElementById("content-member-list");
  const member = new UserMemberModel({ userId: loggedUser.id });

  contentMemberList.innerHTML = "";
  const friends = member.getApprovedUsers();

  friends
    .filter(
      (friend) => !teamWithUsers.users.some((user) => user.id === friend.id)
    )
    .forEach((friend) => {
      contentMemberList.appendChild(
        card({
          ...friend,
          teamId,
        })
      );
    });
}

function card({ id, teamId, name, image, country }) {
  const memberDiv = document.createElement("div");

  memberDiv.classList.add("member");

  const img = document.createElement("img");
  img.src = image;
  img.alt = "";

  const innerDiv = document.createElement("div");

  const h5 = document.createElement("h5");
  h5.textContent = name;

  const p = document.createElement("p");
  p.textContent = country;

  const button = document.createElement("button");
  button.classList.add("btn", "btn-brand", "btn-enviar-convite", "btn-sm");
  button.textContent = "Adicionar";

  button.addEventListener("click", () => {
    TeamUsersModel.addUserToTeam({
      userId: id,
      teamId,
    });

    const team = new TeamModel({ id: teamId });
    const teamWithUsers = team.getById();

    renderMemberList(teamId);
    renderAddMembersModal(teamId);
    renderBestTimes(
      convertUsersToTimeZone({
        users: teamWithUsers.users,
        loggedUser,
      })
    );
    currenciesDetails([
      ...new Set(teamWithUsers.users.map((user) => user.currency)),
    ]);
  });

  innerDiv.appendChild(h5);
  innerDiv.appendChild(p);
  innerDiv.appendChild(button);

  memberDiv.appendChild(img);
  memberDiv.appendChild(innerDiv);

  return memberDiv;
}

function renderMemberList(teamId) {
  const team = new TeamModel({ id: teamId });
  const teamWithUsers = team.getById();
  const titelTeam = document.getElementById("title-team-name");
  titelTeam.innerHTML = team.name;

  const teamMemberList = document.getElementById("team-member-list");
  teamMemberList.innerHTML = "";

  convertUsersToTimeZone({
    users: teamWithUsers.users,
    loggedUser,
  }).forEach((user) => {
    teamMemberList.appendChild(memberCard({ ...user, teamId }));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const logOutButtonElement = document.querySelector("#log-out");
  logOutButtonElement.addEventListener("click", () => {
    UserModel.logOut();
    window.location.href = "../../index.html";
  });

  const teamId =
    window.location.search.split("=")[1] ||
    "7a2b34c5-9e8d-6f7a-5c4b-3a2b1c0d9e8d";

  const team = new TeamModel({ id: teamId });
  const teamWithUsers = team.getById();

  currenciesDetails([
    ...new Set(teamWithUsers.users.map((user) => user.currency)),
  ]);
  renderMemberList(teamId);
  renderAddMembersModal(teamId);
  renderDaysOfWeek();
  renderBestTimes(
    convertUsersToTimeZone({
      users: teamWithUsers.users,
      loggedUser,
    })
  );
  renderMeetings(teamId);
  handleFormRegisterMeeting(teamId);

  const buttons = document.querySelectorAll("#buttons-wrapper button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-bs-target");

      document.querySelectorAll(".collapse").forEach((collapse) => {
        if (collapse.id === target) {
          const bsCollapse = new bootstrap.Collapse(collapse);
          bsCollapse.toggle();
        } else {
          const bsCollapse = bootstrap.Collapse.getInstance(collapse);
          if (bsCollapse && !bsCollapse._isTransitioning) {
            bsCollapse.hide();
          }
        }
      });
    });
  });
});
