"use client";

export default function HostQueue({ queue }) {
  const onCall = async (e, id) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/call_guest?id=${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-4">Cola de espera</h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Personas</th>
                <th className="text-right">Acción</th>
              </tr>
            </thead>

            <tbody>
              {queue.map((guest) => (
                <tr key={guest.id}>
                  <td className="font-medium">{guest.name}</td>

                  <td>{guest.people}</td>

                  <td className="text-right">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => onCall(e, guest.id)}
                    >
                      Llamar
                    </button>
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
