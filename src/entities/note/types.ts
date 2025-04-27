export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AppState = {
  user: string | null;
  notes: Note[];
  loading: boolean;
  selectedNoteId: string | null;
};

export type AppAction =
  | { type: "SELECT_NOTE"; payload: string | null }
  | { type: "SET_NOTES"; payload: Note[] }
  | {
      type: "DELETE_NOTE";
      payload: { notes: Note[]; selectedNoteId: string | null };
    }
  | { type?: string; key: number };

  export type AppContextType = {
    state: string;
    dispatch: React.Dispatch<string>;
  };
