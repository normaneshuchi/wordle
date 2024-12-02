import {ChangeEvent, FC, useEffect, useRef, useState} from "react";

type InputProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    color: string;
    value?: string;
    index: number;
    id: string;
    onSubmit: () => void;
    hasSubmitted: boolean;
}
export const InputBox: FC<InputProps> = ({onChange, color, value = '', index, id, onSubmit}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onSubmit();
            }
        };

        if (inputRef.current) {
            inputRef.current.addEventListener('keyup', handleKeyUp);
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keyup', handleKeyUp);
            }
        };
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange(e, index);
    }
    return (
        <div
            className={`flex ${color} items-center gap-2  rounded-md px-2 py-1 text-center bg-white`}>
            <input max={1} maxLength={1} ref={inputRef} id={id} value={inputValue}
                   onChange={handleChange}
                   className={`text-center ${color} max-w-20 min-h-20 border 
                   border-gray-300 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 font-bold uppercase `}/>
        </div>
    )
}