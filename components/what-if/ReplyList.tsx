"use client";

import { useState } from "react";
import ReplyItem from "./ReplyItem";
import { Level1Reply } from "@/types/reply";

interface ReplyListProps {
  replies: Level1Reply[];
  whatIfId: string;
}

const ReplyList = ({
  replies,
  whatIfId,
}: ReplyListProps) => {
  const [openReplyId, setOpenReplyId] =
    useState<string | null>(null);

  const handleToggle = (replyId: string) => {
    setOpenReplyId((current) =>
      current === replyId ? null : replyId
    );
  };

  return (
    <div className="space-y-7">
      {replies.map((reply) => (
        <ReplyItem
          key={reply._id}
          reply={reply}
          whatIfId={whatIfId}
          isOpen={openReplyId === reply._id}
          onToggle={() => handleToggle(reply._id)}
        />
      ))}
    </div>
  );
};

export default ReplyList;