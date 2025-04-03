export type Banner = {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  admin_id: number;
  img_url: string;
};

export interface BannerText {
  id: number;
  text: string;
  admin_id: number;
  created_at: string;
  updated_at: string;
}
