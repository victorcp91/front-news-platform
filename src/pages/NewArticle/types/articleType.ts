export interface IArticle {
  title: string;
  smallDescription: string;
  image?: File[];
  category: string;
  content: string;
  published: boolean;
}

export interface ISavedArticle {
  title: string;
  smallDescription: string;
  image?: string;
  category: string;
  content: string;
  published: boolean;
  uid: string;
}