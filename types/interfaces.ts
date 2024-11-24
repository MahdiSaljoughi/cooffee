export interface IPost {
  id: number;
  title: string;
  image: string;
  created_by: string;
  created_at: any;
  updated_at: any;
  description: string;
}

export interface IProduct {
  id: number;
  title: string;
  title_eng: string;
  slug: string;
  price: number;
  count: number;
  description: string;
  cat: string;
  image: string;
  created_by: string;
  created_at: any;
  updated_at: any;
}
