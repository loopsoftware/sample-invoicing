import {YModel} from "sample-invoicing/simple";

export class Model extends YModel {
    cGetContent() {
       return `${this.title}(${this.description})`
    }
}
