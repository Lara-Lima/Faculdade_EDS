import TeamModel from "../../javaScript/Team.model.js";
import UserModel from "../../javaScript/User.model.js";
import { createUUID } from "../../javaScript/generate-id.js";

document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById("form-add-team");
  const loggedUser = UserModel.getLoggedUser();

  // Cria um time no clique do botão
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    const name = elements["team-name"].value;
    const color = elements["team-color"].value;
    const description = elements["team-description"].value;
    const team = new TeamModel({
      id: createUUID(),
      color,
      name,
      userId: loggedUser.id,
      description,
    });

    team.create();

    window.location.href = `./internalTeam.html?id=${team.id}`;
  });
});
