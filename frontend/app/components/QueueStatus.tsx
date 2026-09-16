import { redirect } from "next/navigation";

export default function QueueStatus({ guest }) {
  const onLeave = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/leave_queue?id=${guest.id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
    redirect(`/goodbye`);
  };

  return (
    <div className="card bg-base-100 w-full max-w-xs shadow-xl">
      <div className="card-body text-center">
        <h2 className="justify-center">Estás en el puesto</h2>

        <div className="my-6">
          <p className="card-title text-6xl font-bold text-primary">
            {(guest.queue_position || 0) + 1}
          </p>
        </div>

        <div className="stats stats-vertical shadow w-full">
          <div className="stat">
            <div className="stat-title">Tiempo estimado</div>
            <div className="stat-value text-lg text-white">
              ≈ {guest.wait_time} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
