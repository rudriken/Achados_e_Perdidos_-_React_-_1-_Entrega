const ServicoFormatador = {
    transformarString: (cadeia: string) => {
        var comDiacritico = [
            "â",
            "Â",
            "à",
            "À",
            "á",
            "Á",
            "ã",
            "Ã",
            "ê",
            "Ê",
            "è",
            "È",
            "é",
            "É",
            "î",
            "Î",
            "ì",
            "Ì",
            "í",
            "Í",
            "õ",
            "Õ",
            "ô",
            "Ô",
            "ò",
            "Ò",
            "ó",
            "Ó",
            "ü",
            "Ü",
            "û",
            "Û",
            "ú",
            "Ú",
            "ù",
            "Ù",
            "ç",
            "Ç",
        ];

        var semDiacritico = [
            "a",
            "A",
            "a",
            "A",
            "a",
            "A",
            "a",
            "A",
            "e",
            "E",
            "e",
            "E",
            "e",
            "E",
            "i",
            "I",
            "i",
            "I",
            "i",
            "I",
            "o",
            "O",
            "o",
            "O",
            "o",
            "O",
            "o",
            "O",
            "u",
            "U",
            "u",
            "U",
            "u",
            "U",
            "u",
            "U",
            "c",
            "C",
        ];

        var stringTransformada = "";
        for (let c = 0; c < cadeia.length; c++) {
            if (cadeia[c] in comDiacritico) {
                let posicao = comDiacritico.indexOf(cadeia[c]);
                let caractere = semDiacritico[posicao];
                stringTransformada += caractere;
            } else if (cadeia[c] === " ") {
                stringTransformada += "-";
            } else {
                stringTransformada += cadeia[c];
            }
        }
        return stringTransformada.toLowerCase();
    },
};

export default ServicoFormatador;