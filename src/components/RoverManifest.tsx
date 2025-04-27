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
import { useState } from "react";

function RoverManifest(rover: Rover) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error } = useRoverManifestQuery(rover.name);

  if (error || !data) {
    return <div>Loading...</div>;
  }

  let roverImage;

  if (rover.name === "perseverance") {
    roverImage = <img src={new URL(per, import.meta.url).href} />;
  }
  if (rover.name === "spirit") {
    roverImage = <img src={new URL(spirit, import.meta.url).href} />;
  }
  if (rover.name === "opportunity") {
    roverImage = <img src={new URL(opp, import.meta.url).href} />;
  }
  if (rover.name === "curiosity") {
    roverImage = <img src={new URL(cur, import.meta.url).href} />;
  }

  let manifest: PhotoManifest = data;

  const allPhotos = manifest.photo_manifest.photos.sort(
    (a, b) => b.sol - a.sol
  );

  const photosPerPage = 25;

  const totalPages = Math.ceil(allPhotos.length / photosPerPage);

  const startIdx = (currentPage - 1) * photosPerPage;

  const currentPhotos = allPhotos.slice(startIdx, startIdx + photosPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="rounded-lg overflow-hidden">
        <div className="w-full h-full object-cover">{roverImage}</div>
      </div>
      <div className="overflow-x-auto flex flex-wrap">
        <table className="w-full p-2">
          <thead>
            <tr>
              <th className="p-2">Launch Date</th>
              <th className="p-2">Landing Date</th>
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
        <div className="flex justify-end">
          <div className="p-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded text-gray-400 ${
                currentPage !== 1 ? "hover:text-blue-400 cursor-pointer" : ""
              }`}
            >
              Prev
            </button>
          </div>
          <div className="p-1">
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded text-gray-400 ${
                currentPage !== totalPages
                  ? "hover:text-blue-400 cursor-pointer"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto p-2 border-collapse border border-gray-400 ...">
            <thead>
              <tr>
                <th className="p-2 border border-gray-700 ...">Sol</th>
                <th className="p-2 border border-gray-700 ...">Earth Date</th>
                <th className="p-2 border border-gray-700 ...">Cameras</th>
                <th className="p-2 border border-gray-700 ...">Total Photos</th>
              </tr>
            </thead>
            <tbody>
              {currentPhotos.map((photo: RoverManifestPhoto) => (
                <tr key={photo.sol}>
                  <td className="text-center p-2 border border-gray-700 ...">
                    <Link
                      to={photo.sol.toString()}
                      className="hover:text-blue-400"
                    >
                      {photo.sol}
                    </Link>
                  </td>
                  <td className="text-center p-2 border border-gray-700 ...">
                    <Link
                      to={photo.sol.toString()}
                      className="hover:text-blue-400"
                    >
                      {photo.earth_date}
                    </Link>
                  </td>
                  <td className="border p-2 border-gray-700 ...">
                    <div className="flex flex-wrap">
                      {photo.cameras.map((camera, index) => (
                        <Link
                          to={photo.sol.toString() + "/" + camera}
                          className="hover:text-blue-400"
                          key={index}
                        >
                          <div key={index} className="p-2">
                            {camera}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td className="text-center p-2 border border-gray-700 ...">
                    <Link
                      to={photo.sol.toString()}
                      className="hover:text-blue-400"
                    >
                      {photo.total_photos}
                    </Link>
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

export default RoverManifest;
