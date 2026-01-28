// src/components/TitleManager.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageTitles } from "@/constants/pageTitles";

const APP_NAME = "ZENMO";

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // dynamic route handle (services/:id, payment/:id)
    const matchedTitle =
      pageTitles[path] ||
      Object.entries(pageTitles).find(([key]) =>
        path.startsWith(key + "/")
      )?.[1];

    document.title = matchedTitle
      ? `${matchedTitle} | ${APP_NAME}`
      : APP_NAME;
  }, [location.pathname]);

  return null;
};

export default TitleManager;
