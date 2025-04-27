import {
  ScrollArea,
  Box,
  Group,
  ActionIcon,
  TextInput,
  Text,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import useNotes from "../hooks/useNotes";
import { ListItem } from "./ListItem";
import { useState, useEffect } from "react";
import { Note } from "../../../entities/note/types";

export function Sidebar() {
  const { notes, createNote, selectNote, updateNote } = useNotes();
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote();
      setEditingNoteId(newNote.id);
      setEditedTitle(newNote.title);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const startEditing = async (note: Note) => {
    console.log("Selecting note:", note.id);
    await selectNote(note.id);
    console.log("Selected note set");
    setEditingNoteId(note.id);
    setEditedTitle(note.title);
  };

  const saveEdit = async () => {
    if (!editingNoteId) return;

    try {
      await updateNote(editingNoteId, { title: editedTitle });
      setEditingNoteId(null);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
  };

  const filteredNotes = localNotes.filter((note) => {
    const title = note.title?.toLowerCase() || "";
    const content = note.content?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return title.includes(query) || content.includes(query);
  });

  return (
    <Box h="100%" style={{ display: "flex", flexDirection: "column" }}>
      <Group p="md" style={{ borderBottom: "1px solid #ddd" }}>
        <TextInput
          placeholder="Поиск заметок"
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <ActionIcon
          variant="filled"
          color="blue"
          size="lg"
          onClick={handleCreateNote}
          aria-label="Создать заметку"
        >
          <IconPlus size={15} />
          Создать заметку
        </ActionIcon>
      </Group>

      <ScrollArea style={{ flex: 3 }}>
        {filteredNotes.length === 0 ? (
          <Text p="md" c="dimmed" ta="center">
            {notes.length === 0 ? "Нет заметок" : "Заметки не найдены"}
          </Text>
        ) : (
          <Box>
            {filteredNotes.map((note) => (
              <Box key={note.id} style={{ marginBottom: 4 }}>
                <ListItem
                  note={note}
                  onClick={() => {
                    selectNote(note.id);
                    window.dispatchEvent(
                      new CustomEvent("open-note-editor", {
                        detail: { noteId: note.id },
                      })
                    );
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </ScrollArea>
    </Box>
  );
}
