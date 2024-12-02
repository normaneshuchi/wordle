import {ChangeEvent, FC, useEffect, useMemo, useState} from "react";
import {InputBox} from "@/app/components/InputBox";

type Props = {
    word: string
    index: number
    onSubmitGuess: (guess: string, index:  number) => void
    guess: string
}

const colorGreen = 'bg-green-800';
const colorYellow = 'bg-yellow-500';
const colorGray = 'bg-gray-400';


export const Word: FC<Props> = ({word, index, onSubmitGuess}) => {
    // const splitGuess = guess.split('');
    const [input, setInput] = useState<(string)[]>(Array(5).fill(''));
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const inputColor = useMemo(() => {
        if(!hasSubmitted) return Array(5).fill(colorGray);
        const checkInputColor = (i: number) => {
            if(input[i] === '') return colorGray;
            if (input[i].toLowerCase() === word[i].toLowerCase()) {
                return colorGreen
            }
            if (input[i].toLowerCase() !== word[i].toLowerCase() && word.includes(input[i].toLowerCase())) {
                return colorYellow
            }
            return colorGray;
        }

        const newInputColor = [];
        for (let i = 0; i < 5; i++) {
            newInputColor[i] = checkInputColor(i);
        }
        onSubmitGuess(input.join(''), index);
        
        return newInputColor;
    }, [hasSubmitted, index, input, onSubmitGuess, word]);


    const handleSubmit = () => {
        setHasSubmitted(true);
        
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        const newInput = [...input];
        newInput[i] = e.target.value;
        setInput(() => newInput);
        if (i < 4) {
            document.getElementById(`${index}-input-${i + 1}`)?.focus();
        }
        //if erase head to previous input
        if (e.target.value === '' && i > 0) {
            document.getElementById(`${index}-input-${i - 1}`)?.focus();
        }
    }


    return (
        <div className="w-full  flex items-center justify-center gap-2 mb-3">
            {word.split('').map((letter, i) => {
                return (
                    <InputBox hasSubmitted={hasSubmitted} onSubmit={handleSubmit} id={`${index}-input-${i}`} key={letter + i}
                              value={input[i]}
                              onChange={handleInputChange} color={inputColor[i]} index={i}/>);
            })
            }
        </div>
    )
}