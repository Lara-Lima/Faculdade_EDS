import UserModel from "./User.model.js";
import { STATUS } from "./constants/const.js";
import { saveData, getData } from "./local-storage.js";
import { createUUID } from "./generate-id.js";

const USER_MEMBER_KEY = "members";

export default class UserMemberModel {
  constructor({ id, userId, sentInviteUserId, status } = {}) {
    this.id = id;
    this.userId = userId;
    this.sentInviteUserId = sentInviteUserId;
    this.status = status;

    if (!id && !userId) {
      throw new Error(
        "ID do usuário é necessário para usar essa classe UserMemberModel"
      );
    }

    const user = UserMemberModel.getAll().find(
      (user) => user.id === this.id || user.userId === this.userId
    );

    if (user) {
      this.id = user.id;
      this.userId = user.userId;
      this.sentInviteUserId = user.sentInviteUserId;
      this.status = user.status;
    }
  }

  // Essa função retorna todos os membros
  static getAll() {
    const allMembers = getData(USER_MEMBER_KEY);
    if (allMembers) {
      return allMembers.map((member) => {
        const user = new UserModel({ id: member.userId });
        const sentInviteUser = new UserModel({ id: member.sentInviteUserId });
        return {
          ...member,
          user,
          sentInviteUser,
        };
      });
    }
    return [];
  }

  static getAllUsers() {
    const loggedUser = UserModel.getLoggedUser();

    return UserModel.getAll()
      .filter((user) => user.id !== loggedUser.id)
      .map((user) => {
        const member = new UserMemberModel({ userId: user.id });
        return {
          ...user,
          isWaitingLoggedUserInvite: member
            .getRelations()
            .some(
              (memberUser) =>
                (memberUser.userId === loggedUser.id ||
                  memberUser.sentInviteUserId === loggedUser.id) &&
                memberUser.status === STATUS.pending
            ),
        };
      });
  }

  static getAllUserMemberToInvite() {
    const loggedUser = UserModel.getLoggedUser();

    return UserModel.getAll()
      .filter((user) => user.id !== loggedUser.id)
      .filter((user) => {
        const membersWhoISentInvite = UserMemberModel.getAll().filter(
          (member) => member.sentInviteUserId === loggedUser.id
        );

        const membersWhoReceivedInvite = UserMemberModel.getAll().filter(
          (member) => member.userId === loggedUser.id
        );

        const hasConnectionLoggedUserSentInvite = membersWhoISentInvite.some(
          (member) =>
            member.userId === user.id && member.status === STATUS.pending
        );

        const approvedMembers = UserMemberModel.getAll().filter(
          (member) => member.status === STATUS.approved
        );

        const isUserApprovedAndMyConnection = approvedMembers.some(
          (member) =>
            (member.userId === user.id &&
              member.sentInviteUserId === loggedUser.id) ||
            (member.userId === loggedUser.id &&
              member.sentInviteUserId === user.id)
        );

        const hasLoggedUserHasInviteFromUser = membersWhoReceivedInvite.some(
          (member) =>
            member.sentInviteUserId === user.id &&
            member.status === STATUS.pending
        );

        if (hasLoggedUserHasInviteFromUser) {
          return false;
        }

        if (hasConnectionLoggedUserSentInvite) {
          return true;
        }
        if (isUserApprovedAndMyConnection) {
          return false;
        }
        return true;
      })
      .map((user) => {
        const member = new UserMemberModel({ userId: user.id });
        const isWaitingLoggedUserInvite = member
          .getRelations()
          .some(
            (memberUser) =>
              (memberUser.userId === loggedUser.id ||
                memberUser.sentInviteUserId === loggedUser.id) &&
              memberUser.status === STATUS.pending &&
              memberUser.sentInviteUserId === loggedUser.id
          );
        return {
          ...user,
          isWaitingLoggedUserInvite,
        };
      });
  }

  getAllUsersToInvite() {
    return UserModel.getAll()
      .filter((user) => user.id !== this.userId)
      .filter((user) => {
        const member = new UserMemberModel({ userId: user.id });
        return !member
          .getRelations()
          .some(
            (memberUser) =>
              (memberUser.userId === this.userId ||
                memberUser.sentInviteUserId === this.userId) &&
              memberUser.status === STATUS.approved
          );
      })
      .map((user) => {
        const member = new UserMemberModel({ userId: user.id });
        return {
          ...user,
          isWaitingLoggedUserInvite: member
            .getRelations()
            .some(
              (memberUser) =>
                (memberUser.userId === this.userId ||
                  memberUser.sentInviteUserId === this.userId) &&
                memberUser.status === STATUS.pending
            ),
        };
      });
  }

