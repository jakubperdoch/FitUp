import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "@/utils/apiFetch";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        setUserToken(token ? token : null);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const logIn = async (email: string, password: string) => {
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      if (response.access_token) {
        setUserToken(response.access_token);
        await SecureStore.setItemAsync("userToken", response.access_token);
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const register = async (
    fullName: string,
    birthDate: string,
    email: string,
    password: string,
    weight: number,
    height: number,
    gender: string,
    goal: string,
  ) => {
    try {
      const response = await apiFetch("/auth/register", {
        method: "POST",
        body: {
          full_name: fullName,
          birth_date: birthDate,
          email,
          password,
          weight,
          height,
          gender,
          goal,
        },
      });

      if (response?.user) {
        await logIn(email, password);
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logOut = async () => {
    try {
      await apiFetch("/auth/logout", {
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setUserToken(null);
      await SecureStore.deleteItemAsync("userToken");
      return Promise.resolve();
    }
  };

  return (
    <AuthContext.Provider
      value={{ logIn, logOut, register, userToken, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
