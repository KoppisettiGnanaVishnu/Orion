import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;

export const getHostedZones = async () => {
  const res = await api.get("/hosted-zones/");
  return res.data;
};

export const createHostedZone = async (name: string) => {
  const res = await api.post("/hosted-zones/", {
    name,
  });
  return res.data;
};

export const deleteHostedZone = async (id: number) => {
  await api.delete(`/hosted-zones/${id}`);
};