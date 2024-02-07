import { saveData, deleteData, getData } from "./local-storage.js";
import { getAvatarUrl } from "./mock/user.js";

// Local onde é feito o CRUD
const USER_KEY = "users";

export default class UserModel {
  constructor({
    id,
    name,
    email,
    password,
    country,
    currency,
    countryId,
    lunchTimeStart,
    lunchTimeEnd,
    officeHourStart,
    officeHourEnd,
    timezone,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.country = country;
    this.countryId = countryId;
    this.currency = currency;
    this.image = getAvatarUrl(name);
    this.lunchTimeStart = lunchTimeStart;
    this.lunchTimeEnd = lunchTimeEnd;
    this.officeHourStart = officeHourStart;
    this.officeHourEnd = officeHourEnd;
    this.timezone = timezone;

    const user = UserModel.getAll().find((user) => user.id === id);
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      this.country = user.country;
      this.currency = user.currency;
      this.countryId = user.countryId;
      this.image = getAvatarUrl(user.name);
      this.lunchTimeStart = user.lunchTimeStart;
      this.lunchTimeEnd = user.lunchTimeEnd;
      this.officeHourStart = user.officeHourStart;
      this.officeHourEnd = user.officeHourEnd;
      this.members = user.members;
      this.timezone = user.timezone;
    }
  }

  // Obtém todos os usuários armazenados
  static getAll() {
    return getData(USER_KEY) || [];
  }

  // Cria um novo usuário adicionando-o à lista de usuários existente e salva os dados.
  create() {
    saveData(USER_KEY, [...UserModel.getAll(), this]);
  }

  // Obtém um usuário pelo ID fornecido.
  getById(id) {
    const idToSearch = id || this.id;
    if (idToSearch) {
      return UserModel.getAll().find((user) => user.id === idToSearch);
    }
  }

  // Obtém um usuário pelo email fornecido.
  getByEmail(email) {
    const emailToSearch = email || this.email;
    if (emailToSearch) {
      return UserModel.getAll().find((user) => user.email === emailToSearch);
    }
  }

  // Obtém o usuário logado atualmente.
  static getLoggedUser() {
    return getData("currentUser");
  }

  // Define o usuário logado atualmente.
  setCurrentUser({ id, email } = {}) {
    if (email || this.email) {
      return saveData("currentUser", this.getByEmail(email || this.email));
    }
    if (id || this.id) {
      return saveData("currentUser", this.getById(id || this.id));
    }

    console.warn("No user detected");
  }

  // Remove o usuário logado atualmente e redireciona para a página de login.
  static logOut() {
    deleteData("currentUser");
  }

  // Realiza o login do usuário com base no email e senha fornecidos.
  logIn() {
    const userList = UserModel.getAll();
    const userTryingToLogin = userList.find(
      (user) => user.email === this.email && user.password === this.password
    );

    if (!userTryingToLogin) {
      return alert("Email ou senha incorreto");
    }
    this.setCurrentUser({ email: this.email });
    window.location.href = "../../codigo/private-pages/team/team.html";
  }

  // Atualiza as informações do usuário com base nos valores fornecidos e salva os dados atualizados.
  update({
    name,
    email,
    password,
    countryId,
    image,
    lunchTimeStart,
    lunchTimeEnd,
    officeHourStart,
    officeHourEnd,
    availableCountries,
  }) {
    let country;
    let currency;

    if (
      countryId &&
      (!availableCountries || availableCountries?.length === 0)
    ) {
      throw new Error("O parametro availableCountries não pode estar vazio!");
    }
    if (countryId) {
      const countryData = availableCountries.find(
        (country) => countryId === country.id
      );
      country = countryData.portugueseName;
      currency = countryData.currency;
    }

    saveData(
      USER_KEY,
      UserModel.getAll().map((user) => {
        if (user.id === this.id) {
          return {
            ...user,
            ...(name && { name }),
            ...(country && { country }),
            ...(countryId && { countryId }),
            ...(email && { email }),
            ...(password && { password }),
            ...(currency && { currency }),
            ...(image && { image }),
            ...(lunchTimeStart && { lunchTimeStart }),
            ...(lunchTimeEnd && { lunchTimeEnd }),
            ...(officeHourStart && { officeHourStart }),
            ...(officeHourEnd && { officeHourEnd }),
          };
        }

        return user;
      })
    );
    this.setCurrentUser();
  }

  // Remove o usuário atual da lista de usuários e salva os dados atualizados.
  delete() {
    saveData(
      USER_KEY,
      UserModel.getAll().filter((user) => user.id !== this.id)
    );
  }
}
