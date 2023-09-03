import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"
import {FieldTypeName} from "../types";

type TemplateField = { name: string, type: FieldTypeName };

@Entity()
class Template {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        type: 'varchar',
        length: 80,
        nullable: false,
    })
    public name!: string;

    @Column({
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: false,
    })
    public attributeFields!: Array<TemplateField>;
}

export {
    Template,
    TemplateField
}