import Link from "next/link";

const Home = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/clientcomp">Client</Link>
        </li>
        <li>
          <Link href="/servercomp">Server</Link>
        </li>
      </ul>

      <h1 className="font-roboto">
        Hello Client vs Server Component
      </h1>
    </>
  );
};

export default Home;
