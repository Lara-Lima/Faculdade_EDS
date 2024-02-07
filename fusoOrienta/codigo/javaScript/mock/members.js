import { STATUS } from "../constants/const.js";

const members = [
  {
    id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q",
    userId: "1",
    sentInviteUserId: "2",
    status: STATUS.approved,
  },
  {
    id: "c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r",
    userId: "1",
    sentInviteUserId: "3",
    status: STATUS.approved,
  },
  {
    id: "d3e4f5g6-h7i8-j9k0l1-m2n3o4p5q6r7s",
    userId: "1",
    sentInviteUserId: "4",
    status: STATUS.approved,
  },
  {
    id: "e4f5g6h7-i8j9-k0l1m2-n3o4p5q6r7s8t",
    userId: "1",
    sentInviteUserId: "5",
    status: STATUS.approved,
  },
  {
    id: "f5g6h7i8-j9k0l1m2-n3o4p5q6r7s8t9u0",
    userId: "1",
    sentInviteUserId: "6",
    status: STATUS.approved,
  },
  {
    id: "g6h7i8j9-k0l1m2n3-o4p5q6r7s8t9u0v1w",
    userId: "1",
    sentInviteUserId: "7",
    status: STATUS.approved,
  },
  {
    id: "h7i8j9k0-l1m2n3o4-p5q6r7s8t9u0v1w2x",
    userId: "1",
    sentInviteUserId: "8",
    status: STATUS.approved,
  },
  {
    id: " -m2n3o4p5-q6r7s8t9u0v1w2x3y4",
    userId: "9",
    sentInviteUserId: "1",
    status: STATUS.approved,
  },
  {
    id: "i5j6k7l8-m9n0-o1p2-q3r4-s5t6u7v8w9x0y1z2",
    userId: "10",
    sentInviteUserId: "1",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8t9u0v1w2x3y4z5a",
    userId: "11",
    sentInviteUserId: "1",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8tyhbyjnu9u0v1w2x3y4z5a",
    userId: "12",
    sentInviteUserId: "1",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8t9u0v1joikngjknw2x3y4z5a",
    userId: "13",
    sentInviteUserId: "1",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8t9u0vhuijnkhjikn1w2x3y4z5a",
    userId: "15",
    sentInviteUserId: "1",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8t9u0lnliohnjkjnjlliv1w2x3y4z5a",
    userId: "16",
    sentInviteUserId: "1",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8t9u0v10u9h8unw2x3y4z5a",
    userId: "1",
    sentInviteUserId: "17",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8t9u0lnjklv1w2x3y4z5a",
    userId: "1",
    sentInviteUserId: "18",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8t9u0lknnkjlv1w2x3y4z5a",
    userId: "1",
    sentInviteUserId: "19",
    status: STATUS.pending,
  },
  {
    id: "j9k0l1m2n3-o4p5q6r7s-8t9u0v1w2x3y4z5nkjna",
    userId: "1",
    sentInviteUserId: "20",
    status: STATUS.pending,
  },
];

export function mockMembers() {
  localStorage.removeItem("members");
  localStorage.setItem("members", JSON.stringify(members));
}
