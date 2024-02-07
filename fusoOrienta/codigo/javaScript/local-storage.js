// Essas funções são usadas para fazer o gerenciamento de dados no localStorage.
export function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function saveData(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function deleteData(key) {
  return localStorage.removeItem(key);
}
