"use strict";

exports.REST = {
    $slow: {
        module: "invoicing",
        name: "slow",
        scope: "public",
        description: "waits some seconds before responding",
        restricted: false,
        args: [
            {
                name: "time",
                type: "number",
                mandatory: false,
                description: "number of seconds to wait; defaults to 60"
            }
        ],
        content: [],
        output: "{success: true, time: 'seconds waited'}",
        example: "/invoicing/slow/slow?time=120  =>  {success: true, time: 120}",
        method: "get"
    },
    slow(args, content, serv, role, session) {
        if (typeof args.time !== "number") {
            args.time = 60;
        }

        const time = Number.parseInt(args.time, 10);

        return new Promise(resolve => {
            setTimeout(() => {
                return resolve({data: {success: true, time}});
            }, time * 1000);
        });
    },

    $slower: {
        module: "invoicing",
        name: "slower",
        scope: "public",
        description: "waits some seconds before responding",
        restricted: false,
        args: [
            {
                name: "time",
                type: "number",
                description: "number of seconds to wait; defaults to 60"
            }
        ],
        content: [
            {
                name: "multi",
                type: "number",
                description: "multiplier; defaults to 1"
            }
        ],
        output: "{success: true, time: 'seconds waited'}",
        example: "/invoicing/slow/slow?time=120  =>  {success: true, time: 120}",
    },
    slower(args, content, serv, role, session) {
        if (typeof args.time !== "number") {
            args.time = 60;
        }

        if (typeof content.multi !== "number") {
            content.multi = 1;
        }

        const time = Number.parseInt(args.time, 10);
        const multi = Number.parseInt(content.multi, 10);

        return new Promise(resolve => {
            setTimeout(() => {
                return resolve({data: {success: true, time: time * multi}});
            }, time * multi * 1000);
        });
    }
};
