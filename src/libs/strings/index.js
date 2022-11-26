exports.validFullname = function(input) {
    input = input.trim().split(/[ ]{1,}/);
    let valid = "";
    for(let i = 0; i < input.length; i++) {
        valid += input[i].charAt(0).toUpperCase() + input[i].slice(1).toLowerCase() + " ";
    }
    return valid.trim();
}