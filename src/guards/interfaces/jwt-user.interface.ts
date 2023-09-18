import { UsersRoleEnum } from '../../enities/users.entity';

export interface IJwtUser {
  id: string;
  email: string;
  name: string;
  role: UsersRoleEnum;
}
