import {GameBoard} from "@/app/components/GameBoard";
import {fetchAllWordsAction, fetchWordAction} from "@/app/api/v1/words/actions.";

export default async function Home() {
    
 const word = await fetchWordAction()
    const allWords = await fetchAllWordsAction();

  return <main>
      <div className="w-full p-4">
          <p>Word is : {word}</p>
          <GameBoard allWords={allWords} word={word} />
      </div>
  </main>;
}
