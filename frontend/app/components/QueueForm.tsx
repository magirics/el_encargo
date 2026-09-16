"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { api } from "@/env";

export default function QueueForm() {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("1");

  const onJoin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${api}/join_queue?name=${name}&people=${people}`,
      {
        method: "POST",
      },
    );

    const data = await response.json();
    console.log(data);
    redirect(`/guest/${data.id}`, 'push');
  };

  return (
    <div className="card bg-base-100 w-full max-w-xs shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Restaurante</h2>
        <h3 className="card-subtitle">Lista de espera</h3>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="Tu nombre"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">¿Cuántos son?</span>
          </label>
          <input
            type="number"
            min="1"
            placeholder="Número de personas"
            className="input input-bordered w-full"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary mt-4 bg-white text-black"
          onClick={onJoin}
        >
          Unirme a la cola
        </button>
      </div>
    </div>
  );
}
