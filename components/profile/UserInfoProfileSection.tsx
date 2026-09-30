import { Mail } from "lucide-react";
import LogoutBtn from "../auth/LogoutBtn";

interface UserProfileProps {
  user: {
    displayName: string;
    publicId: string;
    email?: string;
  };
  isPrivate?: boolean;
}

export default function UserInfoProfileSection({
  user,
  isPrivate = false,
}: UserProfileProps) {
  return (
    <section
      className="
        relative w-full
        border-2 border-foreground
        bg-background
        p-6
        shadow-[5px_5px_0px_0px_currentColor]
        sm:p-7
      "
    >
      {/* Profile image */}
      <div
        className="
          absolute
          -right-3
          -top-4
          h-24
          w-24
          rotate-2
          overflow-hidden
          border-2
          border-foreground
          bg-muted
          shadow-[4px_4px_0px_0px_currentColor]
        "
      >
        <img
          src="https://i.pinimg.com/236x/9e/83/05/9e830596b31163b9965c2f980e8e8b97.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Small label */}
      <p
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          text-muted-foreground
        "
      >
        THE LITTLE CORNER
      </p>

      {/* Public identity */}
      <div className="mt-3">
        <h1
          className="
            text-3xl
            font-black
            tracking-tight
            sm:text-4xl
          "
        >
          @{user.displayName}
        </h1>

        <p className="mt-1 text-xs font-bold text-muted-foreground">
          #{user.publicId}
        </p>
      </div>

      {/* Short description */}
      <p
        className="
          mt-5
          max-w-lg
          text-sm
          font-medium
          leading-relaxed
          text-muted-foreground
        "
      >
        Your weird little corner of the internet.
      </p>

      {/* Private information */}
      {isPrivate && (
        <div className="mt-6 border-t-2 border-dashed border-foreground pt-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <Mail
                size={17}
                strokeWidth={2.5}
                className="shrink-0"
                aria-hidden="true"
              />

              <p className="truncate text-sm font-bold">
                {user.email}
              </p>
            </div>

            <LogoutBtn />
          </div>
        </div>
      )}
    </section>
  );
}