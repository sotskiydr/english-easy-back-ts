import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements  CanActivate{
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requairedRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getClass(),
        context.getHandler()
      ])
      if(!requairedRoles){
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if(bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'user not authorization'});
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(role => requairedRoles.includes(role.value));
    }catch (e) {
      console.log(e)
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }

}