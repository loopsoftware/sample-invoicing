// v2.5 - typescript

import {YModel} from "simple";

export class Model extends YModel {
    cGetContent() {
       return `${this.title}(${this.description})`
    }
}
