import { Grid } from "@mantine/core";
import { Sidebar } from "../../features/notes/components/Sidebar";
import Workspace from "../../features/notes/components/Workspace";

export function NotesPage() {
  return (
    <Grid style={{ height: "100vh", margin: 0 }}>
      <Grid.Col span={3} style={{ borderRight: "1px solid #ddd", padding: 0 }}>
        <Sidebar />
      </Grid.Col>
      <Grid.Col span={9} style={{ padding: 0 }}>
        <Workspace />
      </Grid.Col>
    </Grid>
  );
}
