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
            if (!outputText?.value) {
                alert('No text to copy. Please convert some text first.');
                return;
            }

            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(outputText.value).then(() => {
                    console.log('Text copied successfully');
                    copyBtn.textContent = 'Copied!';
                    copyBtn.style.backgroundColor = '#4caf50';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to clipboard';
                        copyBtn.style.backgroundColor = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Clipboard API failed:', err);
                    fallbackCopy();
                });
            } else {
                // Fallback for older browsers
                fallbackCopy();
            }

            function fallbackCopy() {
                try {
                    // Select the text
                    outputText.select();
                    outputText.setSelectionRange(0, 99999);

                    // Copy using deprecated method
                    const successful = document.execCommand('copy');

                    if (successful) {
                        console.log('Text copied via fallback method');
                        copyBtn.textContent = 'Copied!';
                        copyBtn.style.backgroundColor = '#4caf50';
                        setTimeout(() => {
                            copyBtn.textContent = 'Copy to clipboard';
                            copyBtn.style.backgroundColor = '';
                        }, 2000);
                    } else {
                        throw new Error('execCommand failed');
                    }
                } catch (err) {
                    console.error('Fallback copy failed:', err);
                    alert('Could not copy. Please select and copy manually from the output field.');
                }
            }
        });
    }
});
