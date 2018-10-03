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
        example: "/invoicing/slow/slow?time=120  =>  {success: true, time: 120}"
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
    }
};
