import { Word } from "@prisma/client";
import { FC } from "react";
import { Awnser } from "../lib/definitions";

interface FlashcardProps {
  Card: Word;
  Choices: Word[];
  AwnserState: Awnser;
  onCheckAwnser: (a: Word) => void;
  onContinueNextCard: () => void;
}

const Flashcard: FC<FlashcardProps> = ({
  Card,
  Choices,
  AwnserState,
  onCheckAwnser,
  onContinueNextCard,
}) => {
  return (
    <div className="flex items-center flex-col mx-auto w-3/5 gap-2">
      <div className="flex items-center justify-center w-full h-28 font-semibold text-xl bg-gray-700 px-4 py-2 rounded-3xl text-gray-50 border-2 border-blue-400 outline  outline-gray-700 outline-2">
        <p>{Card?.native}</p>
      </div>

      <div className="w-full h-28">
        {AwnserState === Awnser.Pending ? (
          <div className="grid grid-cols-2 w-full h-full gap-3">
            {Choices.map((awnser) => (
              <div
                key={awnser.id}
                className="text-center bg-gray-700 p-2 rounded-3xl text-gray-50 border-2 border-blue-400 outline  outline-gray-700 outline-2 hover:bg-gray-500 hover:outline-gray-500 hover:border-blue-300"
                onClick={() => onCheckAwnser(awnser)}
              >
                {awnser.translation}
              </div>
            ))}
          </div>
        ) : AwnserState === Awnser.Correct ? (
          <div
            className="flex items-center justify-center text-center w-full h-full bg-gray-700 p-2 rounded-3xl text-gray-50 border-2 border-green-400 outline  outline-gray-700 outline-2 hover:cursor-pointer"
            onClick={() => {
              onContinueNextCard();
            }}
          >
            <p>Correct, click to continue</p>
          </div>
        ) : (
          <div
            className="flex items-center justify-center text-center w-full h-full bg-gray-700 p-2 rounded-3xl text-gray-50 border-2 border-red-400 outline  outline-gray-700 outline-2 hover:cursor-pointer"
            onClick={() => {
              onContinueNextCard();
            }}
          >
            <p>
              Incorrect, awnser was{" "}
              <span className="font-bold">{Card.translation}</span>. Click to
              continue
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
