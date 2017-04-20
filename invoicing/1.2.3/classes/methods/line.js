/*
line.prototype.cGetIndex = () => {
    debugger;
    var itself = this;
    var index = Math.trunc(Math.random() * 1000);
    return index;
}
*/

line.prototype.cGetTotal = function() {
    var line = this;
    var price = line.product.price;
    var amount = line.amount

    var total = price.amount * amount;
    return total;
}
