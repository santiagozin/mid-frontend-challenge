export interface Property {
  id: string;
  images: string[];
  title: string;
  price: number;  
  description: string;
  area: number;  
  isActive: boolean;
  status: string;
  type: string;
  updatedAt: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  createdAt: string;
}

  export type FormData = {
    address: string;
    description: string;
    price: string;
    area: string;
    type: string;
    status: 'sale' | 'rent';
  };