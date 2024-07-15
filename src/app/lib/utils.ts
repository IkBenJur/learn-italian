import prisma from "./prisma";

export async function getDeck(numOfWords: number) {
  const words = await prisma.word.findMany({ take: numOfWords });

  return words;
}
