import useNotes from "../hooks/useNotes";
import { MarkdownEditor } from "./MarkdownEditor";
import { Box, Group, Button, Text, Modal, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";

export default function Workspace() {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const {
    notes,
    selectedNoteId,
    updateNote,
    deleteNote,
    isLoading,
    selectNote,
  } = useNotes();

  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("SelectedNoteId in Workspace:", selectedNoteId);
    console.log("All notes:", notes);
    if (selectedNoteId) {
      const noteExists = notes.some((n) => n.id === selectedNoteId);
      console.log("Note exists:", noteExists);
      setEditModalOpened(noteExists);
      if (noteExists) {
        setEditingTitle(
          notes.find((n) => n.id === selectedNoteId)?.title || ""
        );
      }
    } else {
      setEditModalOpened(false);
    }
  }, [selectedNoteId, notes]);

  const handleDelete = async () => {
    if (!selectedNote) return;
    setIsDeleting(true);
    try {
      const success = await deleteNote(selectedNote.id);
      if (success) {
        setDeleteModalOpened(false);
        setEditModalOpened(false);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveTitle();
    }
  };

  const saveTitle = () => {
    if (selectedNote && editingTitle.trim() !== selectedNote.title) {
      updateNote(selectedNote.id, { title: editingTitle.trim() });
    }
    if (titleInputRef.current) {
      titleInputRef.current.blur();
    }
  };

  const handleSave = () => {
    saveTitle();
    setEditModalOpened(false);
    setDeleteModalOpened(false);
  };

  return (
    <>
      <Modal
        opened={editModalOpened && !!selectedNote}
        onClose={() => {
          selectNote(null);
          setEditModalOpened(false);
          setEditingTitle("");
        }}
        withCloseButton={!deleteModalOpened}
        closeOnClickOutside={!deleteModalOpened}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 600px)",
          backgroundColor: "var(--mantine-color-body)",
          padding: "16px",
          zIndex: 1000,
        }}
        title={
          <TextInput
            ref={titleInputRef}
            value={editingTitle}
            onChange={handleTitleChange}
            onBlur={saveTitle}
            onKeyDown={handleTitleKeyDown}
            placeholder="Название заметки"
            variant="unstyled"
            styles={{
              input: {
                fontSize: "1.2rem",
                fontWeight: 600,
                padding: 0,
              },
            }}
            autoFocus
          />
        }
        centered
        size="lg"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        closeOnClickOutside={!deleteModalOpened}
        withCloseButton={!deleteModalOpened}
      >
        {!deleteModalOpened ? (
          <>
            <Box mih={300}>
              {selectedNote && (
                <MarkdownEditor
                  note={selectedNote}
                  onUpdate={(content) =>
                    updateNote(selectedNote.id, { content })
                  }
                />
              )}
            </Box>
            <Group justify="space-between" mt="sm">
              <Button
                leftSection={<IconTrash size={14} />}
                variant="outline"
                color="red"
                onClick={() => setDeleteModalOpened(true)}
              >
                Удалить
              </Button>
              <Button onClick={handleSave}>Готово</Button>
            </Group>
          </>
        ) : (
          <Box p="md">
            <Text size="sm" mb="md" fw={500}>
              Удалить заметку?
            </Text>
            <Text size="sm" mb="xl">
              Эта заметка будет удалена безвозвратно
            </Text>
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => setDeleteModalOpened(false)}
                disabled={isLoading}
              >
                Отмена
              </Button>
              <Button color="red" onClick={handleDelete} loading={isLoading}>
                Удалить
              </Button>
            </Group>
          </Box>
        )}
      </Modal>
    </>
  );
}
