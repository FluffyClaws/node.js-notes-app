export interface Note {
  id: number;
  content: string;
  category: string;
  dates: string[];
  archived: boolean;
}

export const notesRepository: Note[] = [
  {
    id: 1,
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Task",
    dates: [],
    archived: false,
  },
  {
    id: 2,
    content:
      "I'm gonna have a doctor appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Idea",
    dates: [],
    archived: true,
  },
  {
    id: 3,
    content:
      "I'm gonna have a mechanic appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Randow Thought",
    dates: [],
    archived: false,
  },
  {
    id: 4,
    content:
      "I'm gonna have a plumber appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Idea",
    dates: [],
    archived: true,
  },
  {
    id: 5,
    content:
      "I'm gonna have a electritian appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Task",
    dates: [],
    archived: false,
  },
  {
    id: 6,
    content:
      "I'm gonna have a cleaner appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Task",
    dates: [],
    archived: true,
  },
  {
    id: 7,
    content:
      "I'm gonna have a gov.official appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Randow Thought",
    dates: [],
    archived: true,
  },
];
