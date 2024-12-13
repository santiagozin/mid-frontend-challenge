import axios from 'axios';
import { Property } from '../types/properties';
import rawPropertiesData from '../../../properties.json';

const propertiesData = rawPropertiesData as Property[];

interface GetPropertiesParams {
  page: number;
  limit: number;
  id?: string;
}

const getProperties = async ({ page = 1, limit = 10, id }: GetPropertiesParams) => {
  let API_URL = `https://fake-api-listings.vercel.app/properties?page=${page}&limit=${limit}`;
  
  if (id) {
    API_URL += `/${id}`;
  }
  
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = propertiesData.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      pagination: {
        total: propertiesData.length,
        page,
        limit,
        totalPages: Math.ceil(propertiesData.length / limit)
      }
    };
  }
};

interface UpdatePropertyParams {
  id: string;
  data: Partial<Property>;
}

const updateProperty = async ({ id, data }: UpdatePropertyParams) => {
  const API_URL = `https://fake-api-listings.vercel.app/properties/${id}`;
  
  try {
    const response = await axios.put(API_URL, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la propiedad:', error);
    throw error;
  }
};

interface CreatePropertyParams {
  data: Omit<Property, 'id'>;
}

const createProperty = async ({ data }: CreatePropertyParams) => {
  const API_URL = 'https://fake-api-listings.vercel.app/properties';
  
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la propiedad:', error);
    throw error;
  }
};

export { getProperties, updateProperty, createProperty };