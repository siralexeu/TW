const rle = (input, compress = true) => {
    if (typeof input !== 'string') {
        throw new Error('InvalidType');
    }

    if (compress) {
        if (input.length === 0) {
            return '';
        }
        let result = '';
        let count = 1;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === input[i + 1]) {
                count++;
            } else {
                result += input[i] + count;
                count = 1; 
            }
        }
        
        return result; 
    } else {
        let result = '';
        let i = 0;

        while (i < input.length) {
            const char = input[i];
            let countStr = '';

            i++;
            while (i < input.length && !isNaN(input[i])) {
                countStr += input[i];
                i++;
            }
            result += char.repeat(parseInt(countStr, 10));
        }
        return result; 
    }
};

module.exports = rle;
