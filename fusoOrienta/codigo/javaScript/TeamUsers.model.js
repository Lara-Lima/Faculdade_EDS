import TeamModel from "./Team.model.js";
import UserModel from "./User.model.js";
import { saveData, getData } from "./local-storage.js";
import { createUUID } from "./generate-id.js";

const TEAM_KEY = "team_users";

export default class TeamUsersModel {
  constructor({ id, teamId, userId }) {
    this.id = id;
    this.userId = userId;
    this.teamId = teamId;

    const teamUser = TeamUsersModel.getAll().find(
      ({ user, team }) => user.id === userId && team.id === teamId
    );
    if (teamUser) {
      this.id = teamUser.id;
      this.userId = teamUser.user.id;
      this.teamId = teamUser.team.id;
    }
  }

  // Essa função retorna todos os usuários de todos os times
  static getAll() {
    const teamUsers = getData(TEAM_KEY) || [];
    if (teamUsers) {
      return teamUsers.map((teamUser) => {
        const user = new UserModel({ id: teamUser.userId });
        const team = new TeamModel({ id: teamUser.teamId });
        return {
          id: teamUser.id,
          user,
          team,
        };
      });
    }
    return [];
  }

  // Essa função retorna todos os usuários de um time específico
  static getUsersByTeamId(teamId) {
    const teamUsers = getData(TEAM_KEY) || [];

    return teamUsers
      .filter((teamUser) => teamUser.teamId === teamId)
      .map((teamUser) => {
        const user = new UserModel({ id: teamUser.userId });
        return user;
      });
  }

  // Essa função cria um nova relação entre usuário e time
  create() {
    saveData(TEAM_KEY, [...TeamUsersModel.getAll(), this]);
  }

  static addUserToTeam({ userId, teamId }) {
    const teamUsers = getData(TEAM_KEY) || [];
    if (!userId || !teamId) {
      throw new Error("userId e teamId são obrigatórios");
    }
    saveData(TEAM_KEY, [
      ...teamUsers,
      {
        userId,
        teamId,
        id: createUUID(),
      },
    ]);
  }

  // Essa função atualiza uma relação entre usuário e time
  update() {
    const teamUsers = TeamUsersModel.getAll();
    const index = teamUsers.findIndex((teamUser) => teamUser.id === this.id);
    teamUsers[index] = this;
    saveData(TEAM_KEY, teamUsers);
  }

  // Essa função deleta uma relação entre usuário e time
  delete() {
    const teamUsers = TeamUsersModel.getAll();
    const index = teamUsers.findIndex(
      ({ team, user }) => user.id === this.userId && team.id === this.teamId
    );
    if (index === -1) {
      throw new Error("Não foi encontrado o TeamUser");
    }
    teamUsers.splice(index, 1);
    saveData(
      TEAM_KEY,
      teamUsers.map(({ id, team, user }) => ({
        id,
        userId: user.id,
        teamId: team.id,
      }))
    );
  }

  // Essa função retorna uma relação entre usuário e time pelo id
  getById(id) {
    const idToSearch = id || this.id;
    if (idToSearch) {
      return TeamUsersModel.getAll().find((team) => team.id === idToSearch);
    }
  }
}
