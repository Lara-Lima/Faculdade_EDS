import TeamUsersModel from "./TeamUsers.model.js";
import UserModel from "./User.model.js";
import { saveData, getData } from "./local-storage.js";

const TEAM_KEY = "teams";

export default class TeamModel {
  constructor({ id, name, color, userId, description, meetings }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.userId = userId;
    this.description = description;
    this.meetings = meetings;

    const team = TeamModel.getAll().find((team) => team.id === id);
    if (team) {
      this.id = team.id;
      this.name = team.name;
      this.color = team.color;
      this.userId = team.userId;
      this.description = team.description;
      this.meetings = team.meetings;
    }
  }

  // Essa função retorna todos os times
  static getAll() {
    return getData(TEAM_KEY) || [];
  }

  // Essa função retorna todos os times com os usuários
  static getMyTeamsWithUser() {
    const loggedUser = UserModel.getLoggedUser();
    return TeamModel.getAll()
      .filter((team) => team.userId === loggedUser.id)
      .map((team) => {
        return {
          ...team,
          users: TeamUsersModel.getUsersByTeamId(team.id),
        };
      });
  }

  static getAllTeamsMemberAndOwner() {
    const loggedUser = UserModel.getLoggedUser();
    const allTeams = TeamModel.getAll();
    const allTeamsUser = TeamUsersModel.getAll();
    return allTeams
      .filter((currentTeam) => {
        const userBelongsToThisTeam = allTeamsUser.some(
          ({ team, user }) =>
            user.id === loggedUser.id && team.id === currentTeam.id
        );

        return userBelongsToThisTeam;
      })
      .map((team) => {
        return {
          ...team,
          users: TeamUsersModel.getUsersByTeamId(team.id),
        };
      });
  }

  // Essa função cria um novo time
  create() {
    const loggedUser = UserModel.getLoggedUser();
    saveData(TEAM_KEY, [...TeamModel.getAll(), this]);
    TeamUsersModel.addUserToTeam({ teamId: this.id, userId: loggedUser.id });
  }

  // Essa função retorna um time específico pelo id
  getById(id) {
    const idToSearch = id || this.id;
    if (idToSearch) {
      const team = TeamModel.getAll().find((team) => team.id === idToSearch);

      return {
        ...team,
        users: TeamUsersModel.getUsersByTeamId(team.id),
      };
    }
    return null;
  }

  // Essa função atualiza um time
  update({ name, color }) {
    saveData(
      TEAM_KEY,
      TeamModel.getAll().map((team) => {
        if (team.id === this.id) {
          return {
            ...this,
            ...(name && { name }),
            ...(color && { color }),
          };
        }

        return team;
      })
    );
  }

  addMeeting(meeting) {
    saveData(
      TEAM_KEY,
      TeamModel.getAll().map((team) => {
        if (team.id === this.id) {
          return {
            ...this,
            meetings: [...(team.meetings || []), meeting],
          };
        }

        return team;
      })
    );
  }

  // Essa função deleta um time
  delete() {
    const totalBefore = TeamModel.getAll().length;
    const totalAfter = TeamModel.getAll().filter(
      (team) => team.id !== this.id
    ).length;
    saveData(
      TEAM_KEY,
      TeamModel.getAll().filter((team) => team.id !== this.id)
    );

    if (totalBefore === totalAfter) {
      throw new Error("Falha ao deletar");
    }

    return this.id;
  }
}
