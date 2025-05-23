import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "@/utils/apiFetch";
import { router } from "expo-router";

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
        if (response.user.onboarding == "true") {
          setUserToken(response.access_token);
          await SecureStore.setItemAsync("userToken", response.access_token);
        }
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const register = async (
    full_name: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await apiFetch("/auth/register", {
        method: "POST",
        body: {
          full_name,
          email,
          password,
        },
      });

      if (response?.user) {
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

  const addToken = async (token) => {
    setUserToken(token);
    await SecureStore.setItemAsync("userToken", token);
  };

  return (
    <AuthContext.Provider
      value={{ logIn, logOut, register, userToken, isLoading, addToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
