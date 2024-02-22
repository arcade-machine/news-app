export interface NewsModel {
  news: News[];
  totalCount: number;
}

export interface News {
  categoryType: string;
  description: string;
  fullUrl: string;
  id: number;
  publishedDate: Date;
  title: string;
  titleImageUrl: string;
  url: string;
}
