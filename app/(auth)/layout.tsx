import { Logo } from "./_components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center flex-col space-y-6">
      <Logo />
      {children}
    </div>
  );
}
