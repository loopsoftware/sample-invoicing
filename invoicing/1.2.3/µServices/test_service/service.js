"use strict";

const {YNotificationData} = require("./framework/server/lib/notifications/YNotificationData.js");
const {YEvent} = require("./framework/server/lib/notifications/YEvent.js");

exports.oninitServiceFabric = function(serv) {
    console.log(">>> oninitServiceFabric >>> about to register task...");

    serv.service.registerTask("TestEmitEvent", 60, (server, role, session) => {
        console.log(">>> oninitServiceFabric > task callback >>> about to call emit event...");

        return emitEvent(server, role, session);
    }, 120);

    console.log(">>> oninitServiceFabric >>> done registering task.");

    return Promise.resolve();
}

function emitEvent(server, role, session) {
    console.log(">>> emitEvent >>> about to emit event...");

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

    console.log(`>>> emitEvent >>> created notification data object... ${data.toJSON()}`);

    const event = new YEvent({userIds: ["eace59be-792e-4aad-8dfb-43f4e12bafee"]}, session, new Date().toISOString(), data, null, null);

    console.log(`>>> emitEvent >>> created event object... ${event.toJSON()}`);

    console.log(">>> emitEvent >>> emitting event...");

    return event.emit()
        .then(result => {
            console.log(">>> emitEvent > emit().then() >>> emitted event...");

            console.log(`>>> emitEvent > emit().then() resolve >>> result: ${JSON.stringify(result)}`);
        }, error => {
            console.log(`>>> emitEvent > emit().then() reject >>> something not good happened: ${error.message}`);
        })
        .catch(error => {
            console.log(`>>> emitEvent > emit().then() catch >>> something bad happened: ${error.message}`);

            error.critical = false;
            throw error;
        });
}
