// Truthy 값과 Falsy 값

function isValid(string) {
    return !!string
}

isValid('') // false
isValid('valid text') // true
