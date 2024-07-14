import { getDeck } from "../lib/utils";
import PracticeQuizz from "./PracticeQuizz";

export default async function Page() {
  const words = await getDeck();

  return <PracticeQuizz Words={words} />;
}
