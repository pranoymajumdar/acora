import type { ReviewType } from "./reviews";

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  reviews: ReviewType[];
  availabilityStatus: string;
  rating: number;
}
