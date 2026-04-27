export interface ClassSlot {
  type: string;
  time: string;
}

export interface DaySchedule {
  day: string;
  classes: ClassSlot[];
  closed?: boolean;
}

export const schedule: DaySchedule[] = [
  {
    day: 'Monday',
    classes: [{ type: 'ADULT GI', time: '6PM – 7PM' }],
  },
  {
    day: 'Tuesday',
    classes: [
      { type: 'KIDS GI', time: '5PM – 5:50PM' },
      { type: 'ADULT GI', time: '6PM – 7PM' },
    ],
  },
  {
    day: 'Wednesday',
    classes: [{ type: 'ADULT GI', time: '6AM – 7AM' }],
  },
  {
    day: 'Thursday',
    classes: [
      { type: 'KIDS GI', time: '5PM – 5:50PM' },
      { type: 'ADULT GI', time: '6PM – 7PM' },
    ],
  },
  {
    day: 'Friday',
    classes: [{ type: 'ADULT GI', time: '6AM – 7AM' }],
  },
  {
    day: 'Saturday',
    classes: [{ type: 'ADULT GI', time: '10AM – 11AM' }],
  },
  {
    day: 'Sunday',
    classes: [],
    closed: true,
  },
];
