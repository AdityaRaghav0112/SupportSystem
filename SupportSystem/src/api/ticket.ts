import api from './api'

export interface CreateTicketPayload {
  title: string;
  description: string;
}

export const getTickets = async () => {
  const response = await api.get("/tickets")
  return response.data;
}

export const createTicket = async (data: CreateTicketPayload) => {
  const response = await api.post("/tickets", data);
  return response.data;
};