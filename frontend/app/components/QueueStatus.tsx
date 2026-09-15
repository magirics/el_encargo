import { redirect } from "next/navigation";

export default function QueueStatus({ guest }) {
  const onLeave = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/leave_queue?id=${guest.id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
    redirect(`/goodbye`);
  };

  return (
    <div className="card bg-base-100 w-full max-w-md shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title justify-center">Estás en la cola 🎉</h2>

        <div className="my-6">
          <p className="text-sm text-base-content/60">Tu puesto</p>

          <p className="text-6xl font-bold text-primary">#{guest.position + 1}</p>
        </div>

        <div className="stats stats-vertical shadow w-full">
          <div className="stat">
            <div className="stat-title">Tiempo de espera</div>
            <div className="stat-value text-2xl">25 min</div>
          </div>
        </div>

        <button onClick={onLeave} className="btn btn-error btn-outline mt-6">Ya no voy</button>
      </div>
    </div>
  );
}
