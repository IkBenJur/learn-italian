import { getDeck } from "../lib/utils";
import PracticeQuizz from "./PracticeQuizz";

export default async function Page() {
  const words = await getDeck(200);

  return <PracticeQuizz Words={words} />;
}
