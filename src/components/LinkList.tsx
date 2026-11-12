import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  return (
    <ul className="flex w-full flex-col gap-3.5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} />
        </li>
      ))}
    </ul>
  );
}
