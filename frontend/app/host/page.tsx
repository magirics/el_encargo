"use client";

import { useEffect, useState } from "react";
import HostQueue from "../components/HostQueue";

export default function Page() {
  const [queue, setQueue] = useState([]);

  const getQueue = async () => {
    const response = await fetch(`/api/queue`);
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
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
      <HostQueue queue={queue} setQueue={setQueue} />
    </div>
  );
}
