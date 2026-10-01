import UserInfoProfileSection from "@/components/profile/UserInfoProfileSection";
import UserWhatIfs from "@/components/profile/UserWhatIfs";
import { notFound } from "next/navigation";
export const instant = false;

interface PublicUserPageProps {
  params: Promise<{
    publicId: string;
  }>;
}

export default async function PublicUserPage({
  params,
}: PublicUserPageProps) {
  const { publicId } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  const userResponse = await fetch(
    `${baseUrl}/api/u/${publicId}`,
    {
      cache: "force-cache",
    }
  );

  if (userResponse.status === 404) {
    notFound();
  }

  if (!userResponse.ok) {
    throw new Error("Failed to fetch user");
  }

  const userResult = await userResponse.json();
  const user = userResult.data;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">

        {/* Profile */}
        <UserInfoProfileSection user={user} />

        {/* User Content */}
        <section className="mt-8 sm:mt-10">

          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
              THE NONSENSE
            </p>
          </div>
        <UserWhatIfs endpoint={`/api/u/${publicId}/what-ifs`} />

        </section>

      </div>
    </main>
  );
}