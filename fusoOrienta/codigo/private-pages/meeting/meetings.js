import UserModel from "../../javaScript/User.model.js";
import TeamModel from "../../javaScript/Team.model.js";
import { daysOfTheWeek } from "../../javaScript/constants/const.js";

function dayOfTheWeekCard({ day, teamsWithMeetings }) {
  const div = document.createElement("div");
  div.className = "col-lg-4 col-md-6";

  const cardTeam = document.createElement("div");
  cardTeam.className = "card-team";

  const img = document.createElement("img");
  img.src = "../../img/thursday.png";
  img.alt = "";

  const h5 = document.createElement("h5");
  h5.textContent = day;

  const ul = document.createElement("ul");
  ul.className = "list-group list-group-flush overflow-auto w-100";

  teamsWithMeetings.forEach((team) => {
    team.meetings?.forEach((meeting) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex gap-2 align-items-center justify-content-center";

      const span = document.createElement("span");
      span.className = "badge bg-blueDark rounded-pill";
      span.textContent = `${meeting.hourMeeting}:00`;
      li.textContent = team.name;
      li.appendChild(span);
      ul.appendChild(li);
    });
  });

  const hasMeetings = teamsWithMeetings.some(
    (team) => (team.meetings?.length || 0) > 0
  );
  if (!hasMeetings) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = "Não há reuniões";
    ul.appendChild(li);
  }

  cardTeam.appendChild(img);
  cardTeam.appendChild(h5);
  cardTeam.appendChild(ul);

  div.appendChild(cardTeam);
  return div;
}

function filteredTeamsByMeetingTime(timeNow) {
  const checkboxes = document.querySelectorAll(".form-check-input");
  const checkboxesChecked = Array.from(checkboxes).filter(function (checkbox) {
    return checkbox.checked;
  });

  const teams = TeamModel.getAllTeamsMemberAndOwner();

  return teams.map((team) => {
    return {
      ...team,
      meetings: team.meetings?.filter((meeting) => {
        if (checkboxesChecked.length === 0) {
          return true;
        }
        if (
          checkboxesChecked.some((checkbox) => checkbox.value === "option1") &&
          meeting.hourMeeting < timeNow
        ) {
          return true;
        }
        if (
          checkboxesChecked.some((checkbox) => checkbox.value === "option2") &&
          meeting.hourMeeting === timeNow
        ) {
          return true;
        }
        if (
          checkboxesChecked.some((checkbox) => checkbox.value === "option3") &&
          meeting.hourMeeting > timeNow
        ) {
          return true;
        }

        return false;
      }),
    };
  });
}

function filteredMeetingg({ teams, dayToday }) {
  return teams.map((team) => ({
    ...team,
    meetings: team.meetings?.filter(
      (meeting) => meeting.dayMeeting === dayToday
    ),
  }));
}

