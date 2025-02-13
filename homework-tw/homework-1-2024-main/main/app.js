const compress = (a, b = true) => {
    if (typeof a !== 'string') {
        throw new Error('InvalidType');
    }
    if (b) {
        let result = '';
        let count = 1;

        for (let i = 0; i < a.length; i++) {
            if (a[i] === a[i + 1]) {
                count++;
            } else {
                result += a[i] + count;
                count = 1; 
            }
        }
        return result;
    } else {
        let result = '';
        let i = 0;

        while (i < a.length) {
            const char = a[i];
            let countStr = '';

            i++;
            while (i < a.length && !isNaN(a[i])) {
                countStr += a[i];
                i++;
            }
            result += char.repeat(parseInt(countStr, 10));
        }
        return result;
    }
};

module.exports = compress;
