"use strict";


import {YRole} from "@yupana/framework-types/lib/YRoles";
import {YSession} from "@yupana/framework-types/lib/YSessions";
import {YQuery} from "@yupana/framework-types/";
import {Model} from "../../ts-classes/model";
import {YTstring} from "@yupana/class-generator";

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
        const firstMatch:Model = await _role.simple.createClass("model");
        firstMatch.setData(await result.iterator.next(null));
        return {data: {success: true, content: firstMatch.cGetContent()}};
    },

    $add: {
        module: "simple",
        name: "add",
        scope: "public",
        description: "add a new model with given title and description",
        restricted: false,
        args: [],
        content: [
            {
                name: "title",
                type: "string",
                mandatory: true,
                description: "title of the model"
            },
            {
                name: "description",
                type: "string",
                mandatory: true,
                description: "description of the model"
            }

        ],
        output: "{success: true}",
        example: "/simple/serverfunction/add",
        method: "post"
    },
    add: async (
        _args: any,
        _content: { title: string, description: string },
        _serv: any,
        _role: YRole,
        _session: YSession
    ): ServerFunctionResponse<{
        success: boolean
    }> => {
        const newModel:Model = await _role.simple.createClass("model");
        // .setData doesn't work
        // newModel.setData(_content);
        // this does:
        newModel.title = _content.title as YTstring;
        newModel.description = _content.description as YTstring;
        newModel.validate(err => {
            if (err) {
                throw err;
            }
        }, false);

        const cnx = await _session.dbserver.connect("simple", 'simple', null);
        await cnx.commit([newModel]);
        return {data: {success: true}};
    }
};
