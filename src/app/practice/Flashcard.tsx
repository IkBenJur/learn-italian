// "use client";

// import { FC, useState } from "react";
// import { Word } from "../lib/definitions";

// interface FlashcardProps {
//   word: Word;
//   awnsers: Word[];
// }

// enum Awnser {
//   Pending,
//   Correct,
//   Incorrect,
// }

// const Flashcard: FC<FlashcardProps> = ({ word, awnsers }) => {
  


//   const [awnserred, setAwnserred] = useState<Awnser>(Awnser.Pending);

//   function checkAnwser(awnser: Word) {
//     if (awnser.native === word.native) {
//       console.log("Correct");
//       setAwnserred(Awnser.Correct);
//       //Change ui
//     } else {
//       console.log("Incorrect");
//       setAwnserred(Awnser.Incorrect);
//       //Change ui
//     }
//   }

//   return (
//     <div className="flex items-center flex-col mx-auto w-3/5 gap-2">
//       <div className="flex items-center justify-center w-full h-16 font-semibold text-xl bg-gray-700 px-4 py-2 rounded-full text-gray-50 border-2 border-blue-400 outline  outline-gray-700 outline-2">
//         <p>{word.native}</p>
//       </div>

//       <div className="grid grid-cols-2 w-full h-16 gap-3">
//         {awnsers.map((awnser) => (
//           <div
//             key={awnser.id}
//             className="text-center bg-gray-700 p-2 rounded-full text-gray-50 border-2 border-blue-400 outline  outline-gray-700 outline-2 hover:bg-gray-500 hover:outline-gray-500 hover:border-blue-300"
//             onClick={() => checkAnwser(awnser)}
//           >
//             {awnser.translation}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Flashcard;
