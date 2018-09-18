"use strict";

const yQuery = require('./YQuery.js').YQuery;

exports.REST = {
    total: (_args, _content, _serv, _role, _session) => {
        return _session.dbserver.connect("nsC", 'INVOICING')
            .then(function (_cnx) {
                const query = yQuery.From('invoicing.invoice.lines')
                    .Include('obj.product')
                    .Where('obj.parentObjectId == "' + _args.invoiceID + '"')
                    .Select()
                    .Sum('obj.amount * obj.product.price.amount')
                    .Execute();

                return _cnx.find(query)
                    .then(function (_yr) {
                        return {data: _yr.data[0]};
                    });
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
};
