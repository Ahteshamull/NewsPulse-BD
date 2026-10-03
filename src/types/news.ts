export type CategorySlug =
  | "all"
  | "national"
  | "politics"
  | "business"
  | "international"
  | "sports"
  | "tech"
  | "entertainment"
  | "lifestyle"
  | "opinion";

export interface NewsAuthor {
  nameBn: string;
  nameEn: string;
  avatar: string;
  roleBn: string;
  roleEn: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  subtitleBn?: string;
  subtitleEn?: string;
  summaryBn: string;
  summaryEn: string;
  contentBn: string[];
  contentEn: string[];
  category: CategorySlug;
  categoryNameBn: string;
  categoryNameEn: string;
  imageUrl: string;
  imageCaptionBn?: string;
  imageCaptionEn?: string;
  author: NewsAuthor;
  publishedAt: string; // ISO string
  publishedTimeBn: string;
  publishedTimeEn: string;
  readTimeBn: string;
  readTimeEn: string;
  isBreaking?: boolean;
  isLead?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  tagsBn: string[];
  tagsEn: string[];
  viewsCount: number;
  reactions: {
    like: number;
    love: number;
    surprised: number;
    sad: number;
  };
}

export interface VideoArticle {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  thumbnail: string;
  videoDuration: string;
  publishedAt: string;
  publishedTimeBn: string;
  publishedTimeEn: string;
  viewsBn: string;
  viewsEn: string;
  youtubeId: string;
  categoryBn: string;
  categoryEn: string;
  descriptionBn: string;
  descriptionEn: string;
}

export interface CommentItem {
  id: string;
  newsId: string;
  authorName: string;
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface PollQuestion {
  id: string;
  questionBn: string;
  questionEn: string;
  totalVotes: number;
  yesVotes: number;
  noVotes: number;
  noOpinionVotes: number;
}
