export default function Container({ children }) {
  return (
    <div className="container mx-auto px-5 grid grid-cols-2 gap-x-5 gap-y-6">
      {children}
    </div>
  );
}
