// Тур
export interface FullTour {
  id: string;
  name: string;
  country: string;
  date: string;
  price: number;
  urlimage: string | null;
  continent: string;
  countryDescription?: string;
  month: string;
  sity: string;
  typeID: string;
  seats: string;
  activity: boolean;
  description: string;
  urlvideo?: string | null;
  counter: number;
  days: TourDay[];
}

// День тура
export interface TourDay {
  id: string;
  dayNumber: number;
  date: string;
  description: string;
  photos: string[];
}