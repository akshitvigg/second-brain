import { useEffect, useState } from "react";
import axios from "axios";

export function useContent() {
  const [content, setContent] = useState([]);

  function refresh() {
    axios
      .get("https://second-brain-backend-4.onrender.com/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response: any) => {
        setContent(response.data.content);
      });
  }

  useEffect(() => {
    refresh();
    let interval = setInterval(() => {
      refresh();
    }, 4 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return { content, refresh };
}
