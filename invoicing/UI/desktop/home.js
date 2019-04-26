ypnUi.define('Home', {
    extend: 'yupana.panel.Panel'
});

ypn.onready((_callback) => {
    YContext.on("packageready", function (_err) {
        if (_err) {
            console.error(_err.message);
            return;
        }

        YContext.on("connectionsready", () => {
            //fixme: emit contextready to trigger currency loader
            //YContext.emit('contextready');
        });

        session.dbserver.connect("nsC", "INVOICING").then( () => {
            // session.defaultConnection = 'nsC';
            YContext.emit("connectionsready");
        })
        .catch(err => {
            console.error('failled to get the connection', err);
        })
    });
    _callback(null);
});
