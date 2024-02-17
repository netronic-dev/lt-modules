export function formatPhoneNumberEurope(number) {
    let newNum = number
        .replace(/[^\d]+/g, "")
        .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5");
    return newNum;
}

export function formatPhoneNumberUsa(number) {
    let newNum = number
        .replace(/[^\d]+/g, "")
        .replace(/(\d{1})(\d{3})(\d{3})(\d{3})(\d{3})/, "+$1 ($2) $3-$4-$5");
    return newNum;
}
