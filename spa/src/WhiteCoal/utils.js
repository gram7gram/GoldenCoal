export function cid(length = 5) {
    return Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, length);
}

//Do not use "() => {}"
String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
}