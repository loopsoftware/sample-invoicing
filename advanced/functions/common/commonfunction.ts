import {PackWeight} from "../../ts-classes/packWeight";

export class Scales {
    static toKg: { (value: number): number } [] = [
        (value: number) => {
            throw new Error ("Unsupported unit")
        },
        (value: number) => { // g
            return value * 1000
        },
        (value: number) => { // kg
            return value
        },
        (value: number) => { // oz
            return value / 35.274
        },
        (value: number) => { // lbs
            return value / 2.205
        },
        (value: number) => { // st
            return value * 6.35
        },
        (value: number) => { // t
            return value * 1000
        }
    ];

    static weight(weight: PackWeight): number {
        if (weight.unit >= this.toKg.length) {
            throw new Error ("Unsupported unit");
        }
        return this.toKg[weight.unit](weight.value);
    }
}
