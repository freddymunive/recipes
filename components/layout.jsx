import Footer from "./footer";
import Meta from "./meta";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="bg-yellow-400 p-5 ">
        <div className="text-center uppercase mb-8">
          <h3 className="text-gray-800">just add</h3>
          <h1 className="font-bold text-6xl">FREDD'S COOK</h1>
          <h3 className="text-gray-800">spread the joy</h3>
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
