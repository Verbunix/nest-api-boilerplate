import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

export enum UsersRoleEnum {
  user = 'user',
  admin = 'admin',
}

@Entity()
export class Users {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', enum: UsersRoleEnum })
  role: UsersRoleEnum;
}
