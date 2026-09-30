export interface WhatIf {
  _id: string;
  content: string;
  postId:string;

  authorId: {
    displayName: string;
    publicId: string;
  } | null;

  replyCount: number;

  reactionCounts: {
    funny: number;
    interesting: number;
    crazy: number;
    build: number;
  };

    featuredReply?: {
    _id: string;
    content: string;
  } | null;
}
