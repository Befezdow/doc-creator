import {DocumentField} from "./dbo/document.entity";

abstract class DatabaseError extends Error {
    protected constructor(message = 'Detected internal database error') {
        super(message);
        Object.setPrototypeOf(this, DatabaseError.prototype);

        this.name = "DatabaseError";
    }
}

abstract class InvalidDataStructureError extends DatabaseError {
    protected constructor(message = 'Detected invalid database data') {
        super(message);
        Object.setPrototypeOf(this, InvalidDataStructureError.prototype);

        this.name = "InvalidDataStructureError";
    }
}

class InvalidTemplateError extends InvalidDataStructureError {
    public templateId: number;

    public constructor(templateId: number, message = 'Detected inconsistent value for templateId - template is unknown') {
        super(message);
        Object.setPrototypeOf(this, InvalidTemplateError.prototype);

        this.name = "InvalidTemplateError";
        this.templateId = templateId;
    }
}

class InvalidFieldsError extends InvalidDataStructureError {
    public fieldsData: Array<DocumentField>;

    public constructor(fieldsData: Array<DocumentField>, message = 'Detected inconsistent structure for fields field - data cannot be written') {
        super(message);
        Object.setPrototypeOf(this, InvalidFieldsError.prototype);

        this.name = "InvalidFieldsError";
        this.fieldsData = fieldsData;
    }
}

class UnknownEntityError extends DatabaseError {
    public entityId: number;

    public constructor(entityId: number, message = 'Detected unknown entity id') {
        super(message);
        Object.setPrototypeOf(this, UnknownEntityError.prototype);

        this.name = "UnknownEntityError";
        this.entityId = entityId;
    }
}

export {
    DatabaseError,
    InvalidTemplateError,
    InvalidFieldsError,
    UnknownEntityError,
    InvalidDataStructureError,
}