ypnUi.define('Home', {
    extend: 'yupana.panel.Panel'
});

ypn.onready((_callback) => {
    YContext.on("packageready", function (_err) {
        console.log("advanced package ready");
        if (_err) {
            console.error(_err.message);
            return;
        }
        YContext.on("connectionsready", () => {
            YContext.emit('contextready');
        });
    });
    _callback(null);
});
