import { CreateUserDto } from "../users/dto/create-user.dto";
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: CreateUserDto){
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto){
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if(candidate) {
      throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10)
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    return this.generateToken(user)
  }

  async generateToken(user){
    const payload = {name: user.name, email: user.email, id: user.id, roles: user.roles}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    const passwordEquals = await  bcrypt.compare(userDto.password, user.password)
    if( user && passwordEquals ) return user;
    throw new UnauthorizedException({message: 'user is not exist'})
  }

}
