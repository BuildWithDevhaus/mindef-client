import StatusTag from "../components/atoms/StatusTag";
import TableAction from "../components/molecules/TableAction";

export const deleteReasonHeaders = [
  "No:",
  "Reason",
  "Action:",
];
export const deleteReasonData = [
  [
    "1",
    <StatusTag content="Soiled beyond repair" variant="danger"></StatusTag>,
    <TableAction itemId={1} showEdit showTrash />,
  ],
  [
    "2",
    <StatusTag content="Lost during transit" variant="danger"></StatusTag>,
    <TableAction itemId={2} showEdit showTrash />,
  ],
  [
    "3",
    <StatusTag content="Size mismatch" variant="danger"></StatusTag>,
    <TableAction itemId={3} showEdit showTrash />,
  ],
  [
    "4",
    <StatusTag content="Fabric defect" variant="danger"></StatusTag>,
    <TableAction itemId={4} showEdit showTrash />,
  ],
  [
    "5",
    <StatusTag content="Customer returned" variant="danger"></StatusTag>,
    <TableAction itemId={5} showEdit showTrash />,
  ],
  [
    "6",
    <StatusTag content="Color faded" variant="danger"></StatusTag>,
    <TableAction itemId={6} showEdit showTrash />,
  ],
  [
    "7",
    <StatusTag content="Wrong item delivered" variant="danger"></StatusTag>,
    <TableAction itemId={7} showEdit showTrash />,
  ],
  [
    "8",
    <StatusTag content="Torn during usage" variant="danger"></StatusTag>,
    <TableAction itemId={8} showEdit showTrash />,
  ],
  [
    "9",
    <StatusTag content="Overstock clearance" variant="danger"></StatusTag>,
    <TableAction itemId={9} showEdit showTrash />,
  ],
  [
    "10",
    <StatusTag content="Outdated style" variant="danger"></StatusTag>,
    <TableAction itemId={10} showEdit showTrash />,
  ],
  [
    "11",
    <StatusTag content="Shrinkage after washing" variant="danger"></StatusTag>,
    <TableAction itemId={11} showEdit showTrash />,
  ],
  [
    "12",
    <StatusTag content="Unclaimed order" variant="danger"></StatusTag>,
    <TableAction itemId={12} showEdit showTrash />,
  ],
  [
    "13",
    <StatusTag content="Misaligned stitching" variant="danger"></StatusTag>,
    <TableAction itemId={13} showEdit showTrash />,
  ],
  [
    "14",
    <StatusTag content="Customer dissatisfaction" variant="danger"></StatusTag>,
    <TableAction itemId={14} showEdit showTrash />,
  ],
  [
    "15",
    <StatusTag content="End of promotion stock" variant="danger"></StatusTag>,
    <TableAction itemId={15} showEdit showTrash />,
  ],
  [
    "16",
    <StatusTag content="Incorrect labeling" variant="danger"></StatusTag>,
    <TableAction itemId={16} showEdit showTrash />,
  ],
  [
    "17",
    <StatusTag content="Unauthorized duplication" variant="danger"></StatusTag>,
    <TableAction itemId={17} showEdit showTrash />,
  ],
  [
    "18",
    <StatusTag content="Trial design prototype" variant="danger"></StatusTag>,
    <TableAction itemId={18} showEdit showTrash />,
  ],
  [
    "19",
    <StatusTag content="Warranty replacement" variant="danger"></StatusTag>,
    <TableAction itemId={19} showEdit showTrash />,
  ],
  [
    "20",
    <StatusTag content="Custom order cancellation" variant="danger"></StatusTag>,
    <TableAction itemId={20} showEdit showTrash />,
  ],
];
