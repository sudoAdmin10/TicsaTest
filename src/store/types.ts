export interface PostModel {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface FormPostModel {
  title: string;
  body: string;
  files?: File[];
}

export interface PostState {
  posts: PostModel[];
  loading: boolean;
  error: string | null;
  selectedPost: PostModel | null;
}