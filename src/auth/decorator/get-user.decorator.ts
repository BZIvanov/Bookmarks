import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    // data will be avialable if we passed something as parameter to the decorator
    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
