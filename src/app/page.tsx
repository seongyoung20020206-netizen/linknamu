import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

// wireframe.png 구성: 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 세로 목록
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[26rem] flex-1 flex-col items-center px-6 pt-16 pb-10 sm:px-8 sm:pt-24">
      {/* 상단: 프로필 */}
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      {/* 하단: 링크 카드 목록 */}
      <section aria-label="링크 목록" className="mt-10 w-full">
        <LinkList links={profile.links} />
      </section>

      <footer className="mt-auto pt-16 text-xs tracking-wide text-white/60">링크나무 🌳</footer>
    </main>
  );
}
