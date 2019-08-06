import { InlineTagDef } from "./InlineTagDef";

export function paramInLineTag(log):InlineTagDef {
    return {
        name: "param",
        description: "desc",
        handler: function (doc, tagName, tagDescription){
                return `${tagDescription}`
        }
    }
}
