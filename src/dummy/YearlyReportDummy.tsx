import StatusTag from "../components/atoms/StatusTag";

export const YearlyReportHeaders = [
    "S/N",
    "Belongs to:",
    "Gender:",
    "Uniform Type:",
    "Shirt Collar Length",
    "Pants Waist Length",
    "Shirt Location:",
    "Reason",
    "Date of Diposal:"
  ];
  export const YearlyReportData = [
    [
      "1",
      "Army",
      "Male",
      "No.1",
      "16cm",
      "30cm",
      "Row: 2, Rack: B1, No: 30",
      <StatusTag content="Too Old" variant="danger"></StatusTag>,
      "23rd November 2024",
    ],
    [
      "2",
      "Navy",
      "Female",
      "No.2",
      "14cm",
      "28cm",
      "Row: 3, Rack: C2, No: 15",
      <StatusTag content="Slightly Worn" variant="danger"></StatusTag>,
      "1st November 2024",
    ],
    [
      "3",
      "Air Force",
      "Male",
      "No.3",
      "17cm",
      "32cm",
      "Row: 1, Rack: A3, No: 5",
      <StatusTag content="Good Condition" variant="danger"></StatusTag>,
      "15th October 2024",
    ],
    // Add similar entries here up to 48 total entries
  ];
  
  for (let i = 4; i <= 48; i++) {
    const belongsToOptions = ["Army", "Navy", "Air Force"];
    const genderOptions = ["Male", "Female"];
    const uniformTypeOptions = ["No.1", "No.2", "No.3", "color party"];
    const statusOptions = [
      { content: "Dirty", variant: "danger" },
      { content: "Expired", variant: "danger" },
      { content: "Bleached", variant: "danger" },
    ];
  
    YearlyReportData.push([
      i.toString(),
      belongsToOptions[Math.floor(Math.random() * belongsToOptions.length)],
      genderOptions[Math.floor(Math.random() * genderOptions.length)],
      uniformTypeOptions[Math.floor(Math.random() * uniformTypeOptions.length)],
      `${14 + Math.floor(Math.random() * 5)}cm`,
      `${28 + Math.floor(Math.random() * 5)}cm`,
      `Row: ${1 + Math.floor(Math.random() * 5)}, Rack: ${
        String.fromCharCode(65 + Math.floor(Math.random() * 3))
      }${1 + Math.floor(Math.random() * 3)}, No: ${1 + Math.floor(Math.random() * 50)}`,
      <StatusTag
        content={
          statusOptions[Math.floor(Math.random() * statusOptions.length)].content
        }
        variant={"danger"}
      />,
      `${1 + Math.floor(Math.random() * 30)}th ${
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][
          Math.floor(Math.random() * 12)
        ]
      } 2024`,
    ]);
  }
  