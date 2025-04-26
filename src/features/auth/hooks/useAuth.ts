import { useCallback } from "react";
import { useAppContext } from "../../../app/providers";

export default function useAuth() {
  const { dispatch } = useAppContext();

  const login = useCallback(
    async (email: string, password: string) => {
      console.log(password);
      try {
        dispatch({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));
        dispatch({ user: { email }, loading: false });
      } catch (error) {
        console.log(error);
        dispatch({ loading: false });
      }
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch({ user: null });
  }, [dispatch]);

  return { login, logout };
}
