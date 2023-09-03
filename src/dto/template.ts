import {FieldTypeName} from "../types";

interface CreateTemplateRequest {
    name: string;
    attributeFields: Array<{
        name: string;
        type: FieldTypeName;
    }>;
}

interface GetTemplateResponse extends CreateTemplateRequest {
    id: number;
}

export {
    CreateTemplateRequest,
    GetTemplateResponse,
}