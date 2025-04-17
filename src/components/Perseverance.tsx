import { useState } from "react";
import { useRoverPhotosBySolQuery } from "../queries/usePhotosQuery";
import { Photo } from "../interfaces/interfaces";
import { PERSEVERENCE_CAMERAS } from "../types/cameraTypes";

function Perseverance() {
  const roverName = "perseverance";
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
          <option value={PERSEVERENCE_CAMERAS.EDL_DDCAM}>
            {PERSEVERENCE_CAMERAS.EDL_DDCAM}
          </option>
          <option value={PERSEVERENCE_CAMERAS.EDL_PUCAM1}>
            {PERSEVERENCE_CAMERAS.EDL_PUCAM1}
          </option>
          <option value={PERSEVERENCE_CAMERAS.EDL_PUCAM2}>
            {PERSEVERENCE_CAMERAS.EDL_PUCAM2}
          </option>
          <option value={PERSEVERENCE_CAMERAS.EDL_RUCAM}>
            {PERSEVERENCE_CAMERAS.EDL_RUCAM}
          </option>
          <option value={PERSEVERENCE_CAMERAS.FRONT_HAZCAM_LEFT_A}>
            {PERSEVERENCE_CAMERAS.FRONT_HAZCAM_LEFT_A}
          </option>
          <option value={PERSEVERENCE_CAMERAS.FRONT_HAZCAM_RIGHT_A}>
            {PERSEVERENCE_CAMERAS.FRONT_HAZCAM_RIGHT_A}
          </option>
          <option value={PERSEVERENCE_CAMERAS.MCZ_LEFT}>
            {PERSEVERENCE_CAMERAS.MCZ_LEFT}
          </option>
          <option value={PERSEVERENCE_CAMERAS.MCZ_RIGHT}>
            {PERSEVERENCE_CAMERAS.MCZ_RIGHT}
          </option>
          <option value={PERSEVERENCE_CAMERAS.NAVCAM_LEFT}>
            {PERSEVERENCE_CAMERAS.NAVCAM_LEFT}
          </option>
          <option value={PERSEVERENCE_CAMERAS.NAVCAM_RIGHT}>
            {PERSEVERENCE_CAMERAS.NAVCAM_RIGHT}
          </option>
          <option value={PERSEVERENCE_CAMERAS.REAR_HAZCAM_LEFT}>
            {PERSEVERENCE_CAMERAS.REAR_HAZCAM_LEFT}
          </option>
          <option value={PERSEVERENCE_CAMERAS.REAR_HAZCAM_RIGHT}>
            {PERSEVERENCE_CAMERAS.REAR_HAZCAM_RIGHT}
          </option>
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

export default Perseverance;
