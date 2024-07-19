import prisma from "./prisma";

export async function getHundredRandomWords() {
  let randomNum = Math.floor(Math.random() * 1000 + 1);

  if (randomNum > 900) {
    randomNum = 900;
  }

  const words = await prisma.word.findMany({ take: 100, skip: randomNum });

  return words;
}
