import {Service} from "@yupana/framework-service-types";
import {YContext} from "@yupana/framework-types/lib/YContext";
import {YRole} from "@yupana/framework-types/lib/YRoles";
import {YSession} from "@yupana/framework-types/lib/YSessions";
import {YLog, YQuery} from "@yupana/framework-types";
import {Model} from "../../simple/ts-classes/model";

async function worker(serv: YContext<Service>, role: YRole, session: YSession) {
    console.log(">>> worker >>> about to fetch data ...");

    const cnx = await session.dbserver.connect("simple", 'simple');
    const query = YQuery.From('simple.model')
                .Select()
                .Execute();
    const result = await cnx.find(query);
    const m:Model = await role.simple.createClass("model");
    let data = await result.iterator.next();
    while(data) {
        m.setData(data);
        YLog.info(m.cGetContent());
        data = await result.iterator.next();
    }
}

async function main(serv: YContext<Service>, role: YRole, session: YSession) {
    if (!serv.service) {
        throw new Error("No service defined");
    }

    console.log(">>> oninitService >>> about to register task...");
    serv.service.registerTask(
        "TestEmitEvent",
        3600,
        async (server: YContext<Service>, role: YRole, session: YSession) => {
            console.log(">>> oninitService > task callback >>> about to call worker...");
            await worker(serv, role, session);
        },
        120
    );

    console.log(">>> oninitService >>> done registering task.");
}

exports.oninitService = main;
