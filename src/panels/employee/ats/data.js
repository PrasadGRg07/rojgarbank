export const pipelineData = {
  applied: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      job: "Frontend Developer",
      appliedDate: "Jul 29",
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      job: "Frontend Developer",
      appliedDate: "Jul 28",
    },
  ],

  screening: [
    {
      id: 3,
      name: "David Wilson",
      email: "david@example.com",
      job: "Frontend Developer",
      appliedDate: "Jul 27",
    },
  ],

  interview: [
    {
      id: 4,
      name: "Emma Brown",
      email: "emma@example.com",
      job: "Frontend Developer",
      appliedDate: "Jul 26",
    },
  ],

  offer: [],

  hired: [],

  rejected: [],
};

export const interviewData = [
  {
    id: 1,
    candidate: "John Doe",
    job: "Frontend Developer",
    date: "2026-08-02",
    time: "10:00 AM",
    mode: "Online",
    interviewer: "HR Manager",
    status: "Scheduled",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    candidate: "Emma Brown",
    job: "Backend Developer",
    date: "2026-08-03",
    time: "2:00 PM",
    mode: "Offline",
    interviewer: "Technical Lead",
    status: "Completed",
    meetingLink: "",
  },
];