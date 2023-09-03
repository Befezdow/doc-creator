import {FieldType} from "../types";

interface CreateDocumentRequest {
    name: string;
    templateId: number;
    attributeFields: Array<{
        name: string;
        value: FieldType;
    }>;
}

interface GetDocumentResponse extends Omit<CreateDocumentRequest, 'templateId'> {
    id: number;
    template: {
        id: number;
        name: string;
    }
}

interface UpdateDocumentRequest {
    name?: string;
    attributeFields?: Array<{
        name: string;
        value: FieldType;
    }>;
}

export {
    CreateDocumentRequest,
    GetDocumentResponse,
    UpdateDocumentRequest,
}