import { useState } from "react";
import { useRoverPhotosBySolQuery } from "../queries/usePhotosQuery";
import { Photo } from "../interfaces/interfaces";

function Curiosity() {
  const roverName = "curiosity";

  const [sol, setSol] = useState<number>(1000);

  if (!sol) {
    setSol(1000);
  }

  const { data, error } = useRoverPhotosBySolQuery(roverName, sol);

  if (error) {
    return <div>Loading...</div>;
  }

  let roverPhotos: Photo[] = data?.photos.length ? data?.photos : [];

  return (
    <div>
      <div className="flex">Curiosity</div>
      <label>Enter Sol:</label>
      <input
        type="number"
        id="sol"
        name="sol"
        className="bg-white rounded-sm"
      />
      <div>Photos</div>

      <div className="grid grid-cols-4 gap-4 h">
        {roverPhotos.map((photo: Photo) => (
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

export default Curiosity;
