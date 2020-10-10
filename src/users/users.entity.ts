import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({
    unique: false,
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  password: string;
}
