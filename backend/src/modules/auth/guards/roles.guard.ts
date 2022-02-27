import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { defaultRoles } from 'src/enums/defaultRoles.enum';
import { User } from 'src/modules/user/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<defaultRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user?: User }>();
    if (!user) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    return requiredRoles.some(
      (requiredRole) =>
        user.roles?.findIndex((role) => role.name === requiredRole) !== -1,
    );
  }
}
