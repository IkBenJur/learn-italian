import { QualityOfAwnserRetrieval } from "@/app/lib/definitions";
import { setNextIntervalForWordReview } from "@/app/lib/utils";
import { User, Word } from "@prisma/client";
import { NextResponse } from "next/server";

interface UpdateWordMetricApiRequest extends Request {
  User: User;
  Word: Word;
  RetrievalQuality: QualityOfAwnserRetrieval;
}

export async function POST(req: UpdateWordMetricApiRequest) {
  const data = await req.json();
  if (!("Word" in data)) {
    return NextResponse.json({ message: "Word object not in body" });
  }

  if (!("RetrievalQuality" in data)) {
    return NextResponse.json({ message: "Retrieval quality not in body" });
  }

  const user: User = {
    id: "clysu0ghx0000t4g3pizv1c9i",
    name: "test",
    email: "test@mail.com",
  };

  const Word: Word = {
    id: "clymz1d200001p243nek00xpp",
    native: "Io",
    translation: "I",
  };
  
  await setNextIntervalForWordReview(
    Word,
    user,
    QualityOfAwnserRetrieval.Recalled
  );

  return NextResponse.json({ message: "Wowie" });
}
