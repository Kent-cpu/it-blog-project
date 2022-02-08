
// создает массив всевозможных словосочетаний по тексту
// Пример "Ищи меня" => ["и", "ищ", "ищи" , "ищи м" и т.д.]
const createPhrasesByText = text => {
    const lowerTitle = text.toLowerCase();
    const result = [];

    for (let i = 0; i < lowerTitle.length; ++i) {
        let prevKey = "";
        for (let j = i; j < lowerTitle.length; ++j) {
            prevKey += lowerTitle[j];
            result.push(prevKey);
        }
    }

    return result;
}

export default createPhrasesByText;