function modalMeetings(dayToday, timeNow) {
  const myModal = new bootstrap.Modal(
    document.getElementById("modal-meetings-today")
  );

  const nameUserElement = document.querySelector(".user-name");
  const closeModalElement = document.querySelector(".close-modal");
  const loggedUser = UserModel.getLoggedUser();

  nameUserElement.innerHTML = loggedUser.name;

  closeModalElement.addEventListener("click", () => {
    myModal.hide();
  });

  const teams = TeamModel.getAllTeamsMemberAndOwner();

  const filteredMeeting = filteredMeetingg({
    teams,
    dayToday,
    timeNow,
  });

  const hasMeetings = filteredMeeting.some(
    (team) => (team.meetings?.length || 0) > 0
  );

  if (hasMeetings) {
    myModal.show();
  }

  const meetingTodayElement = document.getElementById("btn-meeting-today");
  if (!hasMeetings) {
    meetingTodayElement.style.display = "none";
  } else {
    meetingTodayElement.style.display = "unset";
  }

  meetingTodayElement.addEventListener("click", () => {
    Array.from(document.querySelectorAll(".modal-backdrop.fade.show")).forEach(
      function (modal) {
        modal.remove();
      }
    );
    myModal.show();
  });

  const modalBodyElement = document.querySelector(".times-meetings");

  function listMeetingToday({ teamName, hourMeeting, color, teamId }) {
    const containerAlert = document.createElement("div");
    const indicatorRounded = document.createElement("div");
    const nameMeetingTeam = document.createElement("span");
    const hourMeetingTeam = document.createElement("span");
    const detailsTeamButton = document.createElement("button");

    const timeText = document.createTextNode("Equipe ");
    const atText = document.createTextNode(" às ");
    const horasText = document.createTextNode(" horas.");

    detailsTeamButton.textContent = "Entrar";
    detailsTeamButton.style.marginLeft = "auto";

    containerAlert.classList.add(
      "meetingToday",
      "d-flex",
      "justify-content-between",
      "gap-2"
    );
    indicatorRounded.classList.add("rounded");
    nameMeetingTeam.classList.add("nameMeetingTeam");
    hourMeetingTeam.classList.add("hourMeetingTeam");
    detailsTeamButton.classList.add("btn", "btn-outline-primary", "btn-sm");

    nameMeetingTeam.innerHTML = teamName;
    hourMeetingTeam.innerHTML = hourMeeting;

    indicatorRounded.style.backgroundColor = color;

    containerAlert.setAttribute("role", "meetingToday");
    containerAlert.appendChild(indicatorRounded);

    containerAlert.appendChild(timeText);
    containerAlert.appendChild(nameMeetingTeam);
    containerAlert.appendChild(atText);
    containerAlert.appendChild(hourMeetingTeam);
    containerAlert.appendChild(horasText);
    containerAlert.appendChild(detailsTeamButton);

    detailsTeamButton.addEventListener("click", function () {
      window.location.href = `../team/internalTeam.html?id=${teamId}`;
    });

    return containerAlert;
  }

  document.querySelector(".filterTime.pb-4").addEventListener("change", (e) => {
    modalBodyElement.innerHTML = "";
    const newTeams = filteredTeamsByMeetingTime(timeNow);

    const meetingsToday = filteredMeetingg({
      teams: newTeams,
      dayToday,
      timeNow,
    });

    meetingsToday.forEach((team) => {
      team.meetings?.forEach((meeting) => {
        const element = listMeetingToday({
          teamName: team.name,
          hourMeeting: meeting.hourMeeting,
          color: team.color,
          teamId: team.id,
        });

        modalBodyElement.appendChild(element);
      });
    });
  });

  modalBodyElement.innerHTML = "";

  filteredMeeting.forEach((team) => {
    team.meetings?.forEach((meeting) => {
      const element = listMeetingToday({
        teamName: team.name,
        hourMeeting: meeting.hourMeeting,
        color: team.color,
        teamId: team.id,
      });

      modalBodyElement.appendChild(element);
    });
  });
}

function start() {
  const logOutButtonElement = document.querySelector("#log-out");
  logOutButtonElement.addEventListener("click", () => {
    UserModel.logOut();
    window.location.href = "../../index.html";
  });

  const listDayMeetings = document.getElementById("list-days-meetings");

  const daysOfTheWeekCopy = [...daysOfTheWeek];
  const sunday = daysOfTheWeekCopy.shift();
  daysOfTheWeekCopy.push(sunday);
  daysOfTheWeekCopy.forEach((day, index) => {
    const isTheLastDay = index === daysOfTheWeekCopy.length - 1;
    const correctIndex = isTheLastDay ? 0 : index + 1;
    const teams = TeamModel.getAllTeamsMemberAndOwner();
    const teamsWithMeetings = teams.map((team) => ({
      ...team,
      meetings: team.meetings?.filter(
        (meeting) => meeting.dayMeeting === correctIndex
      ),
    }));

    listDayMeetings.appendChild(dayOfTheWeekCard({ day, teamsWithMeetings }));
  });
  var currentDate = new Date();

  var dayToday = currentDate.getDay();

  var timeNow = currentDate.getHours();

  modalMeetings(dayToday, timeNow);
}
document.addEventListener("DOMContentLoaded", () => {
  start();
});
