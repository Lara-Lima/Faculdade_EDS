import { daysOfTheWeek } from "../../../javaScript/constants/const.js";
import TeamModel from "../../../javaScript/Team.model.js";

export function findBestMeetingTimes(users) {
  const meetingDuration = 1;

  const workingHours = users.map((user) => {
    const startInitial = parseInt(user.officeHourStart.split(":")[0]);
    const minutes = parseInt(user.officeHourStart.split(":")[1]);
    const start = minutes > 0 ? startInitial + 1 : startInitial;
    const end =
      parseInt(user.officeHourEnd.split(":")[0]) - meetingDuration + 1;
    return { userId: user.id, start, end };
  });

  const lunchHours = users.map((user) => {
    const start = parseInt(user.lunchTimeStart.split(":")[0]);
    const end = parseInt(user.lunchTimeEnd.split(":")[0]) - meetingDuration + 1;
    return { userId: user.id, start, end };
  });

  // Encontrar os horários disponíveis para a reunião
  const availableTimes = [];
  for (let hour = 0; hour <= 23; hour++) {
    const meetingStart = hour;
    const meetingEnd = hour + meetingDuration;

    const canAttendMeeting = workingHours.every((workingHour) => {
      const { start, end } = workingHour;
      return meetingStart >= start && meetingEnd <= end;
    });

    if (canAttendMeeting) {
      // Verificar se algum usuário tem o horário de almoço nesse horário
      const peopleAffected = lunchHours
        .filter(
          (lunchHour) =>
            meetingStart >= lunchHour.start && meetingEnd <= lunchHour.end
        )
        .map(
          (lunchHour) => users.find((user) => user.id === lunchHour.userId).name
        );

      availableTimes.push({
        start: meetingStart,
        end: meetingEnd,
        peopleAffected,
      });
    }
  }

  return availableTimes;
}

export function renderDaysOfWeek() {
  const dayWeekSelect = document.getElementById("day-week-select");

  const daysOfWeekCopy = [...daysOfTheWeek];
  const sunday = daysOfWeekCopy.shift();
  daysOfWeekCopy.push(sunday);

  daysOfWeekCopy.forEach((day) => {
    const option = document.createElement("option");
    option.value = day;
    option.innerHTML = day;
    dayWeekSelect.appendChild(option);
  });
}

export function handleFormRegisterMeeting(teamId) {
  const team = new TeamModel({ id: teamId });
  const formRegisterMeeting = document.getElementById("form-register-meeting");

  formRegisterMeeting.addEventListener("submit", (event) => {
    event.preventDefault();

    const elements = event.target.elements;

    const dayOfWeek = daysOfTheWeek.indexOf(elements["day-of-week"].value);

    const time = parseInt(elements["times-meeting"].value.split(":")[0]);

    team.addMeeting({
      dayMeeting: dayOfWeek,
      hourMeeting: time,
    });
    renderMeetings(teamId);
  });
}

export function renderBestTimes(users) {
  const times = findBestMeetingTimes(users);
  const worstTimes = times.filter((time) => time.peopleAffected.length > 0);
  const bestTimes = times.filter((time) => time.peopleAffected.length === 0);
  const listBestTimes = document.getElementById("list-best-times");
  const buttonsWrapper = document.getElementById("buttons-wrapper");
  const noTimesFound = document.getElementById("no-times-found");
  listBestTimes.innerHTML = "";
  if (times.length === 0) {
    buttonsWrapper.classList.add("d-none");
    noTimesFound.classList.remove("d-none");

    return;
  }
  bestTimes.forEach((time) => {
    const span = document.createElement("span");
    span.classList.add("p-1");
    span.innerHTML = `${time.start}:00 - ${time.end}:00`;
    listBestTimes.appendChild(span);
  });

  const listWorstTimes = document.getElementById("list-worst-times");
  listWorstTimes.innerHTML = "";
  worstTimes.forEach((time) => {
    const div = document.createElement("div");
    div.innerHTML = `Os horários a seguir pegam o horario de almoco de ${time.peopleAffected.join(
      ", "
    )}:`;
    const span = document.createElement("span");
    span.classList.add("p-1");
    span.innerHTML = `${time.start}:00`;
    div.appendChild(span);
    listWorstTimes.appendChild(div);
  });
}

