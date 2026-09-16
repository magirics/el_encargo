"use client";

import QueueStatus from "@/app/components/QueueStatus";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const { id } = params;
  const [guest, setGuest] = useState({ id: "", name: "", position: "" });

  const getGuest = async () => {
    const response = await fetch(`/api/guest?id=${id}`);
    if (!response.ok) {
      console.error("Failed to get guest");
      return;
    }

    const data = await response.json();
    console.log(data);
    if (data.status === "waiting") {
      setGuest(data);
    } else if (data.status === "called") {
      redirect("/welcome", "push");
    }
  };

  useEffect(() => {
    getGuest();

    const interval = setInterval(() => {
      getGuest();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
      <QueueStatus guest={guest} />
    </div>
  );
}
