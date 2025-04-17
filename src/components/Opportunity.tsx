import { useState } from "react";
import { useRoverPhotosBySolQuery } from "../queries/usePhotosQuery";
import { Photo } from "../interfaces/interfaces";
import { CAMERA } from "../types/cameraTypes";

function Opportunity() {
  const roverName = "opportunity";

  const [selectedCamera, setSelectedCamera] = useState<string>("");

  const [sol, setSol] = useState<number>(0);

  if (!sol) {
    setSol(0);
  }

  const { data, error } = useRoverPhotosBySolQuery(roverName, sol);

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
      <div className="flex">Rover Name: {roverName}</div>
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
          <option value={CAMERA.NAVCAM}>{CAMERA.NAVCAM}</option>
          <option value={CAMERA.PANCAM}>{CAMERA.PANCAM}</option>
          <option value={CAMERA.MINITES}>{CAMERA.MINITES}</option>
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

export default Opportunity;
