import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersRolesModule } from 'src/users-roles/users-roles.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    FilesModule,
    RolesModule,
    UsersRolesModule
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
