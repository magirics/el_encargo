"use client";

import QueueStatus from "@/app/components/QueueStatus";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [guest, setGuest] = useState({ id: "", name: "", position: "" });

  const getGuest = async () => {
    const response = await fetch(`http://localhost:8000/guest?id=${id}`);
    if (!response.ok) {
      console.error("Failed to get guest");
      return;
    }

    const data = await response.json();
    console.log(data)
    setGuest(data);
  };

  useEffect(() => {
    getGuest();

    const interval = setInterval(() => {
      getGuest();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <QueueStatus guest={guest} />
    </div>
  );
}
