import { User } from '@types';

const capitalizeFirstLetter = (word: string | undefined) => {
    if (!word) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
};

// Function to read a specific cookie by name
const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
};

export default { capitalizeFirstLetter, getCookie };
