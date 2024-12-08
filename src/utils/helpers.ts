export type MessageData = { message: string; date: string };
export type GroupedData = Record<number, MessageData[]>;

export interface YearGridProps {
  year: string;
  messages: { message: string; date: string }[];
  onUpdateYearMessages: (
    year: string,
    updatedMessages: { message: string; date: string }[]
  ) => void;
  action: string;
}

export function groupDataByYear(inputData: MessageData[]): GroupedData {
  return inputData.reduce((acc: GroupedData, el) => {
    const year = new Date(el.date).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(el);
    return acc;
  }, {});
}

export const initialMessages: MessageData[] = [
  { message: "Q1 strategy alignment meeting", date: "2024-02-14" },
  { message: "Team lunch outing and bonding session", date: "2023-08-12" },
  { message: "Annual performance awards night", date: "2022-11-25" },
  { message: "Project planning for Q3 initiatives", date: "2024-06-09" },
  { message: "Monthly all-hands meeting", date: "2023-03-20" },
  { message: "Hackathon - Innovation challenge", date: "2022-07-18" },
  { message: "Holiday celebration planning", date: "2024-12-05" },
  { message: "Quarterly financial review", date: "2023-10-15" },
  { message: "New hire orientation program", date: "2022-05-22" },
  { message: "Product launch campaign kick-off", date: "2024-01-25" },
  { message: "Customer satisfaction survey results", date: "2023-09-08" },
  { message: "Spring cleanup and office renovation", date: "2022-03-14" },
];
