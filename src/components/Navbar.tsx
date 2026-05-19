type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  return (
    <div className="bg-[#6f4e37] text-white px-10 py-6 shadow-lg">
      <h1 className="text-4xl font-extrabold tracking-wide">{title}</h1>
    </div>
  );
}
