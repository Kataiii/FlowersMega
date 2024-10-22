import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersRoles } from './users-roles.model';
import { UsersRolesService } from './users-roles.service';

@Module({
  providers: [UsersRolesService],
  imports: [
    SequelizeModule.forFeature([UsersRoles]),
  ],
  exports: [
    UsersRolesService
  ]
})
export class UsersRolesModule {}
