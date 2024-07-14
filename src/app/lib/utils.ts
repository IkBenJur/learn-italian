import prisma from "./prisma";

export async function getDeck() {
  const words = await prisma.word.findMany();

  return words;
}
