var yQuery = require('./YQuery.js').YQuery;

ypnUi.define("invoicing.productsByPrice", {
    extend: "yupana.view.SimpleList",
    yClassName: "invoicing.product",
    bodyBorder: false,
    border: 0,
    yColumnsVisible: ["name", "price"],
    initComponent: function () {
        var me = this;
        me.callParent();

        var productsByPrice = yQuery.From("invoicing.product").Group("price").SortBy("name").Select().Execute();
        var results = session.connection(session.defaultConnection).find(productsByPrice);
        results.then((result) => {
            result.iterator.forEach(
                // Called for each object in the result set.
                function (err, record, index, records) {
                },
                // Called after all the objects have been iterated.
                function (err, nbItem) {
                }
            );
        });
    }
}
);
