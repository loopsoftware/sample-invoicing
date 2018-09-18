ypnUi.define('Home', {
    extend: 'yupana.panel.Panel'
});

ypn.onready((_callback) => {
    YContext.on("packageready", function (_err) {
        // debugger;
        if (_err)
            console.error(_err.message);
        else
            session.dbserver.connect("nsC", 'INVOICING', function (_err, _cnx) {
                if (_err) console.error('failled to get the connection');
                else {
                    YContext.emit("connectionsready");
                    session.defaultConnection = 'nsC';
                }
            });
    });
    _callback(null);
});
