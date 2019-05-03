"use strict";


import {YRole} from "@yupana/framework-types/lib/YRoles";
import {YSession} from "@yupana/framework-types/lib/YSessions";
import {YQuery} from "@yupana/framework-types/";
import {Model} from "../../ts-classes/model";

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
    },

    $query: {
        module: "simple",
        name: "query",
        scope: "public",
        description: "returns calculated property of a model from the DB",
        restricted: false,
        args: [
            {
                name: "title",
                type: "string",
                mandatory: true,
                description: "title of the model to search by"
            }
        ],
        content: [],
        output: "{success: true, content: 'qwe(asd)'}",
        example: "/simple/serverfunction/query?title=qwe  =>  {success: true, content: 'qwe (asd)'}",
        method: "get"
    },
    query: async (
        _args: { title: string },
        _content: any,
        _serv: any,
        _role: YRole,
        _session: YSession
    ): ServerFunctionResponse<{
        success: boolean,
        content: string
    }> => {
        const cnx = await _session.dbserver.connect("simple", 'simple', null);
        const query = YQuery.From('simple.model')
                    .Where(`obj.title == "${_args.title}"`)
                    .Select()
                    .Execute();
        const result = await cnx.find(query);
        const firstMatch:Model = _role.simple.createClass("Model");
        firstMatch.setData(await result.iterator.next(null));
        return {data: {success: true, content: firstMatch.cGetContent()}};
    }
};
