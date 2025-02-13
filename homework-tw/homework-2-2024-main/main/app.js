/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values){
    if (typeof input !== 'object' || input === null || typeof values !== 'object' || values === null) {
        throw new Error('InvalidType');
    }
    if (Object.keys(input).length === 0) {
        return '';
    }

    function renderTag(obj) {
        if (typeof obj === 'string') {
            return obj.replace(/\$\{(\w+)\}/g, (_, key) => values[key] || '');
        } else if (typeof obj === 'object' && obj !== null) {
            return Object.entries(obj)
                .map(([tag, content]) => `<${tag}>${renderTag(content)}</${tag}>`)
                .join('');
        }
        return '';
    }
    return renderTag(input);
}

module.exports = {
    render
}