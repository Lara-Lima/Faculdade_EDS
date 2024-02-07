export const loggedUsers = [
  {
    id: "4",
    name: "Sophia Rodriguez",
    email: "sophia@example.com",
    password: "pass1234",
    country: "Mexico",
    currency: "MXN",
    lunchTimeStart: "13:00",
    lunchTimeEnd: "14:00",
    officeHourStart: "09:30",
    officeHourEnd: "18:30",
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    password: "secret789",
    country: "Canada",
    currency: "CAD",
    lunchTimeStart: "12:30",
    lunchTimeEnd: "13:30",
    officeHourStart: "09:00",
    officeHourEnd: "18:00",
  },
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    country: "United States",
    currency: "USD",
    lunchTimeStart: "12:00",
    lunchTimeEnd: "13:00",
    officeHourStart: "08:00",
    officeHourEnd: "17:00",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    password: "securepass",
    country: "Australia",
    currency: "AUD",
    lunchTimeStart: "12:00",
    lunchTimeEnd: "13:00",
    officeHourStart: "08:30",
    officeHourEnd: "17:30",
  },
];

export function mockLoggedUser(userIndex = 3) {
  localStorage.removeItem("currentUser");
  localStorage.setItem("currentUser", JSON.stringify(loggedUsers[userIndex]));
}
