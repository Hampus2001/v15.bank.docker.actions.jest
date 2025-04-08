import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/createAccount">Create account</Link>
      <p>deploy test 4</p>
    </div>
  );
}
