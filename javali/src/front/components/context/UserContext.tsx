"use client";

import { api } from "@/utils/api/api";
import { useLocalStorageState } from "@/utils/hooks/useLocalStorageState";
import { User } from "@/utils/types/user";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";

type UserContextType = {
  user?: User | null;
  userIdStorage?: number | null;
  userSocialIdStorage?: number | null;
  login: (userData: User) => void;
  logout: () => void;
};
const UserContext = createContext<UserContextType>({
  user: null,
  userIdStorage: null,
  userSocialIdStorage: null,
  login: (userData: User) => {},
  logout: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
};
export function UserProvider({ children }: UserProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userStorage, setUserStorage] = useLocalStorageState<string | null>(
    "user",
    null
  );
  const [userIdStorage, setUserIdStorage] = useLocalStorageState<number | null>(
    "userId",
    null
  );

  const login = (userData: User) => {
    setUser((prevUser) => ({ ...prevUser, ...userData }));
    setUserStorage(userData.socialId);
    setUserIdStorage(userData.id);
  };

  const logout = () => {
    setUser(null);
    setUserStorage(null);
    setUserIdStorage(null);
    router.push("/");
  };

  useEffect(() => {
    if (!user && userStorage) {
      api(`/api/user/${userStorage}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.ok) {
          setUser(await res.json());
        }
      });
    }
  }, [user, userStorage]);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        userIdStorage: Number(userIdStorage),
        userSocialIdStorage: Number(userStorage),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
