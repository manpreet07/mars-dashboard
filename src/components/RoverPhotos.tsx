import { useParams } from "react-router-dom";
import { useRoverPhotosBySolQuery } from "../queries/usePhotosQuery";
import { Photo } from "../interfaces/interfaces";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function RoverPhotos() {
  const { sol, roverName, camera } = useParams();

  if (!roverName) {
    return <div>Rover name is missing in the url</div>;
  }

  if (!sol) {
    return <div>Sol is missing in the url</div>;
  }

  const { data, error } = useRoverPhotosBySolQuery(
    roverName,
    parseInt(sol),
    camera
  );

  if (error || !data) {
    return <div>Loading...</div>;
  }

  let roverPhotos: Photo[] = data.photos.length ? data.photos : [];

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {roverPhotos.map((photo: Photo) => (
          <div className="flex" key={photo.id}>
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={photo.img_src}
                  className="flex w-full h-full object-cover rounded-lg"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoverPhotos;
