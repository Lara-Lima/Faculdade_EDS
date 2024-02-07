const teamUsers = [
  {
    id: "a0be604d-5623-438f-80b8-83b866311e3d",
    userId: "1",
    teamId: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p",
  },
  {
    id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q",
    userId: "1",
    teamId: "7a2b34c5-9e8d-6f7a-5c4b-3a2b1c0d9e8d",
  },
  {
    id: "e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t",
    userId: "1",
    teamId: "54321cba-edc9-ba98-7654-3210fedcba98",
  },
  {
    id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3213o4p5q",
    userId: "4",
    teamId: "7a2b34c5-9e8d-6f7a-5c4b-3a2b1c0d9e8d",
  },
  {
    id: "d4e5f6g7-h8i9-j0k1-l2m3n4o5p-a1b2c3d4e5f6",
    userId: "4",
    teamId: "23f56a89-4d7c-32e1-98a2-6b4cde0f9876",
  },
  {
    id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3213231o4p5q",
    userId: "4",
    teamId: "a1b2c3d4-E-k1l2m3n4o5p",
  },
  {
    id: "b1c2d3e4-X-l1m2n3213o4p5q",
    userId: "4",
    teamId: "c9b8a7d6-5f4e-3d2c-1b0a-9e8d7c6b5f4e",
  },
  {
    id: "b1c2d3e4-BBB-l1m2n3213o4p5q",
    userId: "4",
    teamId: "7a2b34c5-B-3a2b1c0d9e8d",
  },
  {
    id: "d4e5f6g7-CCC-a1b2c3d4e5f6",
    userId: "4",
    teamId: "c9b8a7d6-C-9e8d7c6b5f4e",
  },
  {
    id: "b1c2d3e4-DDD-l1m2n3213231o4p5q",
    userId: "3",
    teamId: "a1b2c3d4-E-k1l2m3n4o5p",
  },
  {
    id: "u0v1w2x3-EEE-e0f1g2h3i4j5",
    userId: "4",
    teamId: "54321cba-D-3210fedcba98",
  },
  {
    id: "b1c2d3e4-f5g6-h7i8-j92131k0-l1m2n3213231o4p5q",
    userId: "5",
    teamId: "7a2b34c5-9e8d-6f7a-5c4b-3a2b1c0d9e8d",
  },
  {
    id: "j9k0l1m2-n3o4p5q6-r7s8-t9u0-v1w2x3y4z5a",
    userId: "6",
    teamId: "c9b8a7d6-5f4e-3d2c-1b0a-9e8d7c6b5f4e",
  },
  {
    id: "k2l3m4n5-o6p7-q8r9-s0t1-u2v3w4x5y6z",
    userId: "7",
    teamId: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p",
  },
  {
    id: "a1b2c3d4-e5f6-g7h8-i9j0-k1wsdl2m3n4o5p",
    userId: "8",
    teamId: "23f56a89-4d7c-32e1-98a2-6b4cde0f9876",
  },
  {
    id: "y6z5a4b3-c2d1-e0f9-g8h7-i6j5k4l3m2n1o0",
    userId: "9",
    teamId: "c9b8a7d6-5f4e-3d2c-1b0a-9e8d7c6b5f4e",
  },
  {
    id: "p9q8r7s6-t5u4-v3w2-x1y0-z9a8b7c6d5e4f3g",
    userId: "10",
    teamId: "7a2b34c5-9e8d-6f7a-5c4b-3a2b1c0d9e8d",
  },
  {
    id: "h2i3j4k5-l6m7-n8o9-p0q1-r2s3t4u5v6w7x8y9z",
    userId: "11",
    teamId: "54321cba-edc9-ba98-7654-3210fedcba98",
  },
  {
    id: "p9q8r7s6-t5u4-v3w2-x1y0-z9a8b7c6dsd",
    userId: "1",
    teamId: "789-4jn-2hs79",
  },
  {
    id: "h2i3j4k5-l6m7-n8o9-p0q1-r2s3t4u5dx8y9z",
    userId: "1",
    teamId: "7909090-kljmh-72643j",
  },
];

export function mockTeamUsers() {
  localStorage.removeItem("team_users");
  localStorage.setItem("team_users", JSON.stringify(teamUsers));
}
