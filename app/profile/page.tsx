import { Suspense } from "react";
import Profile from "@/components/profile/Profile";
export const instant = false;

export default function ProfilePage() {
  return (
    <main className="min-h-[calc(100vh-64px)] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto flex w-full max-w-2xl justify-center">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProtectedProfile />
        </Suspense>
      </div>
    </main>
  );
}

async function ProtectedProfile() {
  const { auth } = await import("@/auth");
  const { redirect } = await import("next/navigation");

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <Profile />;
}

function ProfileSkeleton() {
  return (
    <div className="w-full max-w-lg border-2 border-foreground bg-background p-6 shadow-[6px_6px_0px_0px_currentColor] sm:p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-3 w-32 bg-muted" />
        <div className="h-9 w-56 bg-muted" />

        <div className="space-y-3">
          <div className="h-20 w-full bg-muted" />
          <div className="h-20 w-full bg-muted" />
          <div className="h-20 w-full bg-muted" />
        </div>

        <div className="h-12 w-full bg-muted" />
      </div>
    </div>
  );
}