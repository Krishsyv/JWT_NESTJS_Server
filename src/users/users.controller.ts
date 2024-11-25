import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('profile')
  getUser(@Req() req: Record<string, any>) {
		console.log("req", req)
    return req.user;
  }
}
