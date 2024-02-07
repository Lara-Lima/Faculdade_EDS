import UserMemberModel from "../javaScript/UserMember.model.js";

function dayCard(member) {
  const user = member.user;

  const containerUser = document.createElement("div");
  const cardElement = document.createElement("div");
  const imgElement = document.createElement("img");

  const cardHeader = document.createElement("div");
  const cardTitle = document.createElement("h3");
  const cardText = document.createElement("div");
  const country = document.createElement("p");
  const email = document.createElement("p");
  const cardBody = document.createElement("div");
  const cardFooter = document.createElement("div");

  containerUser.classList.add("container-equipe");
  cardElement.classList.add("card", "equipe", "w-100");
  imgElement.classList.add("card-img-top");
  cardHeader.classList.add("card-header");
  cardTitle.classList.add("card-title");
  cardText.classList.add("card-text");
  cardBody.classList.add("card-body");
  cardFooter.classList.add("card-footer");

  containerUser.appendChild(cardElement);
  cardElement.appendChild(cardHeader);
  cardElement.appendChild(cardBody);
  cardElement.appendChild(cardFooter);
  cardHeader.appendChild(imgElement);
  cardText.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardText.appendChild(country);
  cardText.appendChild(email);

  cardTitle.innerHTML = user.name;
  cardFooter.innerHTML = user.country;
  country.innerHTML = user.country;
  email.innerHTML = user.email;

  return containerUser;
}

function start() {
  const emptyTeamCardElement = document.querySelector(
    ".container-equipe.empty-team"
  );

  const emptyTeamCardElementClone = emptyTeamCardElement.cloneNode(true);

  const containerUserElement = document.querySelector(
    ".container-lista-equipe"
  );

  containerUserElement.innerHTML = "";

  const memberList = UserMemberModel.getMyMembers();
  const memberListElement = document.getElementById("nomes");
  const logOutButtonElement = document.querySelector("#log-out");
  logOutButtonElement.addEventListener("click", () => {
    UserModel.logOut();
  });

  memberList.forEach((member) => {
    containerUserElement.appendChild(dayCard(member));
  });

  containerUserElement.appendChild(emptyTeamCardElementClone);
}

document.addEventListener("DOMContentLoaded", () => {
  start();
});
