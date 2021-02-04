import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/schema/User.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './interfaces/profile.interface';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Request() req): Promise<Profile> {
    return this.profileService.getMyProfile(req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Request() req,
  ): Promise<Profile> {
    return this.profileService.createProfile(createProfileDto, req.user.id);
  }

  @Get()
  getAllProfiles(): Promise<Profile[]> {
    return this.profileService.getAllProfiles();
  }

  @Get('user/:user_id')
  getProfileByUserId(@Param('user_id') user_id: User): Promise<Profile> {
    return this.profileService.getProfileByUserId(user_id);
  }
}
