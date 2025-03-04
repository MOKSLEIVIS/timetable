export function translateToLithuanian(word) {
    const wordDict = {
        "english": "Anglų kalba",
        "biology": "Biologija",
        "chemistry": "Chemija",
        "art": "Dailė",
        "ethics": "Etika",
        "physical-education": "Fizinis ugdymas",
        "physics": "Fizika",
        "geography": "Geografija",
        "it": "Informatika",
        "history": "Istorija",
        "javascript": "Javascript",
        "music": "Muzika",
        "basics-of-citizenship": "Pilietiškumo pagrindai",
        "computer-systems": "Programavimo aplinkos ir kūrimo procesų valdymas",
        "lithuanian": "Lietuvių kalba",
        "math": "Matematika",
        "russian": "Rusų kalba",
        "german": "Vokiečių kalba"
    }

    return wordDict[word];
}