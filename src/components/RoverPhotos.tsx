import { useParams } from "react-router-dom";
import { useRoverPhotosBySolQuery } from "../queries/usePhotosQuery";
import { Photo } from "../interfaces/interfaces";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";

function RoverPhotos() {
  const { sol, roverName, camera } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 mt-5 space-y-4">
        {roverPhotos.map((photo: Photo) => (
          <div
            className="break-inside-avoid overflow-hidden rounded-lg"
            key={photo.id}
            onClick={() => setSelectedImage(photo.img_src)}
          >
            <img src={photo.img_src} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative max-w-4xl w-full p-5">
            <div className="w-full max-h-[90vh] rounded-lg">
              <RiCloseLargeLine
                className="absolute z-50 top-8 right-8 text-white sm:text-xl lg:text-2xl"
                onClick={() => setSelectedImage(null)}
              />
              <TransformWrapper>
                <TransformComponent>
                  <img src={selectedImage} alt="Full View" />
                </TransformComponent>
              </TransformWrapper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoverPhotos;
