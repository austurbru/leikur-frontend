/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@config/index";
import { User } from "@models/strapi-types";
import { Lesson } from "../models/strapi-types";

type UserContextObj = {
  // user is null when NOT logged in
  user?: User | null;
  error: any;
  register: (userCredentials: UserCredentials) => void;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
  setCurrentLesson: (currentLesson: Lesson) => void;
  setCurrentLessonCompleted: () => void;
  setCurrentLessonState: (currentPageSlug: string, progress: number) => void;
  // setCurrentPageSlug: (currentPageSlug: string) => void;
  // setCurrentLessonProgress: (progress: number) => void;
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
  setCurrentLessonState: () => {},
  //setCurrentLessonProgress: () => {},
});

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Register user
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
      //const loggedInUser: User = data.user;
      setUser(data.user);

      /*       if (loggedInUser?.currentPageSlug.trim().length > 0) {
        router.push(`/${loggedInUser.currentPageSlug}`);
        return;
      }

      if (loggedInUser?.currentLesson) {
        const slug = `/courses/${loggedInUser.currentLesson.key.charAt(0)}`;
        router.push(slug);
        return;
      }
 */
      router.push("/courses");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Login user
  const login = async (userCredentials: UserCredentials) => {
    const identifier = userCredentials.email;
    const { password } = userCredentials;

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

      const loggedInUser: User = data.user;

      if (loggedInUser?.currentPageSlug?.trim()?.length > 0) {
        router.push(`/${loggedInUser.currentPageSlug}`);
        return;
      }

      if (loggedInUser?.currentLesson) {
        const slug = `/courses/${loggedInUser.currentLesson.key.charAt(0)}`;
        router.push(slug);
        return;
      }

      router.push("/courses");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user is logged in
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
      // Typescript complains if we try to use the user object because it is possible that it can be null
      // therefore we have to create a variable that contains the user and we are promising here
      // that the user is NEVER null. That is guaranteed by the if statement above (  --- if (user) ---  )
      const userForUpdate: User = user!;

      const { currentLesson } = userForUpdate;
      const { currentPageSlug } = userForUpdate;
      const { currentLessonProgress } = userForUpdate;

      // For some reason we seem to be getting an undefined element into the array occationally.
      // This filtering is to prevent problems that this causes.
      const filteredLessons = userForUpdate.lessonsCompleted?.filter((element) => {
        return typeof element === "string";
      });

      const lessonsCompleted = filteredLessons;

      //we call the API, our Own API
      const res = await fetch(`${NEXT_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        //Send the body to the NEXT_URL
        body: JSON.stringify({ currentLesson, lessonsCompleted, currentPageSlug, currentLessonProgress }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setError(null);
      }
    }
  };

  const setCurrentLesson = async (currentLesson: Lesson) => {
    if (user) {
      const userForUpdate: User = user!;

      // update the user IF the currentLesson is actually changing
      if (currentLesson.key !== userForUpdate.currentLesson?.key) {
        userForUpdate.currentLesson = currentLesson;
        await updateUser();
      }
    }
  };

  const setCurrentLessonState = async (currentPageSlug: string, progress: number) => {
    if (user) {
      const userForUpdate: User = user!;
      userForUpdate.currentPageSlug = currentPageSlug;
      userForUpdate.currentLessonProgress = progress;
      await updateUser();
    }
  };

  /*   const setCurrentPageSlug = async (currentPageSlug: string) => {
    if (user) {
      const userForUpdate: User = user!;
      userForUpdate.currentPageSlug = currentPageSlug;
    }
  };

  const setCurrentLessonProgress = async (progress: number) => {
    if (user) {
      const userForUpdate: User = user!;

      userForUpdate.currentLessonProgress = progress;
      await updateUser();
    }
  }; */

  const setCurrentLessonCompleted = async () => {
    if (user) {
      const userForUpdate: User = user!;
      userForUpdate.currentPageSlug = "";

      // if the current lesson does not exist already
      // in the array of completedLessons -> currentLesson.key is added to the array
      // then -> the user is updated
      if (userForUpdate.lessonsCompleted.indexOf(userForUpdate.currentLesson.key) === -1) {
        if (userForUpdate.currentLesson.key !== null) {
          userForUpdate.lessonsCompleted.push(userForUpdate.currentLesson.key);
        }
      }

      // Making sure that no garbage gets into the array.
      userForUpdate.lessonsCompleted = userForUpdate.lessonsCompleted.filter((x) => {
        return x !== undefined && x !== null;
      });

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
        setCurrentLessonState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
