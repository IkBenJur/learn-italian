"use client";

import { FC, useEffect, useState } from "react";
import { words } from "../lib/placeholder-data";
import { Word } from "../lib/definitions";

interface pageProps {}

enum Awnser {
  Pending,
  Correct,
  Incorrect,
}

const Page: FC<pageProps> = ({}) => {
  //Fetch deck
  const [usedCards, setUsedCards] = useState<boolean[]>(
    Array(words.length).fill(false)
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

    for (let i = 0; i < words.length; i++) {
      if (!usedCards[i]) {
        possibleCards[curCardIndece] = words[i];
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
        const possibleChoice = words[Math.floor(Math.random() * words.length)];
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

  //Finished state

  if (!finishedDeck) {
    return (
      <div className="flex items-center flex-col mx-auto w-3/5 gap-2">
        <div className="flex items-center justify-center w-full h-28 font-semibold text-xl bg-gray-700 px-4 py-2 rounded-3xl text-gray-50 border-2 border-blue-400 outline  outline-gray-700 outline-2">
          <p>{card?.native}</p>
        </div>

        <div className="w-full h-28">
          {answered === Awnser.Pending ? (
            <div className="grid grid-cols-2 w-full h-full gap-3">
              {choices.map((awnser) => (
                <div
                  key={awnser?.id}
                  className="text-center bg-gray-700 p-2 rounded-3xl text-gray-50 border-2 border-blue-400 outline  outline-gray-700 outline-2 hover:bg-gray-500 hover:outline-gray-500 hover:border-blue-300"
                  onClick={() => checkAnwser(awnser)}
                >
                  {awnser?.translation}
                </div>
              ))}
            </div>
          ) : answered === Awnser.Correct ? (
            <div
              className="flex items-center justify-center text-center w-full h-full bg-gray-700 p-2 rounded-3xl text-gray-50 border-2 border-green-400 outline  outline-gray-700 outline-2 hover:cursor-pointer"
              onClick={() => {
                getNextCard();
                setAnswered(Awnser.Pending);
              }}
            >
              <p>Correct, click to continue</p>
            </div>
          ) : (
            <div
              className="flex items-center justify-center text-center w-full h-full bg-gray-700 p-2 rounded-3xl text-gray-50 border-2 border-red-400 outline  outline-gray-700 outline-2 hover:cursor-pointer"
              onClick={() => {
                getNextCard();
                setAnswered(Awnser.Pending);
              }}
            >
              <p>
                Incorrect, awnser was{" "}
                <span className="font-bold">{card?.translation}</span>. Click to
                continue
              </p>
            </div>
          )}
        </div>
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

export default Page;
