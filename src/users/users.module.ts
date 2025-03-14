import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UserRepository } from './user.repository';

@Module({
  imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  providers: [UsersService,UserRepository],
  controllers: [UsersController],
  exports:[UserRepository,UsersService]
})
export class UsersModule {}
