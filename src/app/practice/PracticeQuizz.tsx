"use client";

import { FC, useEffect, useState } from "react";
import { Word } from "@prisma/client";
import { Awnser } from "../lib/definitions";
import ProgressBar from "./ProgressBar";
import Flashcard from "./Flashcard";

interface PracticeQuizzProps {
  Words: Word[];
}

const PracticeQuizz: FC<PracticeQuizzProps> = ({ Words }) => {
  const [usedCards, setUsedCards] = useState<boolean[]>(
    Array(Words.length).fill(false)
  );
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [card, setCard] = useState<Word | undefined>(undefined);
  const [choices, setChoices] = useState<Word[]>([]);
  const [answered, setAnswered] = useState<Awnser>(Awnser.Pending);
  const [finishedDeck, setFinishedDeck] = useState<boolean>(false);

  function getNextCard() {
    const possibleCards = [];
    const possibleCardsIndeces = [];
    let curCardIndece = 0;

    for (let i = 0; i < Words.length; i++) {
      if (!usedCards[i]) {
        possibleCards[curCardIndece] = Words[i];
        possibleCardsIndeces[curCardIndece] = i;
        curCardIndece++;
      }
    }

    if (possibleCards.length !== 0) {
      const curIndex = Math.floor(Math.random() * possibleCards.length);
      setCard(possibleCards[curIndex]);
      const newUsedCards = [...usedCards];
      newUsedCards[possibleCardsIndeces[curIndex]] = true;
      setUsedCards(newUsedCards);
      console.log(possibleCards);
    } else {
      setCard(undefined);
      setChoices([]);
      setFinishedDeck(true);
    }
  }

  function getNewChoices() {
    if (card) {
      const newChoices: Word[] = [card];

      while (newChoices.length < 4) {
        const possibleChoice = Words[Math.floor(Math.random() * Words.length)];
        if (!newChoices.includes(possibleChoice)) {
          newChoices.push(possibleChoice);
        }
      }

      //Shuffle arr
      newChoices.sort(function (a, b) {
        return Math.random() - 0.5;
      });
      setChoices(newChoices);
    }
  }

  function checkAnwser(awnser: Word) {
    if (awnser?.native === card?.native) {
      console.log("Correct");
      setCorrect((prev) => prev + 1);
      setAnswered(Awnser.Correct);
    } else {
      console.log("Incorrect");
      setIncorrect((prev) => prev + 1);
      setAnswered(Awnser.Incorrect);
    }
  }

  useEffect(() => {
    getNextCard();
  }, []);

  useEffect(() => {
    getNewChoices();
  }, [card]);

  useEffect(() => {
    if (!card && (correct > 0 || incorrect > 0)) {
      console.log("Quiz complete");
      console.log("Correct: " + correct);
      console.log("Incorrect: " + incorrect);
    }
  }, [card, correct, incorrect]);

  if (!card && !finishedDeck) return <p>loading</p>;

  if (!finishedDeck && card) {
    return (
      <div className="flex flex-col gap-6">
        <ProgressBar Current={correct + incorrect} Max={Words.length} />
        <Flashcard
          Card={card}
          Choices={choices}
          AwnserState={answered}
          onCheckAwnser={checkAnwser}
          onContinueNextCard={() => {
            getNextCard();
            setAnswered(Awnser.Pending);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col mx-auto w-3/5">
      <p>
        Test finished. Correct: {correct} and incorrect {incorrect}
      </p>
    </div>
  );
};

export default PracticeQuizz;
