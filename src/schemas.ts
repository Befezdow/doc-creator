const maxStringFieldLength = 80;
const maxFieldsNumber = 100;

const createTemplateSchema = {
    type: "object",
    required: ["name", "attributeFields"],
    properties: {
        name: {
            type: "string",
            minLength: 1,
            maxLength: maxStringFieldLength
        },
        attributeFields: {
            type: "array",
            minItems: 1,
            maxItems: maxFieldsNumber,
            items: {
                type: "object",
                required: ["name", "type"],
                properties: {
                    name: {
                        type: "string",
                        minLength: 1,
                        maxLength: maxStringFieldLength
                    },
                    type: {
                        type: "string",
                        enum: ['string', 'date', 'number'],
                    },
                },
                additionalProperties: false,
            }
        }
    },
    additionalProperties: false,
} as any;

const createDocumentSchema = {
    type: "object",
    required: ["name", "templateId", "attributeFields"],
    properties: {
        name: {
            type: "string",
            minLength: 1,
            maxLength: maxStringFieldLength
        },
        templateId: {
            type: "integer",
            minimum: 1,
        },
        attributeFields: {
            type: "array",
            minItems: 1,
            maxItems: maxFieldsNumber,
            items: {
                type: "object",
                required: ["name", "value"],
                properties: {
                    name: {
                        type: "string",
                        minLength: 1,
                        maxLength: maxStringFieldLength
                    },
                    value: {
                        anyOf: [
                            {   // number
                                type: "number"
                            },
                            {   // datetime
                                type: "string",
                                pattern: "^(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z))|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d([+-][0-2]\\d:[0-5]\\d|Z))|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d([+-][0-2]\\d:[0-5]\\d|Z))$"
                            },
                            {   // string
                                type: "string",
                                minLength: 0,
                                maxLength: maxStringFieldLength,
                            },
                        ]
                    },
                },
                additionalProperties: false,
            },
        },
    },
    additionalProperties: false,
} as any;

const updateDocumentSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 1,
            maxLength: maxStringFieldLength
        },
        attributeFields: {
            type: "array",
            minItems: 1,
            maxItems: maxFieldsNumber,
            items: {
                type: "object",
                required: ["name", "value"],
                properties: {
                    name: {
                        type: "string",
                        minLength: 1,
                        maxLength: maxStringFieldLength
                    },
                    value: {
                        anyOf: [
                            {   // number
                                type: "number"
                            },
                            {   // datetime
                                type: "string",
                                pattern: "^(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z))|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d([+-][0-2]\\d:[0-5]\\d|Z))|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d([+-][0-2]\\d:[0-5]\\d|Z))$"
                            },
                            {   // string
                                type: "string",
                                minLength: 0,
                                maxLength: maxStringFieldLength,
                            },
                        ]
                    },
                },
                additionalProperties: false,
            },
        },
    },
    additionalProperties: false,
} as any;

export {
    createTemplateSchema,
    createDocumentSchema,
    updateDocumentSchema,
};