import { useState } from "react";
import { useRoverPhotosBySolQuery } from "../queries/usePhotosQuery";
import { Photo, Rover } from "../interfaces/interfaces";
import { CAMERA } from "../types/cameraTypes";
import RoverManifest from "./RoverManifest";

function Rovers(rover: Rover) {
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  const [sol, setSol] = useState<number>(10);

  if (!sol) {
    setSol(10);
  }

  const { data, error } = useRoverPhotosBySolQuery(rover.name, sol);

  if (error) {
    return <div>Loading...</div>;
  }

  let roverPhotos: Photo[] = data?.photos.length ? data?.photos : [];

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCamera(e.target.value);
  };

  const filteredPhotos = selectedCamera
    ? roverPhotos?.filter(
        (photo: Photo) => photo.camera.name === selectedCamera
      )
    : roverPhotos;

  return (
    <div>
      <RoverManifest name={rover.name} />
      <div className="flex">Rover Name: {rover.name}</div>
      <div className="flex mb-5">
        <div className="flex">Select a Camera</div>
        <select
          className="ml-10 bg-amber-50 text-black"
          name="camers"
          id="cameras"
          onChange={handleSelect}
        >
          <option value="">All Cameras</option>
          <option value={CAMERA.FHAZ}>{CAMERA.FHAZ}</option>
          <option value={CAMERA.RHAZ}>{CAMERA.RHAZ}</option>
          <option value={CAMERA.MAST}>{CAMERA.MAST}</option>
          <option value={CAMERA.CHEMCAM}>{CAMERA.CHEMCAM}</option>
          <option value={CAMERA.MAHLI}>{CAMERA.MAHLI}</option>
          <option value={CAMERA.MARDI}>{CAMERA.MARDI}</option>
          <option value={CAMERA.NAVCAM}>{CAMERA.NAVCAM}</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-4 h">
        {filteredPhotos.map((photo: Photo) => (
          <div className="flex" key={photo.id}>
            <img
              src={photo.img_src}
              className="flex w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rovers;
