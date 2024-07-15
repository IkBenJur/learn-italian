const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

const allFileContents = fs.readFileSync(
  ".\\src\\app\\lib\\common_italian_words.txt",
  "utf-8"
);

const load = async () => {
  try {
    await prisma.word.deleteMany();

    let words = allFileContents.split(/\r?\n/);
    words.shift();
    words.pop();

    words = words.map((line: any) => {
      const word = line.split("\t\t");
      word[0] = word[0].replace(/^[\s]+|[\s]+$/gm, "");
      word[1] = word[1].replace(/^[\s]+|[\s]+$/gm, "");
      return {
        native: word[0].charAt(0).toUpperCase() + word[0].slice(1),
        translation: word[1].charAt(0).toUpperCase() + word[1].slice(1),
      };
    });

    await prisma.word.createMany({ data: words });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

load();
