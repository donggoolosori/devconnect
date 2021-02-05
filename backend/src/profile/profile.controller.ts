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
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './interfaces/profile.interface';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @route   Get profile/me
  // @desc    Get my profile
  // @access  Private
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Request() req): Promise<Profile> {
    return this.profileService.getMyProfile(req.user.id);
  }

  // @route   Post profile
  // @desc    Create or Update user profile
  // @access  Private
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Request() req,
  ): Promise<Profile> {
    return this.profileService.createProfile(createProfileDto, req.user.id);
  }

  // @route   Get profile
  // @desc    Get all users' profile
  // @access  Public
  @Get()
  getAllProfiles(): Promise<Profile[]> {
    return this.profileService.getAllProfiles();
  }

  // @route    GET profile/user/:user_id
  // @desc     Get profile by user ID
  // @access   Public
  @Get('user/:user_id')
  getProfileByUserId(@Param('user_id') user_id: User): Promise<Profile> {
    return this.profileService.getProfileByUserId(user_id);
  }

  // @route    DELETE profile
  // @desc     Delete profile, user & posts
  // @access   Private
  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteProfile(@Request() req): Promise<any> {
    return this.profileService.deleteProfile(req.user.id);
  }

  // @route    PUT profile/experience
  // @desc     Add profile experience
  // @access   Private
  @Put('/experience')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  addExperience(
    @Body() createExperienceDto: CreateExperienceDto,
    @Request() req,
  ): Promise<Profile> {
    return this.profileService.addExperience(createExperienceDto, req.user.id);
  }

  // @route    DELETE profile/experience/:exp_id
  // @desc     Delete experience from profile
  // @access   Private
  @Delete('/experience/:exp_id')
  @UseGuards(JwtAuthGuard)
  deleteExperience(@Param('exp_id') exp_id: string, @Request() req) {
    return this.profileService.deleteExperience(req.user.id, exp_id);
  }

  // @route    PUT profile/education
  // @desc     Add profile education
  // @access   Private
  @Put('/education')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  addEducation(
    @Body() createEducationDto: CreateEducationDto,
    @Request() req,
  ): Promise<Profile> {
    return this.profileService.addEducation(createEducationDto, req.user.id);
  }

  // @route    DELETE profile/education/:exp_id
  // @desc     Delete education from profile
  // @access   Private
  @Delete('/education/:exp_id')
  @UseGuards(JwtAuthGuard)
  deleteEducation(@Param('exp_id') exp_id: string, @Request() req) {
    return this.profileService.deleteEducation(req.user.id, exp_id);
  }
}
