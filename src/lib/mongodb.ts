import { MongoClient, type Db } from "mongodb";

const DB_NAME = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드 HMR에서도 연결을 재사용하도록 globalThis에 캐싱
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경변수가 없습니다 (.env.local 확인)");
  }

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결 실패 시 다음 요청에서 재시도할 수 있도록 캐시 제거
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }

  const client = await globalForMongo._mongoClientPromise;
  return client.db(DB_NAME);
}
