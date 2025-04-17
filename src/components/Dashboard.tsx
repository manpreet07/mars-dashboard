import { APod, useAPodQuery } from "../queries/useAPodQuery";

function Dashboard() {
  let { data, error } = useAPodQuery();

  if (error || !data) {
    return <div>Loading...</div>;
  }

  const apod: APod = data;

  return (
    <div>
      <div className="rounded-lg overflow-hidden aspect-square">
        <img src={apod.url} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-wrap">
        <div>
          <div className="p-2 text-2xl">Image of the Day</div>
          <div className="p-2 text-xl">{apod.title}</div>
        </div>
        <div className="p-2 text-lg">{apod.explanation}</div>
        <div className="p-2 text-lg">{apod.date}</div>
      </div>
    </div>
  );
}

export default Dashboard;
