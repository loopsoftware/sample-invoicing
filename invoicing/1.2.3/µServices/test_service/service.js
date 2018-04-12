"use strict";

const {YNotificationData} = require("./framework/server/lib/notifications/YNotificationData.js");
const {YEvent} = require("./framework/server/lib/notifications/YEvent.js");

exports.oninitServiceFabric = function(serv) {
    serv.service.registerTask("test emit event", 60, (server, role, session) => {
        return emitEvent(server, role, session);
    }, 120);
}

function emitEvent(server, role, session) {
    const data = YNotificationData.fromJSON({
        subject: "µService Notification",
        body: "This is an example notification for an event emitted from a micro-service.",
        tag: "µservice",
        priority: "medium",
        icon: "/notification-icon.png",
        iconCls: null,
        label: "Ok",
        action: "",
        args: {}
    });

    const event = new YEvent({userIds: ["eace59be-792e-4aad-8dfb-43f4e12bafee"]}, session, Date.now().toISOString(), data, null, null);

    return event.emit()
        .then(result => {
            console.log(JSON.stringify(result));
        }, error => {
            console.warning(`Something not good happened: ${error.message}`);
        })
        .catch(error => {
            console.error(`Something bad happened: ${error.message}`)

            error.critical = false;
            throw error;
        });
}
