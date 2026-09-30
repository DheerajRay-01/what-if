export interface Level1Reply {
  _id: string;
  content: string;
  replyCount: number;

  authorId: {
    displayName: string;
    publicId: string;
  } | null;
}

export interface Level2Reply {
  _id: string;
  content: string;

  authorId: {
    displayName: string;
    publicId: string;
  } | null;
}

export interface PaginatedReplies<T> {
  replies: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export type Level1RepliesResponse =
  PaginatedReplies<Level1Reply>;

export type Level2RepliesResponse =
  PaginatedReplies<Level2Reply>;