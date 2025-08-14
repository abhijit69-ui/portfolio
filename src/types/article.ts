import type { StaticImageData } from 'next/image';

export interface Article {
  id: number;
  cover_image: string | StaticImageData;
  title: string;
  description?: string;
  url: string;
  readable_publish_date: string;
  public_reaction_count?: number;
}