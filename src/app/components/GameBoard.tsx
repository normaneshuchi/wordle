"use client";

import {FC, useEffect, useMemo, useState} from "react";
import {Word} from "@/app/components/Word";

type Props = {
    word: string
    allWords: string[]
}

export const GameBoard: FC<Props> = ({word, allWords}) => {

    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''));

    const onReset = () => {
        window.location.reload();
    }

    const handleGuess = (guess: string, index: number) => {
        if(guesses[index] === guess) return;
        const newGuesses = [...guesses];
        newGuesses[index] = guess;
        setGuesses(newGuesses);
        const isWord = allWords.some((w) => w.toLowerCase() === guess.toLowerCase());
        if (!isWord) {
            alert('Not a valid word');
            return;
        };
        if(guess.toLowerCase() === word.toLowerCase()) {
            if(confirm('You Won! Play Again?')) {
                window.location.reload();
            }
        }
        const cleanGuesses = newGuesses.filter((g) => g !== '');
        if(cleanGuesses.length === 6) {
            if(confirm('You Lost! Play Again?')) {
                window.location.reload();
            }
        }
    };



    return (
        <div className="w-full flex flex-col md:w-3/5 p-4 mx-auto bg-white rounded-lg">
            {/*overlay with game stats*/}
            <h2 className="text-4xl uppercase font-bold text-center p-4">Wordle</h2>
            {Array(6).fill("_").map((_,i) => (
                <Word onSubmitGuess={handleGuess} guess={guesses[i]} index={i} key={`word-${i}`} word={word}/>
            ))}
            <button onClick={onReset} className=" p-4 bg-red-500 w-2/5 mx-auto mt-4 text-white font-bold rounded-lg">Restart Game</button>

        </div>
    )
}