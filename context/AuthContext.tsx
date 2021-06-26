import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@config/index";
import { User } from "@models/strapi-types";

type UserContextObj = {
  user?: User | null;
  error: any;
  register: (loginInfo: LoginInfo) => void;
  login: (loginInfo: LoginInfo) => void;
  logout: () => void;
  setMotto: (newMotto: string) => void;
};

export interface LoginInfo {
  username?: string | null;
  email: string;
  password: string;
}

export const AuthContext = createContext<UserContextObj>({
  user: null,
  error: null,
  register: () => {},
  login: () => {},
  logout: () => {},
  setMotto: () => {},
});

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //Register user
  const register = async (loginInfo: LoginInfo) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/courses");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Login user
  const login = async (loginInfo: LoginInfo) => {
    let identifier = loginInfo.email;
    let password = loginInfo.password;

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/courses");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  //Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/courses");
    } else {
      setUser(null);
    }
  };


  const updateUser = async () => {
    if (user) {
      let userForUpdate: User = user!;

      let motto = userForUpdate.motto
      let currentCourse = userForUpdate.currentCourse

      const res = await fetch(`${NEXT_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ motto, currentCourse }),
      });

      const data = await res.json();

      console.log(data);
      if (!res.ok) {
        setError(data.message);
        setError(null);
      }
    }
  };

  const setMotto = async (newMotto: string) => {
    if (user) {
      let userForUpdate: User = user!;
      userForUpdate.motto = newMotto;
      await updateUser();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        setMotto
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
