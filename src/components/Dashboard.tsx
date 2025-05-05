import { APod, useAPodQuery } from "../queries/useAPodQuery";

function Dashboard() {
  let { data, error } = useAPodQuery();

  if (error || !data) {
    return <div>Loading...</div>;
  }

  const apod: APod = data;

  return (
    <div>
      <div className="flex justify-center overflow-hidden">
        <img
          src={apod.url}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full h-full flex items-center justify-center">
          <div className="p-2 text-2xl">Image of the Day</div>
        </div>
        <div>
          <div className="p-2 text-xl">{apod.title}</div>
        </div>
        <div>
          <div className="p-2 text-lg">{apod.explanation}</div>
          <div className="p-2 text-lg">Date: {apod.date}</div>
        </div>
        <div className="">
          <div className="p-2 text-lg">Copyright: {apod.copyright}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
