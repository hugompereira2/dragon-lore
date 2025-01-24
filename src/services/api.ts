import { Dragon } from "@/types/dragon";
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchDragons = async (): Promise<Dragon[]> => {
  const response = await api.get('/dragon');
  return response.data;
};

export const fetchDragonById = async (id: string): Promise<Dragon> => {
  const response = await api.get(`/dragon/${id}`);
  return response.data;
};

export const createDragon = async (dragon: Omit<Dragon, 'id'>): Promise<Dragon> => {
  const response = await api.post('/dragon', dragon);
  return response.data;
};

export const updateDragon = async (id: string, dragon: Partial<Omit<Dragon, 'id'>>): Promise<Dragon> => {
  const response = await api.put(`/dragon/${id}`, dragon);
  return response.data;
};

export const deleteDragon = async (id: string): Promise<void> => {
  await api.delete(`/dragon/${id}`);
};