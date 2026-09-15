"use client";

import { useEffect, useState } from "react";
import HostQueue from "../components/HostQueue";

export default function Page() {
  const [queue, setQueue] = useState([
    { id: 1, name: "Carlos", people: 2 },
    { id: 2, name: "María", people: 4 },
    { id: 3, name: "Juan", people: 3 },
  ]);

  const getQueue = async () => {
    const response = await fetch("http://localhost:8000/queue");
    if (!response.ok) {
      console.error("Failed to get queue");
      return;
    }

    const data = await response.json();
    setQueue(data);
  };

  useEffect(() => {
    getQueue();

    const interval = setInterval(() => {
      getQueue();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <HostQueue queue={queue} />
    </div>
  );
}
