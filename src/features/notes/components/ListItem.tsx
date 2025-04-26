import { Card, Text } from "@mantine/core";
import { Note } from "../../../entities/note/types";

interface ListItemProps {
  note: Note;
  onClick: () => void;
}

export function ListItem({ note, onClick }: ListItemProps) {
  return (
    <Card
      mb="xs"
      onClick={onClick}
      style={{
        width: "200px",
        borderBottom: "1px solid black",
        cursor: "pointer",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "normal",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Text fw={500} lineClamp={1}>
        {note.title}
      </Text>
      <Text c="dimmed" size="xs" lineClamp={1} mt={4}>
        {note.content}
      </Text>
    </Card>
  );
}
