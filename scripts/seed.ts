import "dotenv/config";
import mongoose from "mongoose";
import WhatIf from "@/models/whatif.model";
import Reply from "@/models/reply.model";
import { connectDB } from "../lib/connectDB";


const dummyData = [
  {
    content: "What if cats could talk, but only when nobody was looking?",
    replies: [
      "Bro would know everyone's secrets.",
      "Mine already acts like it has classified information.",
      "Imagine hearing 'finally, you're awake' at 3 AM.",
    ],
  },

  {
    content: "What if you could pause time for 10 seconds once every day?",
    replies: [
      "I'd use it every time I almost drop my phone.",
      "Perfect for pretending you didn't see that message.",
    ],
  },

  {
    content: "What if every lie made your shoes squeak?",
    replies: [
      "Family dinners would sound like a cartoon.",
      "Politicians would be banned from wearing shoes.",
      "Imagine saying 'I'm fine'... SQUEAK SQUEAK.",
      "Finally, a reason to hate squeaky shoes.",
      "Crocs would become a security system.",
    ],
  },

  {
    content: "What if your fridge could judge you every time you opened it?",
    replies: [
      "Mine would just say 'again?'",
      "Especially at 2 AM.",
      "The fridge knows more about me than my family.",
      "I'd stop opening it and start ordering food.",
    ],
  },

  {
    content: "What if humans had a loading screen before making a stupid decision?",
    replies: [
      "Mine would never finish loading.",
      "Please wait... bad decision detected.",
      "There should be a cancel button.",
    ],
  },

  {
    content: "What if every dog had a password and humans had to prove they were worthy?",
    replies: [],
  },

  {
    content: "What if plants screamed whenever we forgot to water them?",
    replies: [
      "My balcony would be a horror movie.",
      "Suddenly everyone becomes a responsible plant parent.",
      "Imagine your neighbour screaming and then realizing it's their money plant.",
      "Plants would finally have revenge.",
      "I'd water mine before they start snitching.",
    ],
  },

  {
    content: "What if your future self could send you one message every year?",
    replies: [
      "Mine would probably say 'don't do it'.",
      "Imagine getting 'BRO TRUST ME' with zero context.",
      "I'd ask for tomorrow's lottery numbers.",
    ],
  },

  {
    content: "What if traffic lights knew when you desperately needed a bathroom?",
    replies: [
      "Every light would turn green for me.",
      "Technology finally solving the real problems.",
      "Imagine getting stuck behind someone who doesn't need to pee.",
      "Road rage would become bathroom rage.",
    ],
  },

  {
    content: "What if you could download a skill like an app, but it took 24 hours?",
    replies: [
      "Downloading cooking... ordered food instead.",
      "I'd download 'how to make money'.",
      "Imagine accidentally installing advanced mathematics.",
      "I'd download confidence first.",
      "Gym memberships would disappear.",
    ],
  },

  {
    content: "What if mirrors showed you how you actually look to other people?",
    replies: [
      "Absolutely not.",
      "My confidence just left the chat.",
    ],
  },

  {
    content: "What if every time you said 'I'm on my way', your phone showed your actual location to everyone?",
    replies: [
      "The world would become brutally honest.",
      "My friends would finally stop believing me.",
      "Uber drivers would become witnesses.",
      "Group chats would be destroyed.",
    ],
  },

  {
    content: "What if sleep had a progress bar showing how much rest you actually needed?",
    replies: [
      "8 hours later: 47% complete.",
      "Mine would say 'please try again tomorrow'.",
      "Honestly, I'd trust this more than my alarm.",
    ],
  },

  {
    content: "What if your phone battery percentage represented your energy level too?",
    replies: [
      "1% me would still say 'I'm fine'.",
      "Low Power Mode at 6 PM.",
      "I'd start carrying a power bank for myself.",
      "Doctors would prescribe charging breaks.",
    ],
  },

  {
    content: "What if every house had one room that nobody was allowed to enter?",
    replies: [],
  },

  {
    content: "What if you could delete one embarrassing memory from your brain, but someone else gets to choose which one?",
    replies: [
      "Absolutely dangerous.",
      "My friends would choose the worst possible one.",
      "I'd rather keep the memories.",
      "Imagine deleting the wrong embarrassment.",
      "Plot twist: you forgot why you were embarrassed.",
    ],
  },

  {
    content: "What if pigeons had tiny cameras and were secretly collecting information about humans?",
    replies: [
      "I knew those birds were suspicious.",
      "Finally, an explanation for why they stare at us.",
      "My local pigeon definitely has a manager.",
    ],
  },

  {
    content: "What if every object you lost could tell you where it was, but only after you found it?",
    replies: [
      "Keys would become extremely sarcastic.",
      "Found my charger. 'I was under the bed.' Thanks.",
      "This would be useful and completely useless at the same time.",
      "Remote: 'You were sitting on me.'",
    ],
  },

  {
    content: "What if humans could smell Wi-Fi?",
    replies: [
      "5G would probably smell expensive.",
      "Imagine walking into a room and smelling terrible Wi-Fi.",
      "I'd finally know where the good signal is.",
      "No signal would be a completely scentless room.",
      "Hotels would have Wi-Fi perfume.",
    ],
  },

  {
    content: "What if every time you opened your camera accidentally, it showed how other people see you?",
    replies: [
      "Delete the camera app immediately.",
      "Front camera already scares me enough.",
      "This feature would end friendships.",
    ],
  },
];

async function seed() {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    const whatIfDocs = await WhatIf.insertMany(
      dummyData.map((item) => ({
        content: item.content,
        replyCount: item.replies.length,
      }))
    );

    const replyDocs = dummyData.flatMap((item, index) =>
      item.replies.map((content) => ({
        whatIfId: whatIfDocs[index]._id,
        content,
      }))
    );

    if (replyDocs.length > 0) {
      await Reply.insertMany(replyDocs);
    }

    console.log(`✅ ${whatIfDocs.length} What Ifs inserted`);
    console.log(`✅ ${replyDocs.length} replies inserted`);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();