import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/schema/User.schema';
import { CreateExperienceDto } from './dto/create-experience.dto';
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

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteProfile(@Request() req): Promise<any> {
    return this.profileService.deleteProfile(req.user.id);
  }

  @Put('/experience')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  addExperience(
    @Body() createExperienceDto: CreateExperienceDto,
    @Request() req,
  ): Promise<Profile> {
    return this.profileService.addExperience(createExperienceDto, req.user.id);
  }

  @Delete('/experience/:exp_id')
  @UseGuards(JwtAuthGuard)
  deleteExperience(@Param('exp_id') exp_id: string, @Request() req) {
    return this.profileService.deleteExperience(req.user.id, exp_id);
  }
}
