import {DeepPartial} from "typeorm/common/DeepPartial";
import {Document} from "../dbo/document.entity";
import {CreateDocumentRequest, GetDocumentResponse, UpdateDocumentRequest} from "../dto/document";

function mapCreateRequestToDbo(value: CreateDocumentRequest): DeepPartial<Document> {
    return {
        name: value.name,
        template: {
            id: value.templateId,
        },
        attributeFields: value.attributeFields.map(elem => ({
            name: elem.name,
            value: elem.value,
        }))
    };
}

function mapUpdateRequestToDbo(value: UpdateDocumentRequest): DeepPartial<Document> {
    const result: DeepPartial<Document> = {};

    if (value.name !== undefined) {
        result.name = value.name;
    }

    if (value.attributeFields !== undefined) {
        result.attributeFields = value.attributeFields.map(elem => ({
            name: elem.name,
            value: elem.value,
        }));
    }

    return result;
}

function mapDboToGetResponse(value: Document): GetDocumentResponse {
    return {
        id: value.id,
        name: value.name,
        template: {
            id: value.template.id,
            name: value.template.name,
        },
        attributeFields: value.attributeFields.map(elem => ({
            name: elem.name,
            value: elem.value,
        }))
    };
}

export {
    mapCreateRequestToDbo,
    mapUpdateRequestToDbo,
    mapDboToGetResponse,
};