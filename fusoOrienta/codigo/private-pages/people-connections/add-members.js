import UserMemberModel from "../javaScript/UserMember.model.js";
import UserModel from "../javaScript/User.model.js";
import { createUUID } from "../javaScript/generate-id.js";

// Cria a lista de membros no select do formulário para adicionar membros
function setMemberList() {
  const membersElement = document.getElementById("members");
  const allUsers = UserModel.getAll();
  const currentUser = UserModel.getLoggedUser();
  const logOutButtonElement = document.querySelector("#log-out");
  logOutButtonElement.addEventListener("click", () => {
    UserModel.logOut();
  });
  const myMembersIds = UserMemberModel.getMyMembers().map(
    (member) => member.userId
  );

  Array.from(membersElement.children)
    .slice(1)
    .forEach((child) => child.remove());

  allUsers
    .filter(
      (user) => user.id !== currentUser.id && !myMembersIds.includes(user.id)
    )
    .forEach((user) => {
      const optionElement = document.createElement("option");
      optionElement.value = user.id;
      optionElement.innerHTML = user.name;
      membersElement.appendChild(optionElement);
    });
}

// Cria a lista de países no select do formulário para poder filtrar os membros
function setCountryList() {
  const countrySelectElement = document.getElementById("country");
  const allUsers = UserModel.getAll();
  const currentUser = UserModel.getLoggedUser();
  const myMembersIds = UserMemberModel.getMyMembers().map(
    (member) => member.userId
  );

  Array.from(countrySelectElement.children)
    .slice(1)
    .forEach((child) => child.remove());

  allUsers
    .filter(
      (user) => user.id !== currentUser.id && !myMembersIds.includes(user.id)
    )
    .map((user) => user.country)
    .filter((country, index, self) => self.indexOf(country) === index)
    .forEach((country) => {
      const optionElement = document.createElement("option");
      optionElement.value = country;
      optionElement.innerHTML = country;
      countrySelectElement.appendChild(optionElement);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  const membersElement = document.getElementById("members");
  const formElement = document.getElementById("add-member");
  const currentUser = UserModel.getLoggedUser();

  const countrySelectElement = document.getElementById("country");
  setMemberList();
  setCountryList();

  // Filtra os membros de acordo com o país selecionado
  countrySelectElement.addEventListener("change", () => {
    const country = countrySelectElement.value;
    const allUsers = UserModel.getAll();
    const myMembersIds = UserMemberModel.getMyMembers().map(
      (member) => member.userId
    );
    Array.from(membersElement.children)
      .slice(1)
      .forEach((child) => child.remove());

    allUsers
      .filter(
        (user) =>
          user.id !== currentUser.id &&
          !myMembersIds.includes(user.id) &&
          (user.country === country || !country)
      )
      .forEach((user) => {
        const optionElement = document.createElement("option");
        optionElement.value = user.id;
        optionElement.innerHTML = user.name;
        membersElement.appendChild(optionElement);
      });
  });

  // Adiciona um novo membro ao usuário logado
  // e mostra um toast de sucesso
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const newMember = new UserMemberModel({
      id: createUUID(),
      sentInviteUserId: currentUser.id,
      userId: membersElement.value,
    });
    newMember.create();

    const memberToast = document.getElementById("member-toast");
    const toast = new bootstrap.Toast(memberToast);
    toast.show();
    setMemberList();
  });
});
