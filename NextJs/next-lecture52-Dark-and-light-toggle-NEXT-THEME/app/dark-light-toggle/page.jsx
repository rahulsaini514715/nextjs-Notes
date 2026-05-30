import ThemeToggle from "./components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Next Themes Toggle</h1>
      <ThemeToggle />
    </main>
  );
}
