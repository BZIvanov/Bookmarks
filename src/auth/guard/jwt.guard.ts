import { AuthGuard } from '@nestjs/passport';
import { AUTH_STRATEGY_TYPE } from '../../constants';

export class JwtGuard extends AuthGuard(AUTH_STRATEGY_TYPE) {
  constructor() {
    super();
  }
}