export function convertUsersToTimeZone({ users, loggedUser }) {
  const loggedUserTimeZone = loggedUser.timezone / 60;
  return users.map((user) => {
    let horaDeTrabalhoInicio = parseInt(user.officeHourStart.split(":")[0]);
    let horaDeTrabalhoFim = parseInt(user.officeHourEnd.split(":")[0]);
    let horaDeAlmocoInicio = parseInt(user.lunchTimeStart.split(":")[0]);
    let horaDeAlmocoFim = parseInt(user.lunchTimeEnd.split(":")[0]);

    const currentUserTimeZone = user.timezone / 60;

    if (loggedUserTimeZone > currentUserTimeZone) {
      horaDeTrabalhoInicio =
        horaDeTrabalhoInicio + (loggedUserTimeZone - currentUserTimeZone);
      horaDeTrabalhoFim =
        horaDeTrabalhoFim + (loggedUserTimeZone - currentUserTimeZone);
      horaDeAlmocoInicio =
        horaDeAlmocoInicio + (loggedUserTimeZone - currentUserTimeZone);
      horaDeAlmocoFim =
        horaDeAlmocoFim + (loggedUserTimeZone - currentUserTimeZone);

      if (horaDeTrabalhoInicio > 24) {
        horaDeTrabalhoInicio = horaDeTrabalhoInicio - 24;
        horaDeTrabalhoFim = horaDeTrabalhoFim - 24;
        horaDeAlmocoInicio = horaDeAlmocoInicio - 24;
        horaDeAlmocoFim = horaDeAlmocoFim - 24;
      }
    } else if (loggedUserTimeZone < currentUserTimeZone) {
      horaDeTrabalhoInicio =
        horaDeTrabalhoInicio - (currentUserTimeZone - loggedUserTimeZone);
      horaDeTrabalhoFim =
        horaDeTrabalhoFim - (currentUserTimeZone - loggedUserTimeZone);
      horaDeAlmocoInicio =
        horaDeAlmocoInicio - (currentUserTimeZone - loggedUserTimeZone);
      horaDeAlmocoFim =
        horaDeAlmocoFim - (currentUserTimeZone - loggedUserTimeZone);

      if (horaDeTrabalhoInicio < 0) {
        horaDeTrabalhoInicio = horaDeTrabalhoInicio + 24;
        horaDeTrabalhoFim = horaDeTrabalhoFim + 24;
        horaDeAlmocoInicio = horaDeAlmocoInicio + 24;
        horaDeAlmocoFim = horaDeAlmocoFim + 24;
      }
    }

    return {
      ...user,
      officeHourStart: `${horaDeTrabalhoInicio}:00`,
      officeHourEnd: `${horaDeTrabalhoFim}:00`,
      lunchTimeStart: `${horaDeAlmocoInicio}:00`,
      lunchTimeEnd: `${horaDeAlmocoFim}:00`,
    };
  });
}

function listMeetingToday(meeting) {
  const containerAlert = document.createElement("div");
  const indicatorRounded = document.createElement("div");
  const textMeeting = document.createElement("span");

  containerAlert.classList.add("meetingToday", "text-center", "my-2");
  indicatorRounded.classList.add("rounded");

  textMeeting.innerHTML = `Reunião ${daysOfTheWeek[meeting.dayMeeting]} às ${
    meeting.hourMeeting
  }:00`;

  containerAlert.setAttribute("role", "meetingToday");
  containerAlert.appendChild(indicatorRounded);

  containerAlert.appendChild(textMeeting);

  return containerAlert;
}

export function renderMeetings(teamId) {
  const teamMeetingsList = document.getElementById("team-meetings-list");

  const team = new TeamModel({ id: teamId });
  const meetings = team?.meetings || [];

  if (meetings.length > 0) {
    teamMeetingsList.innerHTML = "";
  }
  meetings.forEach((meeting) => {
    teamMeetingsList.appendChild(listMeetingToday(meeting));
  });
}
