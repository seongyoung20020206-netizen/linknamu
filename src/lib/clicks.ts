import { getDb, isMongoConfigured } from "./mongodb";

type ClickDoc = { _id: string; count: number; updatedAt: Date };

const COLLECTION = "clicks";

export async function incrementClick(linkId: string): Promise<void> {
  const db = await getDb();
  await db
    .collection<ClickDoc>(COLLECTION)
    .updateOne(
      { _id: linkId },
      { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true },
    );
}

/** 링크 ID별 클릭 수. DB 미설정 또는 오류 시 빈 객체를 반환합니다. */
export async function getClickCounts(): Promise<Record<string, number>> {
  if (!isMongoConfigured()) return {};
  try {
    const db = await getDb();
    const docs = await db.collection<ClickDoc>(COLLECTION).find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (err) {
    console.error("[clicks] 클릭 수 조회 실패:", err);
    return {};
  }
}
