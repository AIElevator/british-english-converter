class BritishEnglishConverter {
    constructor() {
        // Spelling patterns: American → British
        this.spellingPatterns = [
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
            { pattern: /\bcenter(s|ed|ing)?\b/gi, replacement: 'centre$1' },
            { pattern: /\btheater(s|ical)?\b/gi, replacement: 'theatre$1' },
            { pattern: /\bmeter(s|ing)?\b/gi, replacement: 'metre$1' },
            { pattern: /\bfiber(s|glass|optic)?\b/gi, replacement: 'fibre$1' },
            { pattern: /\bliter(s)?\b/gi, replacement: 'litre$1' },
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

        // Vocabulary: American → British
        this.vocabularyMap = {
            'elevator': 'lift', 'elevators': 'lifts',
            'apartment': 'flat', 'apartments': 'flats',
            'truck': 'lorry', 'trucks': 'lorries',
            'fall': 'autumn', 'pants': 'trousers',
            'mom': 'mum', 'moms': 'mums', 'mom\'s': 'mum\'s',
            'soccer': 'football', 'vacation': 'holiday', 'vacations': 'holidays',
            'gas': 'petrol', 'garbage': 'rubbish', 'trash': 'rubbish',
            'sidewalk': 'pavement', 'bathroom': 'toilet', 'bathrooms': 'toilets',
            'check': 'cheque', 'checks': 'cheques',
            'cell phone': 'mobile phone', 'cellphone': 'mobile', 'cell': 'mobile',
            'cookie': 'biscuit', 'cookies': 'biscuits', 'candy': 'sweets',
            'condo': 'flat', 'condos': 'flats',
            'donut': 'doughnut', 'donuts': 'doughnuts',
            'eggplant': 'aubergine', 'zucchini': 'courgette', 'zucchinis': 'courgettes',
            'math': 'maths', 'gotten': 'got',
        };

        // Banned phrases to remove
        this.bannedPhrases = [
            /\bit is important to note that\b/gi,
            /\bno discussion would be complete without\b/gi,
            /\bneedless to say[,.]?\b/gi,
            /\breally unique\b/gi,
            /\bmore unique\b/gi,
            /\bvery unique\b/gi,
            /\breach out\b/gi,
            /\bgame changing\b/gi,
            /\bgame-changing\b/gi,
            /\bcutting edge\b/gi,
            /\btransformative\b/gi,
            /\barguably\b/gi,
            /\bit could be said that\b/gi,
        ];

        // Collective nouns that should be plural
        this.collectiveNouns = [
            'team', 'group', 'committee', 'board', 'staff', 'company', 'organisation',
            'government', 'department', 'council', 'parliament', 'assembly', 'class',
            'jury', 'crew', 'squad', 'panel', 'audience', 'choir', 'cast', 'band'
        ];
    }

    convert(text) {
        if (!text || text.trim().length === 0) return '';

        let result = text;

        // 1. Apply spelling patterns
        for (const pattern of this.spellingPatterns) {
            result = result.replace(pattern.pattern, pattern.replacement);
        }

        // 2. Apply vocabulary replacements (case-preserving)
        for (const [american, british] of Object.entries(this.vocabularyMap)) {
            const regex = new RegExp(`\\b${american}\\b`, 'gi');
            result = result.replace(regex, (match) => {
                if (match[0] === match[0].toUpperCase() && match.length > 1) {
                    return british.charAt(0).toUpperCase() + british.slice(1);
                }
                return british;
            });
        }

        // 3. Remove banned phrases
        for (const pattern of this.bannedPhrases) {
            result = result.replace(pattern, '');
        }

        // 4. Fix "reach out" → "get in touch"
        result = result.replace(/\breach\s+out\b/gi, 'get in touch');

        // 5. Fix fewer vs less
        result = this.fixFewerLess(result);

        // 6. Remove Oxford commas (comma before 'and' in lists)
        result = result.replace(/,\s+and\b/g, ' and');

        // 7. Fix quotation marks: " → ' (double to single)
        result = this.fixQuotationMarks(result);

        // 8. Fix dashes used as pause punctuation
        result = this.fixDashPunctuation(result);

        // 9. Ensure single space after full stops
        result = result.replace(/([.!?])\s{2,}/g, '$1 ');

        // 10. Fix collective noun verbs (the team is → the team are)
        result = this.fixCollectiveNouns(result);

        // 11. Fix apostrophes in plurals (remove apostrophes from 1980's, CEO's, etc.)
        result = this.fixPluralApostrophes(result);

        // 12. Remove emojis
        result = result.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]/gu, '').trim();

        // 13. Clean up extra spaces
        result = result.replace(/\s{2,}/g, ' ').trim();

        return result;
    }

    fixFewerLess(text) {
        // fewer for countable: enquiries, leads, items, people, things, instances
        const countableNouns = ['enquiries', 'leads', 'items', 'people', 'things', 'instances', 'students', 'customers', 'employees', 'errors', 'mistakes', 'issues'];
        for (const noun of countableNouns) {
            text = text.replace(new RegExp(`\\bless\\s+${noun}\\b`, 'gi'), `fewer ${noun}`);
        }
        return text;
    }

    fixQuotationMarks(text) {
        // Convert double quotes to single quotes
        return text.replace(/"/g, "'");
    }

    fixDashPunctuation(text) {
        // Remove em dashes and en dashes used as pauses (replace with commas)
        // Keep dashes only in ranges like "5–10" or "2019–2024"
        text = text.replace(/\s+[–—]\s+/g, ', ');
        return text;
    }

    fixCollectiveNouns(text) {
        for (const noun of this.collectiveNouns) {
            // Fix "the [noun] is" → "the [noun] are"
            const regex = new RegExp(`\\bthe\\s+${noun}\\s+is\\b`, 'gi');
            text = text.replace(regex, `the ${noun} are`);

            // Fix "the [noun] has" → "the [noun] have"
            const hasRegex = new RegExp(`\\bthe\\s+${noun}\\s+has\\b`, 'gi');
            text = text.replace(hasRegex, `the ${noun} have`);

            // Fix "[Noun] is" → "[Noun] are" (for proper nouns like "ALS Industrial is")
            const propRegex = new RegExp(`\\b${noun}\\s+is\\b`, 'gi');
            text = text.replace(propRegex, `${noun} are`);
        }
        return text;
    }

    fixPluralApostrophes(text) {
        // Remove apostrophes from plurals: 1980's → 1980s, CEO's → CEOs, UFO's → UFOs
        text = text.replace(/(\d+)'s\b/g, '$1s');
        text = text.replace(/([A-Z]{2,})'s\b/g, '$1s');
        return text;
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

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(outputText.value).then(() => {
                    copyBtn.textContent = 'Copied!';
                    copyBtn.style.backgroundColor = '#4caf50';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to clipboard';
                        copyBtn.style.backgroundColor = '';
                    }, 2000);
                }).catch(() => fallbackCopy());
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
                    }
                } catch (err) {
                    alert('Could not copy. Please select and copy manually from the output field.');
                }
            }
        });
    }
});
