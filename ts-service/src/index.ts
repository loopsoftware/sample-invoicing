import yupana from "@yupana/core-lib-poc";
// import { notify } from "./utils";

// const yupana = require("@yupana/core-lib-poc");1

function notify(message: string, ...objs: any[]) {
    const baseMsg = "FROM TS-SERVICE: ";

    console.log(`${baseMsg}${message}`);

    objs.forEach(obj => {
        console.log(JSON.stringify(obj, null, 2));
    });
}

async function main(serv: any, role: any, session: any) {
    notify("I'm working");
    const yuser = yupana.YUser;

    const newUser = await yuser.create({
        userLogin: "rick@sanchez.morty",
        password: "1234",
        issuedBy: "me",
        session,
    });

    notify("created a user", newUser);

    const bob = await newUser.read({}, "ab12d6e4-7ce8-48a9-a570-5c636b4c073b", undefined);

    notify("got bob", bob);

    process.exit(0);
}

exports.oninitService = main;
