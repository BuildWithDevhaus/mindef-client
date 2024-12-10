import StatusTag from "../components/atoms/StatusTag";

export const YearlyReportHeaders = [
  "S/N",
  "Uniform Type:",
  "Top/Bottom",
  "size",
  "Shirt Location:",
  "Gender:",
  "Reason",
  "Date of Disposal:",
];

export const YearlyReportData = [
  [
    "1",
    "No. 1",
    "Top",
    "30cm",
    "Row: 2, Rack: B1, No: 30",
    "Male",
    <StatusTag content="Too Old" variant="danger" />,
    "2024-11-23",
  ],
  [
    "2",
    "No. 2",
    "Bottom",
    "28cm",
    "Row: 3, Rack: C2, No: 15",
    "Female",
    <StatusTag content="Slightly Worn" variant="danger" />,
    "2024-11-01",
  ],
  [
    "3",
    "No. 3",
    "Top",
    "32cm",
    "Row: 1, Rack: A3, No: 5",
    "Male",
    <StatusTag content="Good Condition" variant="danger" />,
    "2024-10-15",
  ],
];

for (let i = 4; i <= 48; i++) {
  const uniformTypeOptions = ["No. 1", "No. 2", "No. 3", "Color Party"];
  const topBottomOptions = ["Top", "Bottom"];
  const genderOptions = ["Male", "Female"];
  const statusOptions = [
    { content: "Dirty", variant: "danger" },
    { content: "Expired", variant: "danger" },
    { content: "Bleached", variant: "danger" },
  ];

  // Generate random day, month, and year for date
  const day = String(1 + Math.floor(Math.random() * 30)).padStart(2, "0");
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
  const year = "2024";

  YearlyReportData.push([
    i.toString(),
    uniformTypeOptions[Math.floor(Math.random() * uniformTypeOptions.length)],
    topBottomOptions[Math.floor(Math.random() * topBottomOptions.length)],
    `${28 + Math.floor(Math.random() * 5)}cm`,
    `Row: ${1 + Math.floor(Math.random() * 5)}, Rack: ${
      String.fromCharCode(65 + Math.floor(Math.random() * 3))
    }${1 + Math.floor(Math.random() * 3)}, No: ${1 + Math.floor(Math.random() * 50)}`,
    genderOptions[Math.floor(Math.random() * genderOptions.length)],
    <StatusTag
      content={
        statusOptions[Math.floor(Math.random() * statusOptions.length)].content
      }
      variant={"danger"}
    />,
    `${year}-${month}-${day}`,
  ]);
}
