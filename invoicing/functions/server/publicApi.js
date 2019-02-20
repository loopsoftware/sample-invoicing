"use strict";

exports.REST = {
    $initialiseDB: {
        module: "invoicing",
        name: "initialiseDB",
        scope: "public",
        description: "sets default connection to DB",
        args: [
            {
                name: "baseId",
                type: "string",
                mandatory: true,
                description: "main database"
            }
        ],
        content: [],
        output: ""
    },
    async initialiseDB(args, options, serv, role, session) {
        const cnx = await session.dbserver.connect(`ypublicapi-connection-${args.baseId}`, args.baseId);
        await session.bind(cnx);
        return {data: []};
    }
};
