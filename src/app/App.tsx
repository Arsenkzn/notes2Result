import { useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers";
import AppRoutes from "./routes";
import { Note, AppState, AppAction } from "../entities/note/types";

const initialState: AppState = {
  user: null,
  notes: [],
  loading: false,
  selectedNoteId: null,
};

function App() {
  const [state, dispatch] = useReducer(
    (prev: AppState, action: AppAction): AppState => {
      switch (action.type) {
        case "SELECT_NOTE":
          return {
            ...prev,
            selectedNoteId: action.payload as string | null,
            loading: !!action.payload,
          };

        case "SET_NOTES":
          return {
            ...prev,
            notes: action.payload as Note[],
            loading: false,
          };

        case "DELETE_NOTE":
          return {
            ...prev,
            notes: action.payload.notes as Note[],
            selectedNoteId: action.payload.selectedNoteId as string | null,
          };

        default:
          return { ...prev, ...action };
      }
    },
    initialState
  );

  return (
    <BrowserRouter>
      <AppProviders state={state} dispatch={dispatch}>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
