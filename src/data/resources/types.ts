export interface Resource {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime?: string;
  image?: string;
  tags: string[];
  externalUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  ogImage?: string;
  author?: {
    name: string;
    role?: string;
  };
  content?: string;
}
