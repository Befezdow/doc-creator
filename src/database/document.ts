import {DeepPartial} from "typeorm/common/DeepPartial";
import {DataSourceInstance} from "./data-source";
import {Document, DocumentField} from "../dbo/document.entity";
import {Template} from "../dbo/template.entity";
import {InvalidFieldsError, InvalidTemplateError, UnknownEntityError} from "../errors";
import {checkDocumentCreatedFields, checkDocumentUpdatedFields} from "./utils";

const documentsRepo = DataSourceInstance.getRepository(Document);
const templatesRepo = DataSourceInstance.getRepository(Template);

async function createDocument(value: DeepPartial<Document>): Promise<number> {
    const templateId = value.template!.id!;
    const template = await templatesRepo.findOneBy({id: templateId});
    if (template === null) {
        throw new InvalidTemplateError(templateId, `Template with id ${value.template?.id} not found`);
    }

    const documentFields = value.attributeFields as Array<DocumentField>;
    const templateFields = template!.attributeFields;
    if (!checkDocumentCreatedFields(documentFields, templateFields)) {
        throw new InvalidFieldsError(documentFields, `Document's fields has invalid structure`);
    }

    const user = documentsRepo.create(value);
    return documentsRepo.save(user).then(res => res.id);
}

async function updateDocument(id: number, value: DeepPartial<Document>): Promise<void> {
    const document = await documentsRepo.findOneBy({id});
    if (document === null) {
        throw new UnknownEntityError(id, `Can't find document with id ${id}`);
    }

    const newFields = value.attributeFields as Array<DocumentField> | undefined;
    const oldFields = document!.attributeFields;
    if (newFields !== undefined) {
        if (!checkDocumentUpdatedFields(newFields, oldFields)) {
            throw new InvalidFieldsError(newFields, `Document's fields has invalid structure`);
        }
    }

    await documentsRepo.update(
        id,
        value
    );
}

async function getDocument(id: number): Promise<Document> {
    const result = await documentsRepo.findOne({
        where: {id},
        relations: ['template'],
    });

    if (result === null) {
        throw new UnknownEntityError(id, `Can't find document with id ${id}`);
    }

    return result;
}

async function deleteDocument(id: number): Promise<void> {
    const result = await documentsRepo.delete(id);
    if (result.affected === 0) {
        throw new UnknownEntityError(id, `Can't find document with id ${id}`);
    }
}

export {
    createDocument,
    updateDocument,
    getDocument,
    deleteDocument,
}