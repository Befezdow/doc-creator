import { Express, Request, Response } from 'express';
import { Validator } from 'express-json-validator-middleware';
import { CreateTemplateRequest } from './dto/template';
import { CreateDocumentRequest, UpdateDocumentRequest } from './dto/document';
import { createTemplate, getTemplate } from './database/template';
import { createDocument, deleteDocument, getDocument, updateDocument } from './database/document';
import { mapCreateRequestToDbo as mapTemplateCreate, mapDboToGetResponse as mapTemplateGet } from './mappers/template';
import {
    mapCreateRequestToDbo as mapDocumentCreate,
    mapDboToGetResponse as mapDocumentGet,
    mapUpdateRequestToDbo as mapDocumentUpdate,
} from './mappers/document';
import { Template } from './dbo/template.entity';
import { Document } from './dbo/document.entity';
import { createDocumentSchema, createTemplateSchema, updateDocumentSchema } from './schemas';
import { InvalidDataStructureError, UnknownEntityError } from './errors';

function addRouteHandlers(app: Express) {
    const { validate } = new Validator({});

    app.post('/templates', validate({ body: createTemplateSchema }), async (req: Request, res: Response) => {
        const body = req.body as CreateTemplateRequest;

        let createdTemplateId: number;
        try {
            createdTemplateId = await createTemplate(mapTemplateCreate(body));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ errorMessage: 'Internal server error' });
        }

        return res.status(201).send({ id: createdTemplateId });
    });

    app.get('/templates/:id', async (req: Request, res: Response) => {
        const templateId = Number.parseInt(req.params['id']);

        let rawTemplate: Template;
        try {
            rawTemplate = await getTemplate(templateId);
        } catch (err) {
            if (err instanceof UnknownEntityError) {
                return res.status(400).send({ errorMessage: err.message });
            }

            console.error(err);
            return res.status(500).send({ errorMessage: 'Internal server error' });
        }

        return res.status(200).send(mapTemplateGet(rawTemplate));
    });

    app.post('/documents', validate({ body: createDocumentSchema }), async (req: Request, res: Response) => {
        const body = req.body as CreateDocumentRequest;

        let createdDocumentId: number;
        try {
            createdDocumentId = await createDocument(mapDocumentCreate(body));
        } catch (err) {
            if (err instanceof InvalidDataStructureError) {
                return res.status(400).send({ errorMessage: err.message });
            }

            console.error(err);
            return res.status(500).send({ errorMessage: 'Internal server error' });
        }

        return res.status(201).send({ id: createdDocumentId });
    });

    app.put('/documents/:id', validate({ body: updateDocumentSchema }), async (req: Request, res: Response) => {
        const documentId = Number.parseInt(req.params['id']);
        const body = req.body as UpdateDocumentRequest;

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ errorMessage: 'Update fields are not defined' });
        }

        try {
            await updateDocument(documentId, mapDocumentUpdate(body));
        } catch (err) {
            if (err instanceof InvalidDataStructureError) {
                return res.status(400).send({ errorMessage: err.message });
            }

            console.error(err);
            return res.status(500).send({ errorMessage: 'Internal server error' });
        }

        return res.status(200).send(null);
    });

    app.get('/documents/:id', async (req: Request, res: Response) => {
        const documentId = Number.parseInt(req.params['id']);

        let rawDocument: Document;
        try {
            rawDocument = await getDocument(documentId);
        } catch (err) {
            if (err instanceof UnknownEntityError) {
                return res.status(400).send({ errorMessage: err.message });
            }

            console.error(err);
            return res.status(500).send({ errorMessage: 'Internal server error' });
        }

        return res.status(200).send(mapDocumentGet(rawDocument));
    });

    app.delete('/documents/:id', async (req: Request, res: Response) => {
        const documentId = Number.parseInt(req.params['id']);

        try {
            await deleteDocument(documentId);
        } catch (err) {
            if (err instanceof UnknownEntityError) {
                return res.status(400).send({ errorMessage: err.message });
            }

            console.error(err);
            return res.status(500).send({ errorMessage: 'Internal server error' });
        }

        return res.status(200).send(null);
    });
}

export {
    addRouteHandlers,
};