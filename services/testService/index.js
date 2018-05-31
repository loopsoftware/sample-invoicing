/*
   Copyright 2016 Yupana systems, Inc
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
'use strict';

const {YNotificationData} = require("./framework/server/lib/notifications/YNotificationData.js");
const {YEvent} = require("./framework/server/lib/notifications/YEvent.js");

/* eslint-disable no-console */

function emitEvent(server, role, session) {
    console.log(">>> emitEvent >>> about to emit event...");

    const data = YNotificationData.fromJSON({
        subject: "µService Notification",
        // subject: "µService Room Notification",
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

    const recipients = {userIds: ["eace59be-792e-4aad-8dfb-43f4e12bafee"]};
    // const recipients = { room: {name: "testing", exclusion: [] }};
    const event = new YEvent(recipients, session, new Date().toISOString(), data, null, null);

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

exports.oninitService = function (serv, role, session) {
    const tes = new role.invoicing.invoice();
    console.log(">>> oninitService >>> about to register task...");

    serv.service.registerTask("TestEmitEvent", 3600, (server, role, session) => {
        console.log(">>> oninitService > task callback >>> about to call emit event...");

        return emitEvent(server, role, session);
    }, 120);

    console.log(">>> oninitService >>> done registering task.");

    return Promise.resolve();
};