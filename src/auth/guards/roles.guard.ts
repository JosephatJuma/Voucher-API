import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

// Secret from env or fallback
const JWT_SECRET = process.env.APP_SECRET || 'your_default_jwt_secret';

export function RolesGuard(allowedRoles: string[]): CanActivate {
  return new (class implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Missing or invalid Authorization header',
        );
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        if (!decoded?.role) {
          throw new ForbiddenException('User role missing in token');
        }

        // Attach decoded user to request
        (request as any).user = decoded;
        console.log(decoded.role);

        // Check role
        if (!allowedRoles.includes(decoded.role)) {
          console.log('Access denied: insufficient role');

          throw new ForbiddenException('Access denied: insufficient role');
        }

        return true;
      } catch (error) {
        console.log(error);

        throw new UnauthorizedException(error.message);
      }
    }
  })();
}
