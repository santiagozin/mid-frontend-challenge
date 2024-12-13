export interface Property {
    id: string;
    images: string[];
    title: string;
    price: string;
    description: string;
    area: string;
    isActive: boolean;
    status: string;
    type: string;
    updatedAt: string;
    location: [number, number];
    address: string;
    createdAt: string;
  }  
  

  export type FormData = {
    address: string;
    description: string;
    price: string;
    area: string;
    type: string;
    status: string;
  };