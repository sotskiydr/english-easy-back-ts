import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UsersController } from "./users.controller";
import { AuthModule } from "../auth/auth.module";
import { WordsModule } from "src/words/words.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]),
    forwardRef(() => AuthModule),
    // forwardRef(()=> WordsModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
