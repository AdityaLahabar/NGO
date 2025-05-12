export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  date: string;
  category: string;
  tags: string[];
  impact: {
    metric: string;
    value: string;
  }[];
  location: string;
}