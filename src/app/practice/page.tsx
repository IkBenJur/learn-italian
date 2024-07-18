import { getDeck } from "../lib/utils";
import PracticeQuizz from "./PracticeQuizz";
import TopBar from "./TopBar";

export default async function Page() {
  const words = await getDeck(200);

  return (
    <div className="bg-gray-50 h-screen">
      <TopBar />
      <PracticeQuizz Words={words} />
    </div>
  );
}
