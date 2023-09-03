import {DocumentField} from "../dbo/document.entity";
import {TemplateField} from "../dbo/template.entity";

function isValidIsoDateTime(value: unknown) {
    if (typeof value !== 'string') {
        return false;
    }

    const date = new Date(value);
    return !Number.isNaN(date.valueOf()) && date.toISOString() === value;
}

function isValidString(value: unknown) {
    return typeof value === 'string';
}

function isValidNumber(value: unknown) {
    return typeof value === 'number';
}

function checkDocumentCreatedFields(documentFields: Array<DocumentField>, templateFields: Array<TemplateField>) {
    if (documentFields.length !== templateFields.length) {
        return false;
    }

    for (let i = 0; i < templateFields.length; i++) {
        const templateField = templateFields[i];
        const documentField = documentFields[i];

        if (documentField.name !== templateField.name) {
            return false;
        }

        switch (templateField.type) {
            case "date": {
                if (!isValidIsoDateTime(documentField.value)) {
                    return false;
                }
                break;
            }
            case "number": {
                if (!isValidNumber(documentField.value)) {
                    return false;
                }
                break;
            }
            case "string": {
                if (!isValidString(documentField.value)) {
                    return false;
                }
                break;
            }
        }
    }

    return true;
}

function checkDocumentUpdatedFields(newFields: Array<DocumentField>, oldFields: Array<DocumentField>) {
    if (oldFields.length !== newFields.length) {
        return false;
    }
    for (let i = 0; i < oldFields.length; i++) {
        const oldField = oldFields[i];
        const newField = newFields[i];

        if (oldField.name !== newField.name) {
            return false;
        }

        if (isValidIsoDateTime(oldField.value)) {
            if (!isValidIsoDateTime(newField.value)) {
                return false;
            }
            continue;
        }

        if (isValidNumber(oldField.value)) {
            if (!isValidNumber(newField.value)) {
                return false;
            }
            continue;
        }

        if (isValidString(oldField.value)) {
            if (!isValidString(newField.value)) {
                return false;
            }
        }
    }

    return true;
}

export {
    checkDocumentCreatedFields,
    checkDocumentUpdatedFields,
};