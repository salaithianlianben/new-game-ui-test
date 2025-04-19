import { Contact } from "./contact";
import { Promotion } from "./promotion";

export type Banner = {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  admin_id: number;
  img_url: string;
};

export interface Banners {
  banners: { img: string }[],
  banner_text: {
    text: string
  },
  ads_banner: {
    img: string
  },
  rewards: string[],
  promotions: Promotion[],
  contacts: Contact[]
}