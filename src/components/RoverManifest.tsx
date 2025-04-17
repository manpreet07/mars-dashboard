import {
  PhotoManifest,
  Rover,
  RoverManifestPhoto,
} from "../interfaces/interfaces";
import { useRoverManifestQuery } from "../queries/useRoverManifestQuery";
import per from "../assets/per.jpg";
import spirit from "../assets/spirit.jpg";
import opp from "../assets/opp.jpg";
import cur from "../assets/cur.jpeg";

function RoverManifest(rover: Rover) {
  const { data, error } = useRoverManifestQuery(rover.name);

  if (error || !data) {
    return <div>Loading...</div>;
  }

  let roverImage;

  if (rover.name === "perseverance") {
    roverImage = <img src={per} />;
  }
  if (rover.name === "spirit") {
    roverImage = <img src={spirit} />;
  }
  if (rover.name === "opportunity") {
    roverImage = <img src={opp} />;
  }
  if (rover.name === "curiosity") {
    roverImage = <img src={cur} />;
  }

  let manifest: PhotoManifest = data;

  return (
    <div>
      <div className="flex">{roverImage}</div>
      <div className="flex">Rover Name: {manifest.photo_manifest.name}</div>
      <div className="flex">
        Landing Date: {manifest.photo_manifest.landing_date}
      </div>
      <div className="flex">
        Launch Date: {manifest.photo_manifest.launch_date}
      </div>
      <div className="flex">Satus: {manifest.photo_manifest.status}</div>
      <div className="flex">Maximum Sol: {manifest.photo_manifest.max_sol}</div>
      <div className="flex">
        Maximum Date: {manifest.photo_manifest.max_date}
      </div>
      <div className="flex">
        Total Photos: {manifest.photo_manifest.total_photos}
      </div>
      <div className="flex mb-5">
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="p-2 border-collapse border border-gray-400">
                Sol
              </th>
              <th className="p-2 border-collapse border border-gray-400">
                Earth Date
              </th>
              <th className="p-2 border-collapse border border-gray-400">
                Total Photos
              </th>
              <th className="p-2 border-collapse border border-gray-400">
                Cameras
              </th>
            </tr>
          </thead>
          <tbody>
            {manifest.photo_manifest.photos.map((photo: RoverManifestPhoto) => (
              <tr key={photo.sol}>
                <td className="p-2 border-collapse border border-gray-400">
                  {photo.sol}
                </td>
                <td className="p-2 border-collapse border border-gray-400">
                  {photo.earth_date}
                </td>
                <td className="p-2 border-collapse border border-gray-400">
                  {photo.total_photos}
                </td>
                <td className="p-2 border-collapse border border-gray-400">
                  {photo.cameras.map((camera) => (
                    <div key={camera}>{camera}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoverManifest;
