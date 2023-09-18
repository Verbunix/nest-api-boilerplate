import { UsersRoleEnum } from '../../users/users.entity';

export interface IJwtUser {
  id: string;
  email: string;
  name: string;
  role: UsersRoleEnum;
}
