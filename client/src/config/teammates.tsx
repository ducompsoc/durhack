export enum Team {
  LEADERSHIP_STRAT = "Leadership & Strategy",
  HACKER_EXP = "Hacker Experience",
  MARKETING = "Marketing",
  TECH = "Tech",
  DESIGN = "Design",
  FINANCE = "Finance",
  LOGISTICS = "Logistics",
  SPONSORSHIP = "Sponsorship",
  LEGAL = "LEGAL",
  EMERITUS_MEMBER = "Emeritus Member",
}

export type Teammate = {
  name: string
  team: Team
  role: string
  img_path: string
}

export const teammates: Teammate[] = [
  // TODO add literally all of our beloved teammates here <3
  {
    name: "Joe Clack",
    team: Team.TECH,
    role: "Lead",
    img_path: "/assets/teammates/joe.png"
  },
  {
    name: "Karl Southern",
    team: Team.EMERITUS_MEMBER,
    role: "",
    img_path: "/assets/teammates/karl.png"
  },
  {
    name: "Eve Sherratt-Cross",
    team: Team.HACKER_EXP,
    role: "",
    img_path: "/assets/teammates/eve.png"
  },
  {
    name: "Quinn Dines",
    team: Team.HACKER_EXP,
    role: "",
    img_path: "/assets/teammates/quinn.png"
  },
  {
    name: "Adrienne Lam",
    team: Team.MARKETING,
    role: "",
    img_path: "/assets/teammates/adrienne.png"
  },
  {
    name: "Oscar Ryley",
    team: Team.HACKER_EXP,
    role: "",
    img_path: "/assets/teammates/oscar.png"
  },
  {
    name: "Clarissa Hui",
    team: Team.DESIGN,
    role: "",
    img_path: "/assets/teammates/clarissa.png"
  },
  {
    name: "Jin Koh",
    team: Team.LEGAL,
    role: "",
    img_path: "/assets/teammates/jin.png"
  },
  {
    name: "Palak Shah",
    team: Team.SPONSORSHIP,
    role: "",
    img_path: "/assets/teammates/palak.png"
  },
  {
    name: "Lizete Viljoen",
    team: Team.LEADERSHIP_STRAT,
    role: "",
    img_path: "/assets/teammates/lizete.png"
  },
  {
    name: "Maks Nowak",
    team: Team.HACKER_EXP,
    role: "",
    img_path: "/assets/teammates/maks.png"
  },
  {
    name: "Shawn Goey",
    team: Team.DESIGN,
    role: "",
    img_path: "/assets/teammates/shawn.png"
  },
  {
    name: "Emily Rose",
    team: Team.SPONSORSHIP,
    role: "",
    img_path: "/assets/teammates/emily.png"
  },
  {
    name: "Dino",
    team: Team.EMERITUS_MEMBER,
    role: "",
    img_path: "/assets/teammates/dino.png"
  },
  {
    name: "Andrea Johnson",
    team: Team.HACKER_EXP,
    role: "",
    img_path: "/assets/teammates/andrea.png"
  },
  {
    name: "Rebecca Mewse",
    team: Team.HACKER_EXP,
    role: "",
    img_path: "/assets/teammates/rebecca.png"
  }
]
