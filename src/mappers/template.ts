import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Template } from '../dbo/template.entity';
import { CreateTemplateRequest, GetTemplateResponse } from '../dto/template';

function mapCreateRequestToDbo(value: CreateTemplateRequest): DeepPartial<Template> {
    return {
        name: value.name,
        attributeFields: value.attributeFields.map(elem => ({
            name: elem.name,
            type: elem.type,
        })),
    };
}

function mapDboToGetResponse(value: Template): GetTemplateResponse {
    return {
        id: value.id,
        name: value.name,
        attributeFields: value.attributeFields.map(elem => ({
            name: elem.name,
            type: elem.type,
        })),
    };
}

export {
    mapCreateRequestToDbo,
    mapDboToGetResponse,
};