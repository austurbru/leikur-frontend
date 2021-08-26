import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@config/index";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    //check to see if the cookie exists
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    //put the token into a variable and send it to strapi
    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else if (req.method === "PUT") {
    // If the method is PUT -> Update of the user:

    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    //put the token into a variable and send it to strapi
    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      // Update User:

      const { currentLesson, lessonsCompleted, currentPageSlug, currentLessonProgress } = req.body;

      const strapiRes = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentLesson,
          lessonsCompleted,
          currentPageSlug,
          currentLessonProgress,
        }),
      });

      if (strapiRes.ok) {
        res.status(200).json({ message: "User has been updated" });
      } else {
        res.status(403).json({ message: "User forbidden" });
      }
    } else {
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }
};
