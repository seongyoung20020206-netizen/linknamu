import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 반투명 흰 테두리 + 겹친 그림자로 살짝 떠 있는 입체감 */}
      <div className="rounded-full bg-gradient-to-b from-white/90 to-white/40 p-1 shadow-[0_1px_2px_rgb(30_37_48/0.08),0_12px_32px_-8px_rgb(30_37_48/0.35)]">
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={128}
          height={128}
          priority
          // 외부 이미지(placehold.co는 SVG 응답)는 Next 이미지 최적화를 거치지 않고 그대로 표시
          unoptimized={image.startsWith("http") || image.endsWith(".svg")}
          className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
        />
      </div>
      <h1 className="mt-5 text-[1.375rem] font-bold tracking-tight text-slate-900 sm:text-2xl">
        {name}
      </h1>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate-600">{bio}</p>
    </header>
  );
}
