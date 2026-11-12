export type LinkItem = {
  /** 클릭 수 집계에 쓰는 고유 ID (바꾸면 해당 링크의 집계가 새로 시작됩니다) */
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로 또는 외부 이미지 URL */
  image: string;
  links: LinkItem[];
};

// TODO: 아래는 보여 주기용 더미 값입니다. 나중에 진짜 내용으로 바꾸세요.
// (사진은 public/ 에 넣고 image 경로만 바꾸면 됩니다)
export const profile: Profile = {
  name: "김승영",
  bio: "세계 최강 바이브 코더",
  image: "/profile.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
    { id: "blog", title: "Blog", url: "https://velog.io/" },
  ],
};
