

export function decimetersToFeetIn(decimeter) {
    const meters = decimeter / 10
    const total_feet = meters * 3.28084;
    const feet = Math.floor(total_feet); 
    const inches = Math.round((total_feet - feet) * 12);
    return `${feet} feet ${inches} inches`;
}
