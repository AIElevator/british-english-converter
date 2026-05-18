class BritishEnglishConverter {
    constructor() {
        this.spellingMap = {
            'color': 'colour', 'colors': 'colours',
            'honor': 'honour', 'harbor': 'harbour',
            'labor': 'labour', 'neighbor': 'neighbour',
            'organize': 'organise', 'organize': 'organise',
            'realize': 'realise', 'recognize': 'recognise',
            'theater': 'theatre', 'center': 'centre',
            'meter': 'metre', 'traveled': 'travelled'
        };
        
        this.vocabularyMap = {
            'elevator': 'lift', 'apartment': 'flat',
            'truck': 'lorry', 'fall': 'autumn',
            'pants': 'trousers', 'vacation': 'holiday',
            'gas': 'petrol', 'cell phone': 'mobile',
            'cookie': 'biscuit', 'candy': 'sweets'
        };
    }

    convert(text) {
        if (!text || text.trim().length === 0) return '';
        let result = text;
        result = this.applyConversions(result);
        result = this.removeEmojis(result);
        return result;
    }

    applyConversions(text) {
        for (const [us, gb] of Object.entries(this.spellingMap)) {
            const regex = new RegExp(`\b${us}\b`, 'gi');
            text = text.replace(regex, gb);
        }
        for (const [us, gb] of Object.entries(this.vocabularyMap)) {
            const regex = new RegExp(`\b${us}\b`, 'gi');
            text = text.replace(regex, gb);
        }
        return text;
    }

    removeEmojis(text) {
        return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]/gu, '').trim();
    }
}

const converter = new BritishEnglishConverter();
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');

convertBtn?.addEventListener('click', () => {
    outputText.value = converter.convert(inputText.value);
});

clearBtn?.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    inputText.focus();
});

copyBtn?.addEventListener('click', () => {
    if (outputText.value) {
        navigator.clipboard.writeText(outputText.value).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy to clipboard'; }, 2000);
        });
    }
});
