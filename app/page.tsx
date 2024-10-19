import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/problems"}>Go to Problems</Link>
    </div>
  );
}
