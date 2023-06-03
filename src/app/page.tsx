import GenerateField from "./components/generateField";

export default function Home() {

  return (
    <main className="bg-[url('../img/home.jpeg')] bg-no-repeat bg-cover flex h-full flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-between text-white h-4/5">
        <h1 className="text-5xl font-semibold tracking-tighter text-center">
          HOJE É DIA <br />
          <span className="text-yellow-500 text-7xl">DE JOGO!</span>
        </h1>
        <GenerateField />
      </div>
    </main>
  )
}
