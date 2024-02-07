// Essa função gera um id aleatório para ser usado em models.
// Essa função foi retirada no stackoverflow. Link: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
