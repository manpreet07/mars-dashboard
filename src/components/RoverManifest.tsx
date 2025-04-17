import {
  PhotoManifest,
  Rover,
  RoverManifestPhoto,
} from "../interfaces/interfaces";
import { useRoverManifestQuery } from "../queries/useRoverManifestQuery";
import per from "../assets/per.jpg";
import spirit from "../assets/spirit.jpg";
import opp from "../assets/opp.jpg";
import cur from "../assets/cur.jpg";
import { Link } from "react-router-dom";

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

  const currentPhotos = manifest.photo_manifest.photos;

  return (
    <div>
      <div className="rounded-lg overflow-hidden">
        <div className="w-full h-full object-cover">{roverImage}</div>
      </div>
      {/* <div className="text-xl text-center">{manifest.photo_manifest.name}</div> */}
      <div className="flex flex-wrap">
        <table className="w-full p-2">
          <thead>
            <tr>
              <th className="p-2">Landing Date</th>
              <th className="p-2">Launch Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Maximum Sol</th>
              <th className="p-2">Total Photos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center p-2">
                {manifest.photo_manifest.launch_date}
              </td>
              <td className="text-center p-2">
                {manifest.photo_manifest.landing_date}
              </td>
              <td className="text-center p-2">
                {manifest.photo_manifest.status}
              </td>
              <td className="text-center p-2">
                {manifest.photo_manifest.max_sol}
              </td>
              <td className="text-center p-2">
                {manifest.photo_manifest.total_photos}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <table className="w-full p-2 border-collapse border border-gray-400 ...">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400 ...">Sol</th>
              <th className="p-2 border border-gray-400 ...">Earth Date</th>
              <th className="p-2 border border-gray-400 ...">Cameras</th>
              <th className="p-2 border border-gray-400 ...">Total Photos</th>
            </tr>
          </thead>
          <tbody>
            {currentPhotos.map((photo: RoverManifestPhoto) => (
              <tr key={photo.sol}>
                <td className="text-center p-2 border border-gray-400 ...">
                  <Link to="" className="hover:text-blue-400">
                    {photo.sol}
                  </Link>
                </td>
                <td className="text-center p-2 border border-gray-400 ...">
                  <Link to="" className="hover:text-blue-400">
                    {photo.earth_date}
                  </Link>
                </td>
                <td className="border p-2 border-gray-400 ...">
                  <div className="flex flex-wrap">
                    {photo.cameras.map((camera) => (
                      <Link to="" className="hover:text-blue-400">
                        <div key={camera} className="p-2">
                          {camera}
                        </div>
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="text-center p-2 border border-gray-400 ...">
                  <Link to="" className="hover:text-blue-400">
                    {photo.total_photos}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center space-x-2"></div>
      </div>
    </div>
  );
}

export default RoverManifest;
