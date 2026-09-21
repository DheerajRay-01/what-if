import { randomInt } from "crypto";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generatePublicId() {
  let id = "";

  for (let i = 0; i < 6; i++) {
    id += characters[randomInt(characters.length)];
  }

  return id;
}