import UserModel from "../../javaScript/User.model.js";
import TeamModel from "../../javaScript/Team.model.js";

let teamToDelete;

const modalDelete = new bootstrap.Modal(
  document.getElementById("modal-delete-team")
);

const modalAddMember = new bootstrap.Modal(
  document.getElementById("modal-add-team")
);

const deleteTeamModal = document.querySelector(".btn-delete-team");

deleteTeamModal.addEventListener("click", () => {
  const teamDeletado = new TeamModel(teamToDelete);

  teamDeletado.delete();
  modalDelete.hide();

  start();
});

function teamCard(team) {
  const cardTeamContentElement = document.createElement("div");
  const cardTeamElement = document.createElement("div");
  const cardTitle = document.createElement("div");
  const cardDescription = document.createElement("p");
  const containerButtons = document.createElement("div");
  const joinTeam = document.createElement("button");
  const deleteTeam = document.createElement("button");

  cardTeamContentElement.classList.add("p-0");
  cardTeamElement.classList.add("card-team");
  cardTitle.classList.add("tag", "title-strong");
  containerButtons.classList.add("d-flex", "gap-2");
  joinTeam.classList.add("btn", "btn-brand", "ms-3", "btn-login-home");
  deleteTeam.classList.add("btn", "btn-outline-primary", "btn-register-home");

  cardTeamContentElement.appendChild(cardTeamElement);
  cardTeamElement.appendChild(cardTitle);
  cardTeamElement.appendChild(cardDescription);
  cardTeamElement.appendChild(containerButtons);
  containerButtons.appendChild(joinTeam);
  containerButtons.appendChild(deleteTeam);

  const closeModalElement = document.querySelector(".close-modal-delete");
  const nameTeamlElement = document.querySelector(".team-name");
  const userNameElement = document.querySelector(".user-nome");

  const loggedUser = UserModel.getLoggedUser();

  cardTitle.innerHTML = team.name;
  cardDescription.innerHTML = team.description;
  joinTeam.innerHTML = "Entrar";
  deleteTeam.innerHTML = "Excluir";
  userNameElement.innerHTML = loggedUser.name;

  cardTitle.style.backgroundColor = team.color;
  closeModalElement.addEventListener("click", () => {
    modalDelete.hide();
  });

  joinTeam.addEventListener("click", () => {
    window.location.href = `./internalTeam.html?id=${team.id}`;
  });

  deleteTeam.addEventListener("click", () => {
    modalDelete.show();
    nameTeamlElement.innerHTML = team.name;
    teamToDelete = team;
  });

  return cardTeamContentElement;
}

function start() {
  const logOutButtonElement = document.querySelector("#log-out");
  logOutButtonElement.addEventListener("click", () => {
    UserModel.logOut();
    window.location.href = "../../index.html";
  });

  const teams = TeamModel.getAllTeamsMemberAndOwner();

  const emptyTeamCardElement = document.querySelector(".card-team-empty");

  const emptyTeamCardElementClone = emptyTeamCardElement.cloneNode(true);

  emptyTeamCardElement.addEventListener("click", () => {
    modalAddMember.show();
  });

  emptyTeamCardElementClone.addEventListener("click", () => {
    modalAddMember.show();
  });

  const containerEquipeElement = document.querySelector(".container-team");

  containerEquipeElement.innerHTML = "";
  teams.forEach((team) => {
    containerEquipeElement.appendChild(teamCard(team));
  });

  containerEquipeElement.appendChild(emptyTeamCardElementClone);
}

document.addEventListener("DOMContentLoaded", () => {
  start();
});
