"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import UserWhatIfs from "./profile/UserWhatIfs";
import UserProfileReplySection from "./profile/UserProfileReplySection";

interface UserProfileTabsProps {
  profilePath: string;
  whatIfEndpoint: string;
}

export default function UserProfileTabs({
  profilePath,
  whatIfEndpoint,
}: UserProfileTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");

  // What Ifs is always the default
  const activeTab =
    tabParam === "replies" ? "replies" : "what-ifs";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "replies") {
      params.set("tab", "replies");
    } else {
      params.delete("tab");
    }

    const queryString = params.toString();

    router.replace(
      `${profilePath}${queryString ? `?${queryString}` : ""}`,
      {
        scroll: false,
      }
    );
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList
        className="
          mb-6
          h-auto
          w-full
          justify-start
          gap-2
          rounded-none
          border-b
          bg-transparent
          p-0
        "
      >
        <TabsTrigger
          value="what-ifs"
          className="
            rounded-none
            border-b-2
            border-transparent
            bg-transparent
            px-4
            py-2
            text-sm
            font-bold
            shadow-none

            data-[state=active]:border-foreground
            data-[state=active]:bg-transparent
            data-[state=active]:text-foreground
            data-[state=active]:shadow-none
          "
        >
          What Ifs
        </TabsTrigger>

        <TabsTrigger
          value="replies"
          className="
            rounded-none
            border-b-2
            border-transparent
            bg-transparent
            px-4
            py-2
            text-sm
            font-bold
            shadow-none

            data-[state=active]:border-foreground
            data-[state=active]:bg-transparent
            data-[state=active]:text-foreground
            data-[state=active]:shadow-none
          "
        >
          Replies
        </TabsTrigger>
      </TabsList>

      <TabsContent value="what-ifs">
        <UserWhatIfs endpoint={whatIfEndpoint} />
      </TabsContent>

      <TabsContent value="replies">
        <UserProfileReplySection />
      </TabsContent>
    </Tabs>
  );
}