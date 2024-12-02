import * as fs from 'fs';

function readWordsFromFile(): string[] {
    const filePath = 'words.json';
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const words = JSON.parse(fileContent);
    return words.words;
}

export const fetchWordAction = async () => {
    const wordList = readWordsFromFile();
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return  wordList[randomIndex];
};

export const fetchAllWordsAction = async () => {
    const wordList = readWordsFromFile();
    return wordList;
};