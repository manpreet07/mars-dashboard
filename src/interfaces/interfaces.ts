export interface RoverPhotos {
  photos: Photo[];
  latest_photos: Photo[];
}

export interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

export interface Rover {
  id?: number;
  name: string;
  landing_date?: string;
  launch_date?: string;
  status?: string;
}

export interface PhotoManifest {
  photo_manifest: Manifest;
}
export interface Manifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  photos: RoverManifestPhoto[];
}

export interface RoverManifestPhoto {
  sol: number;
  cameras: string[];
  total_photos: number;
  earth_date: string;
}
