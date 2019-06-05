"use strict";

import {YRole} from "@yupana/framework-types/lib/YRoles";
import {YSession} from "@yupana/framework-types/lib/YSessions";
import {YTref} from "@yupana/class-generator";
import {PackUpsale} from "../../ts-classes/packUpsale";
import {Model} from "../../../simple/ts-classes/model";
import {PackRef} from "../../ts-classes/packRef";
// import {PackWeight} from "../../ts-classes/packWeight";
import {YPackWeight} from "sample-invoicing/advanced";
import {Pack} from "../../ts-classes/pack";
import {Scales} from "../common/commonfunction";

type ServerFunctionResponse<T> = Promise<{data:T}>

exports.REST = {
    $add: {
        module: "advanced",
        name: "add",
        scope: "public",
        description: "add a new package with given title and description",
        restricted: false,
        args: [],
        content: [
            {
                name: "title",
                type: "string",
                mandatory: true,
                description: "title of the Pack"
            },
            {
                name: "modelRef",
                type: "string",
                mandatory: true,
                description: "ref to the model"
            },
            {
                name: "weight",
                type: "number",
                mandatory: true,
                description: "weight value"
            },
            {
                name: "unit",
                type: "number",
                mandatory: true,
                description: "weight unit"
            },
            {
                name: "similar",
                type: "array",
                description: "refs to similar packs"
            }
        ],
        output: "{success: true, mass: 10}",
        example: "/advanced/serverfunction/add",
        method: "post"
    },
    add: async (
        _args: any,
        _content: { title: string, modelRef: string, weight: number, unit: number, similar?: string[]},
        _serv: any,
        _role: YRole,
        _session: YSession
    ): ServerFunctionResponse<{
        success: boolean, mass: number
    }> => {
        const newPack:PackUpsale = await _role.advanced.createClass("packUpsale");
        newPack.title = _content.title;
        newPack.model = {objectId: _content.modelRef} as YTref<Model>;
        // this doesn't mark weight as updated
        newPack.weight.value = _content.weight;
        newPack.weight.unit = _content.unit;
        // should be replaced in compiled js with
        // newPack.weight_value = _content.weight;
        // newPack.weight_unit = _content.unit;

        await Promise.all((_content.similar || []).map(async (packId) => {
            const newRef:PackRef = await _role.advanced.createClass("packRef");
            newRef.pack = {objectId: packId} as YTref<PackUpsale>;
            return newPack.similar.push(newRef);
        }));

        newPack.validate(err => {
            if (err) {
                throw err;
            }
        }, false);

        const cnx = await _session.dbserver.connect("simple", 'simple', null);
        await cnx.commit([newPack]);

        // Scales.weight is not working
        // return {data: {success: true, mass: Scales.weight(newPack.weight)}};

        // this compiles but no hinting/autocompletion
        const scales = (await _role.advanced.requireEx('commonfunction.js')).Scales;
        return {data: {success: true, mass: scales.weight(newPack.weight as YPackWeight)}};
  }
};
