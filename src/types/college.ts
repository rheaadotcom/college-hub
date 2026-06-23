export interface College {
  id: number;
  name: string;
  shortName: string;
  location: string;
  type: string;
  rating: number;
  fees: string;
  established: number;
  overview: string;
  placements: {
    averagePackage: string;
    highestPackage: string;
    placementRate: string;
    topRecruiters: string[];
  };
  courses: {
    name: string;
    duration: string;
    fees: string;
  }[];
  reviews: {
    author: string;
    rating: number;
    comment: string;
  }[];
  tags: string[];
  nirf: number;
  examsAccepted: string[];
}
