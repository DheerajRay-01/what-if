"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-16 text-center">
        <Image
          src="/emojis/thinking-face.svg"
          alt=""
          width={70}
          height={70}
          className="mx-auto mb-5"
        />

        <p className="mb-3 text-sm font-black uppercase tracking-widest">
          ABOUT WHAT IF…?
        </p>

        <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
          Stupid thoughts.
          <br />
          Crazy ideas.
          <br />
          <span className="underline decoration-2 underline-offset-4">
            Maybe something useful.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          What If…? is a place for thoughts that are too weird,
          random, funny, or unfinished to keep in your head.
        </p>
      </section>

      {/* What is this? */}
      <section className="space-y-5 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          💭 What is this place?
        </h2>

        <div className="space-y-4 text-base leading-relaxed sm:text-lg">
          <p>
            You don't need a perfect idea.
            <br />
            You don't need to be an inventor.
            <br />
            You don't even need to make sense.
          </p>

          <p>
            Just start with two words:
          </p>

          <p className="text-3xl font-black">
            What if…?
          </p>

          <p>
            Throw the thought out there. See what other people
            think. And if someone makes it even worse, that's
            part of the fun.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="mt-16 space-y-5 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          🧠 Why does this exist?
        </h2>

        <div className="space-y-4 text-base leading-relaxed sm:text-lg">
          <p>
            A lot of ideas never go anywhere because we dismiss
            them before giving them a chance.
          </p>

          <p>
            Some thoughts are ridiculous.
            <br />
            Some are funny.
            <br />
            Some are completely useless.
          </p>

          <p>
            And occasionally, one makes you stop and think:
          </p>

          <blockquote className="border-l-4 border-foreground pl-5 text-xl font-black sm:text-2xl">
            "Wait… that might actually work."
          </blockquote>

          <p>
            What If…? is built around that moment.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mt-16 border-2 border-foreground bg-background p-6 shadow-[6px_6px_0px_0px_currentColor] sm:p-8">
        <p className="text-center text-xl font-black leading-tight sm:text-3xl">
          Every invention starts as a thought
          <br className="hidden sm:block" />
          that sounds a little stupid.
        </p>
      </section>

      {/* How it works */}
      <section className="mt-16 space-y-8 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          🔨 How it works
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              number: "01",
              title: "Have a thought",
              text: "Something weird crossed your mind? Don't overthink it.",
            },
            {
              number: "02",
              title: "Throw it out there",
              text: "Post your What If and let the internet deal with it.",
            },
            {
              number: "03",
              title: "See what happens",
              text: "People can react and leave their own terrible suggestions.",
            },
            {
              number: "04",
              title: "Make it worse",
              text: "Take someone's thought and make it even more ridiculous.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="border-2 border-foreground p-5 shadow-[4px_4px_0px_0px_currentColor]"
            >
              <p className="text-xs font-black text-muted-foreground">
                {item.number}
              </p>

              <h3 className="mt-2 text-lg font-black">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="mt-16 space-y-5 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          🤝 Keep it weird. Keep it respectful.
        </h2>

        <p className="text-base leading-relaxed sm:text-lg">
          What If…? is meant to be fun and experimental. Weird
          thoughts, jokes, questions, hypothetical situations,
          and crazy ideas are welcome.
        </p>

        <p className="text-base leading-relaxed sm:text-lg">
          But don't use the platform to attack, threaten,
          harass, impersonate, or deliberately harm other
          people.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="border-2 border-foreground p-5">
            <h3 className="font-black">👍 DO</h3>

            <ul className="mt-3 space-y-2 text-sm">
              <li>• Be weird.</li>
              <li>• Be creative.</li>
              <li>• Make things worse.</li>
              <li>• Have fun.</li>
              <li>• Respect other people.</li>
            </ul>
          </div>

          <div className="border-2 border-foreground p-5">
            <h3 className="font-black">🚫 DON'T</h3>

            <ul className="mt-3 space-y-2 text-sm">
              <li>• Harass or threaten people.</li>
              <li>• Post private information.</li>
              <li>• Impersonate others.</li>
              <li>• Post seriously harmful content.</li>
              <li>• Spam or scam people.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* User Content */}
      <section className="mt-16 space-y-5 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          📝 Your content
        </h2>

        <p className="text-base leading-relaxed sm:text-lg">
          When you post something on What If…?, you retain
          ownership of the content you created.
        </p>

        <p className="text-base leading-relaxed sm:text-lg">
          By submitting content, you give What If…? permission
          to store, display, reproduce, and distribute that
          content as reasonably necessary to operate, maintain,
          promote, and improve the service.
        </p>

        <p className="text-base leading-relaxed sm:text-lg">
          Because posts are public, don't submit anything you
          expect to remain private or confidential.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="mt-16 space-y-5 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          ⚠️ A small disclaimer
        </h2>

        <p className="text-base leading-relaxed sm:text-lg">
          Posts and suggestions on What If…? are user-generated
          content. They represent the views of their authors
          and not necessarily the views of What If…?.
        </p>

        <p className="text-base leading-relaxed sm:text-lg">
          Some ideas may be unrealistic, satirical, fictional,
          or intentionally stupid. Don't treat user posts as
          professional advice, factual claims, or instructions
          for potentially dangerous activities.
        </p>
      </section>

      {/* Anonymous */}
      <section className="mt-16 space-y-5 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          🕵️ Anonymous, but not invisible
        </h2>

        <p className="text-base leading-relaxed sm:text-lg">
          You don't need an account to post on What If…?.
        </p>

        <p className="text-base leading-relaxed sm:text-lg">
          However, technical information such as IP addresses,
          device information, logs, or other information may
          be collected or processed where necessary for security,
          abuse prevention, analytics, or operation of the
          service.
        </p>

        <p className="text-base leading-relaxed sm:text-lg">
          Don't post personal or sensitive information about
          yourself or someone else.
        </p>
      </section>

      {/* Legal */}
      <section className="mt-16 space-y-5 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          📜 The boring but important stuff
        </h2>

        <p className="text-base leading-relaxed sm:text-lg">
          We like stupid ideas. We don't like unnecessary legal
          problems.
        </p>

        <p className="text-base leading-relaxed sm:text-lg">
          For the complete rules around using What If…?, your
          content, privacy, and other legal matters, check the
          documents below.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/terms"
            className="border-2 border-foreground px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_currentColor] transition-transform hover:-translate-y-0.5"
          >
            TERMS →
          </Link>

          <Link
            href="/privacy"
            className="border-2 border-foreground px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_currentColor] transition-transform hover:-translate-y-0.5"
          >
            PRIVACY →
          </Link>

          <Link
            href="/community-guidelines"
            className="border-2 border-foreground px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_currentColor] transition-transform hover:-translate-y-0.5"
          >
            COMMUNITY GUIDELINES →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="mt-16 border-t-2 border-dashed border-foreground pt-10">
        <h2 className="text-2xl font-black sm:text-3xl">
          📮 Something wrong?
        </h2>

        <p className="mt-4 text-base leading-relaxed sm:text-lg">
          Found something that shouldn't be here? Have a
          copyright or legal concern?
        </p>

        {/* <p className="mt-3 font-black">
          your-email@example.com
        </p> */}
      </section>

      {/* Bottom */}
      <section className="mt-20 border-t-2 border-foreground pt-8 text-center">
        <p className="text-2xl font-black">
          WHAT IF…?
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Stupid thoughts. Crazy ideas.
        </p>

        <p className="mt-6 text-xs font-bold uppercase text-muted-foreground">
          © 2026 What If…? All rights reserved.
        </p>
      </section>
    </main>
  );
}