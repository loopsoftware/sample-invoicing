const yQuery = require('./YQuery.js').YQuery;

exports.REST = {
    total: (_args, _content, _serv, _role, _session) => {
        return new Promise((_resolve, _reject) => {
            _session.dbserver.connect("nsC", 'INVOICING', function (_err, _cnx) {
                if (_err) {
                    _reject(_err);
                }

                const query = yQuery.From('invoicing.invoice.lines')
                    .Include('obj.product')
                    .Where('obj.parentObjectId == "' + _args.invoiceID + '"')
                    .Select()
                    .Sum('obj.amount * obj.product.price.amount')
                    .Execute();

                _cnx.find(query).then(_yr => {
                    _resolve({
                        data: _yr.data[0]
                    });
                }).catch(_reject);
            });
        });
    }
};
