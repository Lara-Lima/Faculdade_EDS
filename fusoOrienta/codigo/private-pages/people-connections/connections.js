import UserModel from "../../javaScript/User.model.js";
import UserMemberModel from "../../javaScript/UserMember.model.js";
import { STATUS } from "../../javaScript/constants/const.js";

const loggedUser = UserModel.getLoggedUser();

const modalDeleteMember = new bootstrap.Modal(
  document.getElementById("modal-delete-conection")
);

const modalAddMember = new bootstrap.Modal(
  document.getElementById("modal-add-members")
);

function emptyCardMember() {
  const memberEmptyDiv = document.createElement("button");
  memberEmptyDiv.classList.add("member", "member-empty", "col-lg-4", "w-100");

  const plusDiv = document.createElement("div");

  const plusIcon = document.createElement("i");
  plusIcon.classList.add("bi", "bi-plus-lg");

  plusDiv.appendChild(plusIcon);

  memberEmptyDiv.appendChild(plusDiv);

  memberEmptyDiv.addEventListener("click", () => {
    modalAddMember.show();
  });

  return memberEmptyDiv;
}

let memberToDeleteId;
const buttonDeleteConectionModal = document.querySelector(
  ".btn-delete-conection"
);

buttonDeleteConectionModal.addEventListener("click", () => {
  UserMemberModel.delete(memberToDeleteId);
  modalDeleteMember.hide();
  renderApprovedMembers();
  contentModalAddMembers();
});

function cardMember({
  name,
  country,
  image,
  isWaitingLoggedUserInvite,
  member,
  id,
}) {
  const { status } = member || {};
  const memberDiv = document.createElement("div");
  memberDiv.classList.add("member", "col-lg-4", "w-100");

  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.alt = "";

  const memberDetailsDiv = document.createElement("div");

  const h5 = document.createElement("h5");
  h5.textContent = name;

  const p = document.createElement("p");
  p.textContent = country;

  const button = document.createElement("button");
  button.classList.add("btn", "btn-brand", "btn-enviar-convite", "btn-sm");

  if (isWaitingLoggedUserInvite) {
    button.classList.add("disabled");
    button.textContent = "Aguardando";
  } else if (status === STATUS.approved) {
    button.textContent = "Excluir";
  } else {
    button.textContent = "Enviar Convite";
  }

  button.addEventListener("click", () => {
    if (isWaitingLoggedUserInvite) {
      return;
    }

    if (status === STATUS.approved) {
      memberToDeleteId = member.id;
      modalDeleteMember.show();
      return;
    }

    UserMemberModel.sendInvite(id);
    contentModalAddMembers();
  });

  memberDetailsDiv.appendChild(h5);
  memberDetailsDiv.appendChild(p);
  memberDetailsDiv.appendChild(button);

  memberDiv.appendChild(imageElement);
  memberDiv.appendChild(memberDetailsDiv);

  return memberDiv;
}

function pendingCardMember({ name, country, image, id }) {
  const memberDiv = document.createElement("div");
  memberDiv.classList.add("member");

  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.alt = "";

  const memberDetailsDiv = document.createElement("div");

  const h5 = document.createElement("h5");
  h5.textContent = name;

  const p = document.createElement("p");
  p.textContent = country;

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("d-flex", "gap-2");

  const rejectButton = document.createElement("button");
  rejectButton.classList.add(
    "btn",
    "btn-outline-primary",
    "btn-enviar-convite",
    "btn-sm"
  );
  rejectButton.textContent = "Rejeitar";

  const acceptButton = document.createElement("button");
  acceptButton.classList.add(
    "btn",
    "btn-brand",
    "btn-enviar-convite",
    "btn-sm"
  );
  acceptButton.textContent = "Aceitar";

  acceptButton.addEventListener("click", () => {
    memberDiv.remove();
    UserMemberModel.acceptInvite(id);
    renderApprovedMembers();
    contentModalAddMembers();
  });
  rejectButton.addEventListener("click", () => {
    memberDiv.remove();
    UserMemberModel.repproveInvite(id);
    renderApprovedMembers();
    contentModalAddMembers();
  });

  buttonDiv.appendChild(rejectButton);
  buttonDiv.appendChild(acceptButton);

  memberDetailsDiv.appendChild(h5);
  memberDetailsDiv.appendChild(p);
  memberDetailsDiv.appendChild(buttonDiv);

  memberDiv.appendChild(imageElement);
  memberDiv.appendChild(memberDetailsDiv);

  return memberDiv;
}

function contentModalAddMembers() {
  const addMemberList = document.getElementById("add-member-list");
  addMemberList.innerHTML = "";

  const members = new UserMemberModel({
    userId: loggedUser.id,
  });
  const allUsersToInvite = UserMemberModel.getAllUserMemberToInvite();

  allUsersToInvite.forEach((user) => {
    addMemberList.appendChild(cardMember(user));
  });
}

function renderApprovedMembers() {
  const memberList = document.getElementById("main-member-list");
  memberList.innerHTML = "";
  const members = new UserMemberModel({
    userId: loggedUser.id,
  });

  const approvedMembers = members.getApprovedMembers();

  approvedMembers.forEach((member) => {
    if (member.user.id === loggedUser.id) {
      memberList.appendChild(
        cardMember({
          ...member.sentInviteUser,
          member,
        })
      );
    } else {
      memberList.appendChild(
        cardMember({
          ...member.user,
          member,
        })
      );
    }
  });

  memberList.appendChild(emptyCardMember());
}

document.addEventListener("DOMContentLoaded", () => {
  const logOutButtonElement = document.querySelector("#log-out");
  logOutButtonElement.addEventListener("click", () => {
    UserModel.logOut();
    window.location.href = "../../index.html";
  });

  const pendindMemberList = document.getElementById("pending-member-list");
  const badgePendingCount = document.getElementById("badge-pending-count");

  const members = new UserMemberModel({
    userId: loggedUser.id,
  });

  const pendingToAcceptMembers = members.getPendingToAcceptMembers();

  pendingToAcceptMembers.forEach((member) => {
    pendindMemberList.appendChild(pendingCardMember(member.sentInviteUser));
  });

  badgePendingCount.innerHTML = pendingToAcceptMembers.length;

  contentModalAddMembers();
  renderApprovedMembers();
});
