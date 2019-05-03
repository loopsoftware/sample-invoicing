"use strict";


import {YRole} from "@yupana/framework-types/lib/YRoles";
import {YSession} from "@yupana/framework-types/lib/YSessions";

type ServerFunctionResponse<T> = Promise<{data:T}>

exports.REST = {
    $echo: {
        module: "simple",
        name: "echo",
        scope: "public",
        description: "returns parameter",
        restricted: false,
        args: [
            {
                name: "phrase",
                type: "string",
                mandatory: true,
                description: "string to get in the response"
            }
        ],
        content: [],
        output: "{success: true, phrase: 'response'}",
        example: "/simple/serverfunction/echo?phrase=response  =>  {success: true, phrase: 'response'}",
        method: "get"
    },
    echo: async (
        _args: { phrase: string },
        _content: any,
        _serv: any,
        _role: YRole,
        _session: YSession
    ): ServerFunctionResponse<{
        success: boolean,
        phrase: string
    }> => {
        return {data: {success: true, phrase: _args.phrase}};
    }
};
