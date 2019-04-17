ypnUi.define('Home', {
    extend: 'yupana.panel.Panel'
});


ypn.onready((_callback) => {
    YContext.on("packageready", function (_err) {
        console.log("simple package ready");
        console.log("packageready");
        if (_err) {
            console.error(_err.message);
            return;
        }
        YContext.on("connectionsready", () => {
            YContext.emit('contextready');
        });

        session.dbserver.connect("simple", "simple").then( () => {
            session.defaultConnection = 'simple';
            YContext.emit("connectionsready");
        })
        .catch(err => {
            console.error('failled to get the connection', err);
        })
    });
    _callback(null);
});
