import { useCallback, useEffect } from "react";
import localforage from "localforage";
import { useAppContext } from "../../../app/providers";
import { Note } from "../../../entities/note/types";
import { showNotification } from "@mantine/notifications";

type NoteAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_NOTES"; payload: Note[] }
  | {
      type: "SET_NOTES_AND_SELECT";
      payload: { notes: Note[]; selectedNoteId: string };
    }
  | { type: "SELECT_NOTE"; selectedNoteId: string; payload: string | null }
  | {
      type: "DELETE_NOTE";
      payload: { notes: Note[]; selectedNoteId: string | null };
    }
  | {
      type: "RESTORE_STATE";
      payload: { notes: Note[]; selectedNoteId: string | null };
    };

const notesStore = localforage.createInstance({
  name: "macos-notes",
  storeName: "notes",
});

interface UseNotesReturn {
  notes: Note[];
  selectedNoteId: string | null;
  createNote: () => Promise<Note>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<boolean>;
  selectNote: (id: string) => void;
}

export default function useNotes(): UseNotesReturn {
  const { state, dispatch } = useAppContext();

  const loadNotes = useCallback(async (): Promise<void> => {
    try {
      console.log("Loading notes...");
      dispatch({ loading: true });
      const notes: Note[] = (await notesStore.getItem<Note[]>("notes")) || [];
      console.log("Loaded notes:", notes);
      dispatch({ notes, loading: false });
    } catch (error) {
      console.error("Failed to load notes:", error);
      dispatch({ loading: false });
      showNotification({
        title: "Error",
        message: "Failed to load notes",
        color: "red",
      });
    }
  }, [dispatch]);

  const saveNotes = useCallback(async (notes: Note[]): Promise<void> => {
    try {
      await notesStore.setItem<Note[]>("notes", notes);
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to save notes",
        color: "red",
      });
    }
  }, []);

  const createNote = useCallback(async (): Promise<Note> => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Заметка",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Создана заметка (до сохранения):", newNote);

    const updatedNotes = [...state.notes, newNote];
    await saveNotes(updatedNotes);

    console.log("Стейт после создания:", {
      prevNotes: state.notes,
      updatedNotes,
    });

    dispatch({
      notes: updatedNotes,
      selectedNoteId: newNote.id,
    });

    return newNote;
  }, [state.notes, dispatch, saveNotes]);

  const updateNote = useCallback(
    async (id: string, updates: Partial<Note>): Promise<void> => {
      const updatedNotes = state.notes.map((note: Note) =>
        note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
      );
      dispatch({ notes: updatedNotes });
      await saveNotes(updatedNotes);
    },
    [state.notes, dispatch, saveNotes]
  );

  const deleteNote = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const updatedNotes = state.notes.filter((note: Note) => note.id !== id);
        await notesStore.setItem("notes", updatedNotes);
        dispatch({
          type: "DELETE_NOTE",
          payload: {
            notes: updatedNotes,
            selectedNoteId: null,
          },
        });

        await notesStore.setItem("notes", updatedNotes);

        showNotification({
          title: "Успех",
          message: "Заметка удалена",
          color: "green",
        });
        return true;
      } catch (error) {
        console.error("Ошибка при удалении:", error);
        showNotification({
          title: "Ошибка",
          message: "Не удалось удалить заметку",
          color: "red",
        });
        return false;
      }
    },
    [state.notes, dispatch]
  );

  const selectNote = useCallback(
    (id: string | null) => {
      dispatch({
        type: "SELECT_NOTE",
        payload: id,
      });

      if (id) {
        notesStore.getItem<Note[]>("notes").then((notes) => {
          const note = notes?.find((n) => n.id === id);
          if (note) {
            dispatch({
              type: "SET_NOTES",
              payload: notes || [],
            });
          }
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes: state.notes,
    selectedNoteId: state.selectedNoteId,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
  };
}
