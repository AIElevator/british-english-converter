class BritishEnglishConverter {
    constructor() {
        // Comprehensive spelling patterns (American → British)
        // Handles word variations with suffixes
        this.spellingPatterns = [
            // -or → -our words
            { pattern: /\bcolor(s|ed|ing|ful|less|able)?\b/gi, replacement: 'colour$1' },
            { pattern: /\bhonor(s|ed|ing|able)?\b/gi, replacement: 'honour$1' },
            { pattern: /\bharbor(s|ed|ing)?\b/gi, replacement: 'harbour$1' },
            { pattern: /\blabor(s|ed|ing)?\b/gi, replacement: 'labour$1' },
            { pattern: /\bneighbor(s|hood|ing)?\b/gi, replacement: 'neighbour$1' },
            { pattern: /\brumor(s|ed)?\b/gi, replacement: 'rumour$1' },
            { pattern: /\btumor(s)?\b/gi, replacement: 'tumour$1' },
            { pattern: /\bflavor(s|ed|ing|ful)?\b/gi, replacement: 'flavour$1' },
            { pattern: /\barmor(ed)?\b/gi, replacement: 'armour$1' },
            { pattern: /\bbehavior(s|al)?\b/gi, replacement: 'behaviour$1' },
            { pattern: /\bvapor(s|ous)?\b/gi, replacement: 'vapour$1' },
            { pattern: /\bsavior(s)?\b/gi, replacement: 'saviour$1' },
            { pattern: /\bhumor(ous|ist)?\b/gi, replacement: 'humour$1' },

            // -ize → -ise words
            { pattern: /\borganize(s|d|r|ing)?\b/gi, replacement: 'organise$1' },
            { pattern: /\boptimize(s|d|r|ing)?\b/gi, replacement: 'optimise$1' },
            { pattern: /\brealize(s|d|r|ing)?\b/gi, replacement: 'realise$1' },
            { pattern: /\brecognize(s|d|r|ing)?\b/gi, replacement: 'recognise$1' },
            { pattern: /\bemphasize(s|d|r|ing)?\b/gi, replacement: 'emphasise$1' },
            { pattern: /\banalyze(s|d|r|ing)?\b/gi, replacement: 'analyse$1' },
            { pattern: /\bcategorize(s|d|r|ing)?\b/gi, replacement: 'categorise$1' },
            { pattern: /\blegalize(s|d|r|ing)?\b/gi, replacement: 'legalise$1' },
            { pattern: /\bmoraliz(e|es|ed|ing)?\b/gi, replacement: 'moralis$1' },
            { pattern: /\bsummarize(s|d|ing)?\b/gi, replacement: 'summarise$1' },
            { pattern: /\bcharacterize(s|d|ing)?\b/gi, replacement: 'characterise$1' },
            { pattern: /\bprioritize(s|d|ing)?\b/gi, replacement: 'prioritise$1' },

            // -er → -re words
            { pattern: /\bcenter(s|ed|ing)?\b/gi, replacement: 'centre$1' },
            { pattern: /\btheater(s|ical)?\b/gi, replacement: 'theatre$1' },
            { pattern: /\bmeter(s|ing)?\b/gi, replacement: 'metre$1' },
            { pattern: /\bfiber(s|glass|optic)?\b/gi, replacement: 'fibre$1' },
            { pattern: /\bliter(s)?\b/gi, replacement: 'litre$1' },

            // Double consonant before suffix
            { pattern: /\btraveled\b/gi, replacement: 'travelled' },
            { pattern: /\btraveling\b/gi, replacement: 'travelling' },
            { pattern: /\btraveler(s)?\b/gi, replacement: 'traveller$1' },
            { pattern: /\blabeled\b/gi, replacement: 'labelled' },
            { pattern: /\blabeling\b/gi, replacement: 'labelling' },
            { pattern: /\bmodeled\b/gi, replacement: 'modelled' },
            { pattern: /\bmodeling\b/gi, replacement: 'modelling' },
            { pattern: /\bchanneled\b/gi, replacement: 'channelled' },
            { pattern: /\bchanneling\b/gi, replacement: 'channelling' },
            { pattern: /\bcounseled\b/gi, replacement: 'counselled' },
            { pattern: /\bcounseling\b/gi, replacement: 'counselling' },
            { pattern: /\bcounselar\b/gi, replacement: 'counsellor' },
            { pattern: /\bcatalog(s|ed|ing)?\b/gi, replacement: 'catalogue$1' },
            { pattern: /\bdialog(ue)?\b/gi, replacement: 'dialogue' },
        ];

        // Vocabulary replacements (American → British)
        this.vocabularyMap = {
            'elevator': 'lift',
            'elevators': 'lifts',
            'apartment': 'flat',
            'apartments': 'flats',
            'truck': 'lorry',
            'trucks': 'lorries',
            'fall': 'autumn',
            'pants': 'trousers',
            'mom': 'mum',
            'moms': 'mums',
            'mom\'s': 'mum\'s',
            'soccer': 'football',
            'vacation': 'holiday',
            'vacations': 'holidays',
            'gas': 'petrol',
            'garbage': 'rubbish',
            'trash': 'rubbish',
            'sidewalk': 'pavement',
            'bathroom': 'toilet',
            'bathrooms': 'toilets',
            'check': 'cheque',
            'checks': 'cheques',
            'cell phone': 'mobile phone',
            'cellphone': 'mobile',
            'cell': 'mobile',
            'cookie': 'biscuit',
            'cookies': 'biscuits',
            'candy': 'sweets',
            'condo': 'flat',
            'condos': 'flats',
            'automobile': 'car',
            'automobiles': 'cars',
            'movies': 'films',
            'movie': 'film',
            'gotten': 'got',
            'donut': 'doughnut',
            'donuts': 'doughnuts',
            'eggplant': 'aubergine',
            'zucchini': 'courgette',
            'zucchinis': 'courgettes',
            'math': 'maths',
            'school math': 'school maths',
            'a math': 'a maths',
        };
    }

    convert(text) {
        if (!text || text.trim().length === 0) return '';

        let result = text;

        // Apply spelling patterns with word boundary preservation
        for (const pattern of this.spellingPatterns) {
            result = result.replace(pattern.pattern, pattern.replacement);
        }

        // Apply vocabulary replacements (case-preserving)
        for (const [american, british] of Object.entries(this.vocabularyMap)) {
            const regex = new RegExp(`\\b${american}\\b`, 'gi');
            result = result.replace(regex, (match) => {
                // Preserve case
                if (match[0] === match[0].toUpperCase() && match.length > 1) {
                    return british.charAt(0).toUpperCase() + british.slice(1);
                }
                return british;
            });
        }

        // Remove emojis
        result = result.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]/gu, '').trim();

        return result;
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

    console.log('British English Converter initialized');

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

    // Copy button with improved functionality
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            if (!outputText?.value) {
                alert('No text to copy. Please convert some text first.');
                return;
            }

            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(outputText.value).then(() => {
                    copyBtn.textContent = 'Copied!';
                    copyBtn.style.backgroundColor = '#4caf50';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to clipboard';
                        copyBtn.style.backgroundColor = '';
                    }, 2000);
                }).catch(err => {
                    fallbackCopy();
                });
            } else {
                fallbackCopy();
            }

            function fallbackCopy() {
                try {
                    outputText.select();
                    outputText.setSelectionRange(0, 99999);
                    const successful = document.execCommand('copy');

                    if (successful) {
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
                    alert('Could not copy. Please select and copy manually from the output field.');
                }
            }
        });
    }
});
