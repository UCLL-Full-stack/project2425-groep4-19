import { User } from '@types';

const capitalizeFirstLetter = (word: string | undefined) => {
    if (!word) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export default { capitalizeFirstLetter };
