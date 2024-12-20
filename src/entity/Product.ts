import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    SKU: number

    @Column({ nullable: false })
    Name: string

    @Column({ nullable: false })
    Price: number

    @Column({ nullable: false })
    image: string
}
