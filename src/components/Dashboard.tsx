import { APod, useAPodQuery } from "../queries/useAPodQuery";

function Dashboard() {
  let { data, error } = useAPodQuery();

  if (error || !data) {
    return <div>Loading...</div>;
  }

  const apod: APod = data;

  return (
    <div className="flex">
      <div className="inline">
        <div>
          <div>Image of the Day</div>
          <div>{apod.title}</div>
        </div>
        <img src={apod.url} />
        <div>{apod.explanation}</div>
        <div>{apod.date}</div>
      </div>
    </div>
  );
}

export default Dashboard;
