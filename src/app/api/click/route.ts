import { profile } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/clicks";
import { isMongoConfigured } from "@/lib/mongodb";

const validIds = new Set(profile.links.map((l) => l.id));

// 클릭 1회 기록: POST /api/click  { "linkId": "github" }
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청 본문" }, { status: 400 });
  }

  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return Response.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  if (!isMongoConfigured()) {
    return Response.json({ error: "DB가 설정되지 않음" }, { status: 503 });
  }

  try {
    await incrementClick(linkId);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[api/click] 기록 실패:", err);
    return Response.json({ error: "기록 실패" }, { status: 500 });
  }
}

// 링크별 클릭 수 조회: GET /api/click
export async function GET() {
  return Response.json(await getClickCounts());
}
