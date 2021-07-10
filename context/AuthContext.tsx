import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@config/index";
import { User } from "@models/strapi-types";
import { Lesson } from "../models/strapi-types";

type UserContextObj = {
  //user is null when NOT logged in
  user?: User | null;
  error: any;
  register: (userCredentials: UserCredentials) => void;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
  setCurrentLesson: (currentLesson: Lesson) => void;
  setCurrentLessonCompleted: () => void;
  setCurrentPageSlug: (currentPageSlug: string) => void;
};

export interface UserCredentials {
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
  setCurrentLesson: () => {},
  setCurrentLessonCompleted: () => {},
  setCurrentPageSlug: () => {},
});

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //Register user
  const register = async (loginInfo: UserCredentials) => {
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
  const login = async (userCredentials: UserCredentials) => {
    let identifier = userCredentials.email;
    let password = userCredentials.password;

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
      //      router.push("/courses");
    } else {
      setUser(null);
    }
  };

  const updateUser = async () => {
    if (user) {
      //typescript complains if we try to use the user object because it is possible that it can be null
      //therefore we have to create a variable that contains the user and we are promising here
      //that the user is NEVER null. That is guaranteed by the if statement above (  --- if (user) ---  )
      let userForUpdate: User = user!;

      let currentLesson = userForUpdate.currentLesson;
      let lessonsCompleted = userForUpdate.lessonsCompleted;
      let currentPageSlug = userForUpdate.currentPageSlug;

      console.log("updateUser: lessonsCompleted");
      console.log(lessonsCompleted);

      const res = await fetch(`${NEXT_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentLesson, lessonsCompleted, currentPageSlug }),
      });

      const data = await res.json();

      console.log(data);
      if (!res.ok) {
        setError(data.message);
        setError(null);
      }
    }
  };

  const setCurrentLesson = async (currentLesson: Lesson) => {
    if (user) {
      let userForUpdate: User = user!;

      //update the user IF the currentLesson is actually changing
      if (currentLesson.key !== userForUpdate.currentLesson.key) {
        userForUpdate.currentLesson = currentLesson;
        await updateUser();
      }
    }
  };

  const setCurrentPageSlug = async (currentPageSlug: string) => {
    if (user) {
      let userForUpdate: User = user!;

      userForUpdate.currentPageSlug = currentPageSlug;
      await updateUser();
    }
  };

  const setCurrentLessonCompleted = async () => {
    if (user) {
      let userForUpdate: User = user!;
      userForUpdate.currentPageSlug = "";
      //if the current lesson does not exist already
      //in the array of completedLessons -> currentLesson.key is added to the array
      //then -> the user is updated
      if (userForUpdate.lessonsCompleted.indexOf(userForUpdate.currentLesson.key) === -1) {
        userForUpdate.lessonsCompleted.push(userForUpdate.currentLesson.key);
      }
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
        setCurrentLesson,
        setCurrentLessonCompleted,
        setCurrentPageSlug,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
