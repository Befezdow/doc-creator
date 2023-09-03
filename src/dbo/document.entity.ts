import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FieldType } from '../types';
import { Template } from './template.entity';

type DocumentField = { name: string, value: FieldType };

@Entity()
class Document {
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
        default: () => '\'[]\'',
        nullable: false,
    })
    public attributeFields!: Array<DocumentField>;

    @ManyToOne(() => Template, {
        nullable: false,
    })
    public template!: Template;
}

export {
    Document,
    DocumentField,
};