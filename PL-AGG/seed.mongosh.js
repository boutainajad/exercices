db.loans.deleteMany({});


db.loans.insertMany([
  {
    _id: "L01",
    memberId: "MB-002",
    equipmentId: "EQ-01",
    status: "RETURNED",
    startedAt: new Date("2026-03-01"),
    returnedAt: new Date("2026-03-04"),
    durationDays: 3,
    feeCents: 7000
  },
  {
    _id: "L02",
    memberId: "MB-002",
    equipmentId: "EQ-02",
    status: "RETURNED",
    startedAt: new Date("2026-03-05"),
    returnedAt: new Date("2026-03-08"),
    durationDays: 3,
    feeCents: 6000
  },
  {
    _id: "L03",
    memberId: "MB-002",
    equipmentId: "EQ-03",
    status: "RETURNED",
    startedAt: new Date("2026-03-10"),
    returnedAt: new Date("2026-03-12"),
    durationDays: 2,
    feeCents: 6000
  },

  {
    _id: "L04",
    memberId: "MB-001",
    equipmentId: "EQ-01",
    status: "RETURNED",
    startedAt: new Date("2026-03-01"),
    returnedAt: new Date("2026-03-03"),
    durationDays: 2,
    feeCents: 5000
  },
  {
    _id: "L05",
    memberId: "MB-001",
    equipmentId: "EQ-02",
    status: "RETURNED",
    startedAt: new Date("2026-03-04"),
    returnedAt: new Date("2026-03-06"),
    durationDays: 2,
    feeCents: 4000
  },
  {
    _id: "L06",
    memberId: "MB-001",
    equipmentId: "EQ-03",
    status: "RETURNED",
    startedAt: new Date("2026-03-07"),
    returnedAt: new Date("2026-03-09"),
    durationDays: 2,
    feeCents: 3000
  },
  {
    _id: "L07",
    memberId: "MB-001",
    equipmentId: "EQ-04",
    status: "RETURNED",
    startedAt: new Date("2026-03-10"),
    returnedAt: new Date("2026-03-12"),
    durationDays: 2,
    feeCents: 3000
  },
  {
    _id: "L08",
    memberId: "MB-001",
    equipmentId: "EQ-ARCHIVE",
    status: "RETURNED",
    startedAt: new Date("2026-03-13"),
    returnedAt: new Date("2026-03-15"),
    durationDays: 2,
    feeCents: 2000
  },

  {
    _id: "L09",
    memberId: "MB-003",
    equipmentId: "EQ-01",
    status: "RETURNED",
    startedAt: new Date("2026-03-01"),
    returnedAt: new Date("2026-03-03"),
    durationDays: 2,
    feeCents: 2000
  },
  {
    _id: "L10",
    memberId: "MB-003",
    equipmentId: "EQ-02",
    status: "RETURNED",
    startedAt: new Date("2026-03-04"),
    returnedAt: new Date("2026-03-06"),
    durationDays: 2,
    feeCents: 1800
  },
  {
    _id: "L11",
    memberId: "MB-003",
    equipmentId: "EQ-03",
    status: "RETURNED",
    startedAt: new Date("2026-03-07"),
    returnedAt: new Date("2026-03-09"),
    durationDays: 2,
    feeCents: 1600
  },

  {
    _id: "L12",
    memberId: "MB-004",
    equipmentId: "EQ-04",
    status: "RETURNED",
    startedAt: new Date("2026-03-10"),
    returnedAt: new Date("2026-03-12"),
    durationDays: 2,
    feeCents: 2000
  },

  {
    _id: "L13",
    memberId: "MB-001",
    equipmentId: "EQ-01",
    status: "ACTIVE",
    startedAt: new Date("2026-03-15"),
    returnedAt: null,
    durationDays: 0,
    feeCents: 5000
  },
  {
    _id: "L14",
    memberId: "MB-002",
    equipmentId: "EQ-02",
    status: "CANCELLED",
    startedAt: new Date("2026-03-16"),
    returnedAt: null,
    durationDays: 0,
    feeCents: 9000
  }
]);

print("Données de test insérées !");
db.equipments.insertMany([
  {
    _id: "EQ-01",
    category: "VIDEO",
    archived: false
  },
  {
    _id: "EQ-02",
    category: "INFORMATIQUE",
    archived: false
  },
  {
    _id: "EQ-03",
    category: "AUDIO",
    archived: false
  },
  {
    _id: "EQ-04",
    category: "VIDEO",
    archived: false
  },
  {
    _id: "EQ-ARCHIVE",
    category: "VIDEO",
    archived: true
  }
]);
db.members.insertMany([
  {
    _id: "MB-001",
    fullName: "Sara",
    city: "CASABLANCA",
    active: true
  },
  {
    _id: "MB-002",
    fullName: "Youssef",
    city: "RABAT",
    active: true
  },
  {
    _id: "MB-003",
    fullName: "Amine",
    city: "FES",
    active: false
  },
  {
    _id: "MB-004",
    fullName: "Salma",
    city: "CASABLANCA",
    active: true
  }
]);
db.maintenance.insertMany([
  {
    _id: "M01",
    equipmentId: "EQ-01",
    status: "DONE",
    performedAt: new Date("2026-03-01"),
    costCents: 3000
  },
  {
    _id: "M02",
    equipmentId: "EQ-01",
    status: "DONE",
    performedAt: new Date("2026-03-05"),
    costCents: 3500
  },
  {
    _id: "M03",
    equipmentId: "EQ-01",
    status: "DONE",
    performedAt: new Date("2026-03-10"),
    costCents: 3000
  },
  {
    _id: "M04",
    equipmentId: "EQ-02",
    status: "DONE",
    performedAt: new Date("2026-03-12"),
    costCents: 5000
  },
  {
    _id: "M05",
    equipmentId: "EQ-03",
    status: "DONE",
    performedAt: new Date("2026-03-15"),
    costCents: 1200
  },
  {
    _id: "M06",
    equipmentId: "EQ-04",
    status: "IN_PROGRESS",
    performedAt: new Date("2026-03-18"),
    costCents: 2000
  }
]);