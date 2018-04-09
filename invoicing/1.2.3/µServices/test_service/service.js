"use strict";

const {YNotificationData} = require("./framework/server/lib/notifications/YNotificationData.js");
const {YEvent} = require("./framework/server/lib/notifications/YEvent.js");

exports.oninitServiceFabric = function(serv) {
    serv.service.registerTask("test emit event", 30, (server, role, session) => {
        return emitEvent(server, role, session);
    });

    // return Promise.resolve();
}

function emitEvent(server, role, session) {
    const subject = "µService Notification";
    const body = "This is an example notification for an event emitted from a micro-service.";
    const tag = "µservice";
    const priority = "medium";
    const icon = "/notification-icon.png";
    const iconCls = null;
    const label = "Ok";
    const action = "function(args){console.log('>>> ' + args.testArgs)}";
    const args = {testArgs: "test arguments"};
    const notificationData = new YNotificationData(subject, body, tag, priority, icon, iconCls, label, action, args);

    const recipients = {userIds: ["eace59be-792e-4aad-8dfb-43f4e12bafee"]};
    const timestamp = Date.now();
    const validation = null;
    const linkedEvent = null;
    const session = session;
    const event = new YEvent(recipients, session, timestamp, notificationData, validation, linkedEvent);

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

exports.emitEvent = emitEvent;
