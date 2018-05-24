"use strict";

const {YNotificationData} = require("./notifications/YNotificationData.js");
const {YEvent} = require("./notifications/YEvent.js");

exports.REST = {
    $total: {
        module: "invoicing",
        name: "notify",
        scope: "public",
        description: "sends out a notification",
        restricted: false,
        args: [
            {
                name: "userId",
                type: "string",
                mandatory: false,
                description: "the uuid of the user to receive the notification; this or roomId must be provided"
            },
            {
                name: "roomName",
                type: "string",
                mandatory: false,
                description: "the name the room to receive the notification; this or userId must be provided"
            },
            {name: "message", type: "string", mandatory: true, description: "notification message"},
            {name: "target", type: "string", mandatory: false, description: "desktop | mobile; defaults to desktop"}
        ],
        content: [],
        output: "total of the invoice",
        example: "/invoicing/notify/notify?userId={uuid}&message=Testing123&target=desktop  =>  {event id}"
    },
    notify(args, content, serv, role, session) {
        const userId = args.userId;
        const roomName = args.roomName;
        const message = args.message;
        const target = args.target || "desktop"

        if (!userId && !roomId) {
            return Promise.resolve(
                {
                    contentType: "application/json",
                    data: {error: new Error("Must provide userId or roomId as notification recipient.")}
                }
            );
        }

        console.log(">>> emitEvent >>> about to emit event...");

        const data = YNotificationData.fromJSON({
            subject: "Sample Invoicing",
            body: message,
            tag: "sample-invoicing",
            priority: "medium",
            icon: null,
            iconCls: null,
            label: "Ok",
            action: "",
            args: {}
        });

        console.log(`>>> emitEvent >>> created notification data object... ${data.toJSON()}`);

        const recipients = userId ? {userIds: [userId]} : {room: {name: roomName}};
        const event = new YEvent(recipients, session, new Date().toISOString(), data, null, null);

        console.log(`>>> emitEvent >>> created event object... ${event.toJSON()}`);

        console.log(">>> emitEvent >>> emitting event...");

        return event.emit()
            .then(result => {
                console.log(">>> emitEvent > emit().then() >>> emitted event...");
                console.log(`>>> emitEvent > emit().then() resolve >>> result: ${JSON.stringify(result)}`);
                return {contentType: "application/json", data: {id: event.id}};
            }.catch(error => {
                console.log(`>>> emitEvent > emit().then() catch >>> something bad happened: ${error.message}`);
                return {contentType: "application/json", data: {error}};
            });
    }
};
