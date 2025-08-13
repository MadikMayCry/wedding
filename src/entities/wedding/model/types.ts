export interface WeddingData {
  id: number;
  fullname: string;
  phone_number?: string;
  guests: number;
  guest_side?: 'groom' | 'bride';
  created_at: string;
}
