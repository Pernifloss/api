export default class TinyText {
    private alphabet: string;
    private tinyAlphabet: string;
    private special: string;
    private tinySpecial: string;

    constructor() {
        this.alphabet = "abcdefghijklmnopqrstuvwxyz0123456789-";
        this.tinyAlphabet = "ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹⁻";
        this.special = "éèêëàâäûüù";
        this.tinySpecial = "ᵉᵉᵉᵉᵃᵃᵃᵘᵘᵘ";
    }

    getTinyLetter(letter): string {
        const l = letter.toLowerCase();

        let index = this.alphabet.split('').findIndex(al => al === l);
        if (index > -1) return this.tinyAlphabet.charAt(index);

        index = this.special.split('').findIndex(al => al === l);
        if (index > -1) return this.tinySpecial.charAt(index);
        return l;
    }

    tiny(text): string {
        return text
            .split('')
            .map(l => this.getTinyLetter(l))
            .join('');
    }

    isTiny(text): boolean {
        return text
            .split('')
            .every(l => this.tinyAlphabet.includes(l) || l === " ");
    }

    hasTinyness(text): boolean {
        return !!text.split('').find(l => this.tinyAlphabet.includes(l));
    }

    getNormalLetter(letter): string {
        if (!!this.special.split('').find(sl => sl === letter)) return letter;

        const l = this.getTinyLetter(letter);

        let index = this.tinyAlphabet.split('').findIndex(tl => tl === l);
        if (index > -1) return this.alphabet.charAt(index);

        return l;
    }

    normalSize(text): string {
        return text
            .split('')
            .map(l => this.getNormalLetter(l))
            .join('');
    }
}
