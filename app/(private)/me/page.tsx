import { notFound, redirect } from "next/navigation";
import UserInfoProfileSection from "@/components/profile/UserInfoProfileSection";
import UserProfileTabs from "@/components/UserProfileTabs";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const instant = false;

export default async function MyProfile() {

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto w-full max-w-2xl">
          <div
            className="
              border-2 border-foreground
              bg-background
              p-8
              text-center
              shadow-[6px_6px_0px_0px_currentColor]
            "
          >
            <div className="text-4xl">🫠</div>

            <h2 className="mt-4 text-xl font-black">
              We couldn't find you.
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Something went slightly wrong.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">

        {/* Profile */}
        <UserInfoProfileSection
          user={user}
          isPrivate
        />

        {/* User Content */}
        <section className="mt-8 sm:mt-10">

          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
              THE NONSENSE
            </p>
          </div>

          <UserProfileTabs
            profilePath="/me"
            whatIfEndpoint="/api/me/what-ifs"
          />

        </section>

      </div>
    </main>
  );
}