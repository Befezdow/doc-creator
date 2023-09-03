import {DeepPartial} from "typeorm/common/DeepPartial";
import {Template} from "../dbo/template.entity";
import {UnknownEntityError} from "../errors";
import {DataSourceInstance} from "./data-source";

const repository = DataSourceInstance.getRepository(Template);

async function createTemplate(value: DeepPartial<Template>): Promise<number> {
    const user = repository.create(value);
    return repository.save(user).then(res => res.id);
}

async function getTemplate(id: number): Promise<Template> {
    const result = await repository.findOneBy({id});

    if (result === null) {
        throw new UnknownEntityError(id, `Can't find template with id ${id}`);
    }

    return result;
}

export {
    createTemplate,
    getTemplate
}