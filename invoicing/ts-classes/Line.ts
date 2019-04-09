import {YLine} from "invoicing";
import {YTmoney} from "yupana/YClass";

export class Line extends YLine {
    cGetTotal(): number {
        const price = this.product.price as YTmoney;
        const amount = this.amount;

        const total = price.amount * amount;
        return total;
    }
}
