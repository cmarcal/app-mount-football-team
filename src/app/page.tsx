import GenerateField from "./components/generateField";

export default function Home() {

  return (
    <main className="flex h-full flex-col justify-center items-center gap-y-16 p-8">
      <h1 className="text-xl">App para simplificar seu fute </h1>

      <GenerateField />
    </main>
  )
}
