import { getHundredRandomWords } from "../lib/utils";
import PracticeQuizz from "./PracticeQuizz";
import TopBar from "./TopBar";

export default async function Page() {
  const words = await getHundredRandomWords();

  return (
    <div className="bg-gray-50 h-screen">
      <TopBar />
      <PracticeQuizz Words={words} />
    </div>
  );
}
