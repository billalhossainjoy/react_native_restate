import { useAppwrite } from "@/hooks/useAppwrite";
import auth from "@/lib/appwrite/auth";
import { createContext, useContext } from "react";
import { Models } from "react-native-appwrite";

interface IGlobalContext {
  isLoggedIn: boolean;
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  refetch: (newPrams: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useAppwrite({ fn: auth.getUser });

  const isLoggedIn = !!user;
  return (
    <GlobalContext.Provider value={{ isLoggedIn, user, loading, refetch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalcontext must be used within a GlobalProvider");
  }

  return context;
};
