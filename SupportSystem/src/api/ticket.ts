import api from './api'

export interface Ticket {
  id: number;
  user_id: number;
  title: string;
  description: string;
  priority?: string;
  status: string;
  assigned_department?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
}

export interface UpdateTicketPayload {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  assigned_department?: string | null;
}

export const getTickets = async (): Promise<Ticket[]> => {
  const response = await api.get<Ticket[]>("/tickets")
  return response.data;
}

export const getTicket = async (id: number | string): Promise<Ticket> => {
  const response = await api.get<Ticket>(`/tickets/${id}`);
  return response.data;
};

export const createTicket = async (data: CreateTicketPayload) => {
  const response = await api.post("/tickets", data);
  return response.data;
};

export const updateTicket = async (
  id: number | string,
  data: UpdateTicketPayload
) => {
  const response = await api.put(`/tickets/${id}`, data);
  return response.data;
};