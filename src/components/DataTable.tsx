import { Table } from "@mantine/core";
import { CSSProperties } from "react";

// Define the type for the props
type Props = {
  data: { year: number; maxCrop: string; minCrop: string }[]; // Expected data format
};

const DataTable: React.FC<Props> = ({ data }) => {
  // Map through the data to create table rows
  const rows = data.map((entry) => (
    <Table.Tr key={entry.year}>
      <Table.Td>{entry.year}</Table.Td>
      <Table.Td>{entry.maxCrop}</Table.Td>

      <Table.Td>{entry.minCrop}</Table.Td>
    </Table.Tr>
  ));

  // Define custom styles for the table
  const tableStyle: CSSProperties = {
    width: "92%",
    borderCollapse: "collapse", // Collapse borders to appear as a single border
    margin: "0 auto",
  };

  const thTdStyle: CSSProperties = {
    border: "1px solid gray",
    padding: "8px",
  };

  return (
    <Table style={tableStyle}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={thTdStyle}>Year</Table.Th>

          <Table.Th style={thTdStyle}>
            Crop with Maximum Production in that Year
          </Table.Th>

          <Table.Th style={thTdStyle}>
            Crop with Minimum Production in that Year
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default DataTable;
