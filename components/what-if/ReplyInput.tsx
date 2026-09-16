"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ReplyInputProps {
  onSubmit: (content: string) => Promise<boolean>;
  loading: boolean;
}

const ReplyInput = ({
  onSubmit,
  loading,
}: ReplyInputProps) => {
  const [content, setContent] = useState("");

  const maxLength = 280;

  const handleSubmit = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent || loading) {
      return;
    }

    const success = await onSubmit(trimmedContent);

    if (success) {
      setContent("");
    }
  };

  return (
    <div className="border-2 border-black bg-[#fffdf5] shadow-[3px_3px_0_#000]">
      <div className="flex items-end gap-2 p-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxLength}
          placeholder="Drop your terrible idea here..."
          disabled={loading}
          className="min-h-[42px] flex-1 resize-none rounded-none border-0 bg-transparent px-2 py-1.5 text-sm font-medium leading-snug shadow-none focus-visible:ring-0 disabled:opacity-50"
          rows={1}
        />

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!content.trim() || loading}
          className="h-8 shrink-0 rounded-none bg-black px-3 text-[11px] font-black uppercase text-white hover:bg-black/80 disabled:opacity-30"
        >
          {loading ? (
            "POSTING..."
          ) : (
            <>
              MAKE IT WORSE
              <ArrowUpRight
                size={13}
                strokeWidth={2.5}
              />
            </>
          )}
        </Button>
      </div>

      {content.length >= 240 && (
        <div className="px-3 pb-1.5 text-right">
          <span className="text-[10px] font-bold text-black/40">
            {content.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReplyInput;