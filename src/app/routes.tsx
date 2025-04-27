import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./providers";
import { LoadingOverlay } from "@mantine/core";

const LoginPage = lazy(() =>
  import("../pages/LoginPage/loginPage").then(
    (m): { default: React.ComponentType } => ({ default: m.LoginPage })
  )
);
const NotesPage = lazy(() =>
  import("../pages/NotePage/NotePage").then(
    (m): { default: React.ComponentType } => ({ default: m.NotesPage })
  )
);

export default function AppRoutes() {
  const { state } = useAppContext();

  return (
    <Suspense fallback={<LoadingOverlay visible />}>
      <Routes>
        <Route
          path="/"
          element={
            state.user ? <Navigate to="/notes" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={state.user ? <Navigate to="/notes" /> : <LoginPage />}
        />
        <Route
          path="/notes"
          element={state.user ? <NotesPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}
