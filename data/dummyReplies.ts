    import { Level1Reply, Level2Reply } from "@/types/reply";

export const dummyLevel1Replies: Level1Reply[] = [
  {
    _id: "reply001",
    content: "Honestly, I'd trust this more than my alarm.",
    replyCount: 0,
  },
  {
    _id: "reply002",
    content: "8 hours later: 47% complete.",
    replyCount: 1,
  },
  {
    _id: "reply003",
    content:
      "Imagine waking up and seeing: 'Sleep interrupted. Resume session?'",
    replyCount: 2,
  },
  {
    _id: "reply004",
    content:
      "And somehow the progress bar would get stuck at 99%.",
    replyCount: 3,
  },
  {
    _id: "reply005",
    content:
      "The worst part is that you'd probably start negotiating with it.",
    replyCount: 5,
  },
  {
    _id: "reply006",
    content:
      "What if the alarm actually had a personality and slowly became disappointed in you?",
    replyCount: 8,
  },
  {
    _id: "reply007",
    content:
      "Mine would just say: bro, we talked about this yesterday.",
    replyCount: 0,
  },
  {
    _id: "reply008",
    content:
      "At this point I'd uninstall sleep and reinstall it.",
    replyCount: 1,
  },
  {
    _id: "reply009",
    content:
      "Imagine getting a notification at 3 AM saying: 'Your sleep streak is about to expire.'",
    replyCount: 4,
  },
  {
    _id: "reply010",
    content:
      "Then the app asks you to rate your sleep experience before letting you wake up.",
    replyCount: 0,
  },
];


export const dummyLevel2Replies: Record<
  string,
  Level2Reply[]
> = {
  reply002: [
    {
      _id: "child00201",
      content: "Mine would say 'please try again tomorrow'.",
    },
  ],

  reply003: [
    {
      _id: "child00301",
      content: "I'd hit resume and immediately regret it.",
    },
    {
      _id: "child00302",
      content: "Bro turned sleep into a software update.",
    },
  ],

  reply004: [
    {
      _id: "child00401",
      content: "99% for six hours. Absolutely criminal.",
    },
    {
      _id: "child00402",
      content: "Then it says 'Almost there!' for another hour.",
    },
    {
      _id: "child00403",
      content: "I'd throw the phone across the room.",
    },
  ],

  reply005: [
    {
      _id: "child00501",
      content:
        "At some point I'd start asking it for emotional support.",
    },
    {
      _id: "child00502",
      content:
        "Imagine the alarm saying 'I'm not mad, just disappointed.'",
    },
    {
      _id: "child00503",
      content:
        "And then it sets an earlier alarm for tomorrow.",
    },
    {
      _id: "child00504",
      content:
        "That's not an alarm anymore. That's a toxic relationship.",
    },
    {
      _id: "child00505",
      content:
        "I'd uninstall the whole concept of mornings.",
    },
  ],

  reply006: [
    {
      _id: "child00601",
      content:
        "Mine would definitely judge my snooze button addiction.",
    },
    {
      _id: "child00602",
      content:
        "Imagine it keeping a record of every time you lied to yourself.",
    },
    {
      _id: "child00603",
      content:
        "The notification: 'You said this was the last snooze.'",
    },
    {
      _id: "child00604",
      content:
        "Five snoozes later: 'We need to talk.'",
    },
    {
      _id: "child00605",
      content:
        "I'd put the phone on airplane mode and hope for the best.",
    },
    {
      _id: "child00606",
      content:
        "Then airplane mode sends a notification anyway.",
    },
    {
      _id: "child00607",
      content:
        "At that point the phone owns me.",
    },
    {
      _id: "child00608",
      content:
        "10/10 would still hit snooze.",
    },
  ],

  reply008: [
    {
      _id: "child00801",
      content:
        "Reinstalling sleep would probably require a software update.",
    },
  ],

  reply009: [
    {
      _id: "child00901",
      content:
        "Sleep streaks would somehow become more stressful than work.",
    },
    {
      _id: "child00902",
      content:
        "Imagine losing a 247-day sleep streak because you watched one reel.",
    },
    {
      _id: "child00903",
      content:
        "And then the app sends a sad notification.",
    },
    {
      _id: "child00904",
      content:
        "Achievement unlocked: completely ruined tomorrow.",
    },
  ],
};