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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const converter = new BritishEnglishConverter();
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Debug: Log if elements are found
    console.log('Elements loaded:', { inputText: !!inputText, outputText: !!outputText, convertBtn: !!convertBtn });

    // Allow text input and pasting
    if (inputText) {
        inputText.addEventListener('paste', (e) => {
            console.log('Paste event detected');
            // Allow paste to happen naturally
        });

        inputText.addEventListener('input', (e) => {
            console.log('Input event detected, value:', e.target.value.substring(0, 20));
        });
    }

    // Convert button
    if (convertBtn) {
        convertBtn.addEventListener('click', () => {
            const input = inputText?.value || '';
            const output = converter.convert(input);
            if (outputText) outputText.value = output;
        });
    }

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (inputText) inputText.focus();
        });
    }

    // Copy button
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            if (outputText?.value) {
                navigator.clipboard.writeText(outputText.value).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => { copyBtn.textContent = 'Copy to clipboard'; }, 2000);
                }).catch(err => {
                    console.error('Copy failed:', err);
                    alert('Failed to copy. Please try manually.');
                });
            }
        });
    }
});
