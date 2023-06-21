import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="p-6 text-center">
      <Container>
        This project was built by @Freddy Munive. All rights reserved,{" "}
        {new Date().getFullYear()}
      </Container>
    </footer>
  );
}
