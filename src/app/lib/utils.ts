import { Prisma, User, Word } from "@prisma/client";
import prisma from "./prisma";
import { QualityOfAwnserRetrieval } from "./definitions";
import { Decimal } from "@prisma/client/runtime/library";

export async function getHundredRandomWords() {
  let randomNum = Math.floor(Math.random() * 1000 + 1);

  if (randomNum > 900) {
    randomNum = 900;
  }

  const words = await prisma.word.findMany({ take: 100, skip: randomNum });

  return words;
}

export async function setNextIntervalForWordReview(
  word: Word,
  user: User,
  retrieval: QualityOfAwnserRetrieval
) {
  const metrics = await prisma.wordMetricForUser.findFirst({
    where: {
      word: word,
      user: user,
    },
  });

  if (!metrics) {
    return;
  }

  if (retrieval >= 3) {
    if (metrics.repitition === 0) {
      const dateString = metrics.NextReviewDate.toDateString();
      const date = new Date(dateString);
      date.setUTCDate(date.getUTCDate() + 1);
      metrics.NextReviewDate = date;
      metrics.dateInterval = 1;
    } else if (metrics.repitition === 1) {
      const dateString = metrics.NextReviewDate.toDateString();
      const date = new Date(dateString);
      date.setUTCDate(date.getUTCDate() + 6);
      metrics.NextReviewDate = date;
      metrics.dateInterval = 6;
    } else {
      const dateString = metrics.NextReviewDate.toDateString();
      const date = new Date(dateString);
      const newValue = Math.ceil(
        metrics.dateInterval * metrics.easeFactor.toNumber()
      );
      date.setUTCDate(date.getUTCDate() + newValue);
      metrics.NextReviewDate = date;
      metrics.dateInterval = newValue;
    }

    metrics.repitition += 1;

    const prevEaseFactor = metrics.easeFactor.toNumber();
    metrics.easeFactor = new Prisma.Decimal(
      Math.round(
        (prevEaseFactor +
          (0.1 - (5 - retrieval) * (0.08 + (5 - retrieval) * 0.02))) *
          100
      ) / 100
    );
  } else {
    metrics.repitition = 0;
    const dateString = metrics.NextReviewDate.toDateString();
    const date = new Date(dateString);
    date.setUTCDate(date.getUTCDate() + 1);
    metrics.NextReviewDate = date;
    metrics.dateInterval = 1;
  }

  if (metrics.easeFactor.toNumber() < 1.3) {
    metrics.easeFactor = new Decimal(1.3);
  }

  await prisma.wordMetricForUser.update({
    data: metrics,
    where: { id: metrics.id },
  });
}

export async function createNewUser(mail: string, name: string) {
  try {
    const allWords: Word[] = await prisma.word.findMany();
    const wordIds = allWords.map((word) => {
      return {
        wordId: word.id,
      };
    });

    await prisma.user.create({
      data: {
        email: mail,
        name: name,
        WordMetricForUser: {
          createMany: { data: wordIds },
        },
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(
        "There is a unique constraint violation, a new user cannot be created with this email"
      );
    }
    return false;
  }

  return true;
}
