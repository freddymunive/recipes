import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound = () => {
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      route.push("/");
    }, 4000);
  }, [route]);

  return (
    <div>
      <h1>404</h1>
      <h2>Oops! That page cannot be found :(</h2>
      <p>
        Redirecting to <Link href="/">Homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
