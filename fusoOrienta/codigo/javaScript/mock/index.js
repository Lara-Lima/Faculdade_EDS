import { mockTeamUsers } from "./team-user.js";
import { mockMembers } from "./members.js";
import { mockTeam } from "./team.js";
import { mockUser } from "./user.js";
import { mockLoggedUser } from "./logged-user.js";

export function mockData(force = false) {
  if (localStorage.length === 0 || force) {
    mockTeamUsers();
    mockMembers();
    mockTeam();
    mockUser();
  }
}
