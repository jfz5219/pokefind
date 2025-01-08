export function decagramsToPounds(decagrams) {
    const kilograms = decagrams/10
    const pounds = (kilograms* 2.205).toFixed(1)
    return `${pounds} lbs`
}
