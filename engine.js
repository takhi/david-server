function getwordArray(word) {
    let wordArray = [];
    for (let i = 0; i < word.length; i++) {
        wordArray.push(word[i]); 
    }
    return wordArray;
}

function David(letters, dictionary) {
    let results = [];
        let wordArray = [];
        let index = 0;
        for (let word of dictionary) {
            wordArray = getwordArray(word);
            for (let k = 0; k < letters.length; k++) {
                if (wordArray.length > (letters.length - k)) break;
                if ((index = wordArray.indexOf(letters[k])) >= 0) {
                    wordArray.splice(index, 1);
                    if (wordArray.length === 0) {
                        results.push(word);
                        break;
                    }
                }
            }
        }
    return results;
}

module.exports = David;