  getRelations() {
    return UserMemberModel.getAll().filter((member) => {
      return (
        member.sentInviteUserId === this.userId || member.userId === this.userId
      );
    });
  }

  getApprovedMembers() {
    return this.getRelations().filter((member) => {
      return member.status === STATUS.approved;
    });
  }

  getApprovedUsers() {
    const loggedUser = UserModel.getLoggedUser();
    return this.getApprovedMembers().map((member) => {
      if (member.userId === loggedUser.id) {
        return member.sentInviteUser;
      }
      return member.user;
    });
  }

  getPendingToAcceptMembers() {
    return this.getRelations().filter((member) => {
      return member.status === STATUS.pending && member.userId === this.userId;
    });
  }

  getMembersWaitingMyInvite() {
    return this.getRelations().filter((member) => {
      return (
        member.status === STATUS.pending &&
        member.sentInviteUserId === this.userId
      );
    });
  }

  static sendInvite(userId) {
    const loggedUser = UserModel.getLoggedUser();
    return UserMemberModel.createNew({
      id: createUUID(),
      userId,
      sentInviteUserId: loggedUser.id,
      status: STATUS.pending,
    });
  }

  static acceptInvite(sentInviteUserId) {
    const loggedUser = UserModel.getLoggedUser();
    const member = UserMemberModel.getAll().find(
      (member) =>
        member.sentInviteUserId === sentInviteUserId &&
        member.userId === loggedUser.id
    );

    if (member) {
      return UserMemberModel.updateStatic({
        ...member,
        status: STATUS.approved,
      });
    }
  }
  static repproveInvite(userId) {
    const loggedUser = UserModel.getLoggedUser();
    const member = UserMemberModel.getAll().find(
      (member) =>
        (member.userId === userId &&
          member.sentInviteUserId === loggedUser.id) ||
        (member.userId === loggedUser.id && member.sentInviteUserId === userId)
    );

    if (member) {
      return UserMemberModel.updateStatic({
        ...member,
        status: STATUS.repproved,
      });
    }
  }

  // Essa função cria um novo membro
  create() {
    saveData(USER_MEMBER_KEY, [...UserMemberModel.getAll(), this]);
  }

  static createNew(member) {
    saveData(USER_MEMBER_KEY, [...UserMemberModel.getAll(), member]);
  }

  // Essa função pega um membro pelo id
  getById(id) {
    const idToSearch = id || this.id;
    if (idToSearch) {
      return UserMemberModel.getAll().find((user) => user.id === idToSearch);
    }
  }

  // Essa função pega os membros do usuario logado
  static getMyMembers() {
    const loggedUser = UserModel.getLoggedUser();

    return UserMemberModel.getAll().filter(
      (member) => member.sentInviteUserId === loggedUser.id
    );
  }

  // Essa função atualiza um Membro
  update({ userId, sentInviteUserId, status }) {
    saveData(
      USER_MEMBER_KEY,
      UserMemberModel.getAll().map((user) => {
        if (user.id === this.id) {
          return {
            ...this,
            ...(status && { status }),
            ...(userId && { userId }),
            ...(sentInviteUserId && { sentInviteUserId }),
          };
        }

        return user;
      })
    );
  }
  // Essa função atualiza um Membro
  static updateStatic({ id, userId, sentInviteUserId, status }) {
    saveData(
      USER_MEMBER_KEY,
      UserMemberModel.getAll().map((user) => {
        if (user.id === id) {
          return {
            ...user,
            ...(status && { status }),
            ...(userId && { userId }),
            ...(sentInviteUserId && { sentInviteUserId }),
          };
        }

        return user;
      })
    );
  }

  // Essa função deleta um membro
  static delete(id) {
    const loggedUser = UserModel.getLoggedUser();
    const allMembers = UserMemberModel.getAll();

    const filteredMembers = allMembers.filter((member) => member.id !== id);
    saveData(USER_MEMBER_KEY, filteredMembers);
  }
}
