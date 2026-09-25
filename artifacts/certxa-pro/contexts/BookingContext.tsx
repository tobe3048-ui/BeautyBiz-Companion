import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type ClientProfile = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  lastVisit: string;
  service: string;
  visits: number;
  spend: string;
  color: 'green' | 'sand' | 'rose';
};

export type AppointmentRecord = {
  id: string;
  dateKey: string;
  time: string;
  name: string;
  service: string;
  duration: string;
  price: string;
  note?: string;
};

const demoClients: ClientProfile[] = [
  { id: 'client-alina', name: 'Alina Kim', initials: 'AK', phone: '3035550140', lastVisit: 'Today · 9:00 AM', service: 'Brow shaping', visits: 12, spend: '$684', color: 'green' },
  { id: 'client-maya', name: 'Maya Rivera', initials: 'MR', phone: '7205550172', lastVisit: 'Today · 11:30 AM', service: 'Signature facial', visits: 8, spend: '$920', color: 'sand' },
  { id: 'client-jordan', name: 'Jordan Parker', initials: 'JP', phone: '3035550199', lastVisit: 'Today · 2:00 PM', service: 'Mobile glam', visits: 5, spend: '$475', color: 'rose' },
  { id: 'client-sofia', name: 'Sofia Chen', initials: 'SC', phone: '7205550124', lastVisit: 'Sep 21 · 10:00 AM', service: 'Lash lift', visits: 16, spend: '$1,248', color: 'sand' },
  { id: 'client-nia', name: 'Nia Williams', initials: 'NW', phone: '3035550181', lastVisit: 'Sep 18 · 3:30 PM', service: 'Signature facial', visits: 4, spend: '$390', color: 'green' },
];

type NewClient = Omit<ClientProfile, 'id'>;
type NewAppointment = Omit<AppointmentRecord, 'id'>;
type BookingContextValue = {
  clients: ClientProfile[];
  bookings: AppointmentRecord[];
  addClient: (client: NewClient) => ClientProfile;
  addBooking: (appointment: NewAppointment) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<ClientProfile[]>(demoClients);
  const [bookings, setBookings] = useState<AppointmentRecord[]>([]);

  const value = useMemo<BookingContextValue>(() => ({
    clients,
    bookings,
    addClient: (client) => {
      const record: ClientProfile = { ...client, id: `client-${Date.now()}` };
      setClients((current) => [record, ...current]);
      return record;
    },
    addBooking: (appointment) => {
      setBookings((current) => [{ ...appointment, id: `booking-${Date.now()}` }, ...current]);
    },
  }), [clients, bookings]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookingData() {
  const value = useContext(BookingContext);
  if (!value) throw new Error('useBookingData must be used within BookingProvider.');
  return value;
}