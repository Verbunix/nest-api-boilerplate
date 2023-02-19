import { createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator((data, req) => {
  const res = req.switchToHttp().getRequest();
  return res.user;
});
