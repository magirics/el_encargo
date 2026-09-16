"use client";

export default function HostQueue({ queue, setQueue }) {
  const onCall = async (e, id) => {
    e.preventDefault();

    const response = await fetch(`/api/call_guest?id=${id}`, {
      method: "PATCH",
    });

    const data = await response.json();
    console.log(data);

    let newQueue = structuredClone(queue);
    for (let guest of newQueue) {
      if (guest.id == id) {
        guest.status = "called";
      }
    }
    setQueue(newQueue);
  };

  const onSit = async (e, id) => {
    e.preventDefault();

    const response = await fetch(`/api/sit_guest?id=${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);

    let newQueue = structuredClone(queue);
    setQueue(newQueue.filter((guest) => guest.id !== id));
  };

  return (
    <div className="card bg-base-100 w-lg shadow-xl">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title mb-4">Restaurante</h2>
          <h3 className="card-subtitle mb-4">{queue.length} en cola</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <tbody>
              {queue.map((guest, i) => (
                <tr key={guest.id}>
                  <td className="text-white"># {i + 1}</td>
                  <td className="w-30">{guest.name}</td>
                  <td>{guest.people} pers.</td>
                  <td>{11 + i * 2} min</td>
                  <td className="flex flex-row-reverse">
                    {guest.status === "waiting" ? (
                      <button
                        className="btn btn-primary my-1 !w-16 bg-white text-black"
                        onClick={(e) => onCall(e, guest.id)}
                      >
                        Llamar
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary my-1 opacity-50 !w-16 bg-white text-black"
                        onClick={(e) => onSit(e, guest.id)}
                      >
                        Sentar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
