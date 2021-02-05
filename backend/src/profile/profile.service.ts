import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { normalize } from 'path';
import { User, UserDocument } from 'src/users/schema/User.schema';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './interfaces/profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private profileModel: Model<Profile>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async getMyProfile(id: User): Promise<Profile> {
    const profile = await this.profileModel
      .findOne({ user: id })
      .populate('user', ['name', 'avatar']);
    if (!profile) {
      throw new BadRequestException('There is no profile for this user');
    }

    return profile;
  }

  async createProfile(
    createProfileDto: CreateProfileDto,
    id: User,
  ): Promise<Profile> {
    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      ...rest
    } = createProfileDto;

    // Build profile object
    const profileFields = {
      user: id,
      website: website && website !== '' ? normalize(website) : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest,
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };
    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) socialFields[key] = normalize(value);
    }
    // add to profileFields
    profileFields.social = socialFields;

    // Create or Update Profile
    let profile = await this.profileModel.findOne({ user: id });
    if (profile) {
      profile = await this.profileModel.findOneAndUpdate(
        { user: id },
        { $set: profileFields },
        { new: true },
      );
      return profile;
    }
    profile = new this.profileModel(profileFields);
    return profile.save();
  }

  async getAllProfiles(): Promise<Profile[]> {
    const profiles = await this.profileModel
      .find()
      .populate('user', ['name', 'avatar']);

    return profiles;
  }

  async getProfileByUserId(user_id: User): Promise<Profile> {
    const profile = await this.profileModel
      .findOne({ user: user_id })
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    return profile;
  }

  async deleteProfile(user_id: User): Promise<any> {
    // Remove profile
    await this.profileModel.findOneAndDelete({ user: user_id });
    // Remove User
    await this.userModel.findOneAndRemove({ _id: user_id });

    return { msg: 'User deleted' };
  }

  async addExperience(
    createExperienceDto: CreateExperienceDto,
    user_id: User,
  ): Promise<Profile> {
    const profile = await this.profileModel.findOne({ user: user_id });
    profile.experience.unshift(createExperienceDto);

    return await profile.save();
  }

  async deleteExperience(user_id: User, exp_id: string) {
    const profile = await this.profileModel.findOne({ user: user_id });

    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== exp_id,
    );

    return await profile.save();
  }

  async addEducation(
    createEducationDto: CreateEducationDto,
    user_id: User,
  ): Promise<Profile> {
    const profile = await this.profileModel.findOne({ user: user_id });
    profile.education.unshift(createEducationDto);

    return await profile.save();
  }

  async deleteEducation(user_id: User, exp_id: string) {
    const profile = await this.profileModel.findOne({ user: user_id });

    profile.education = profile.education.filter(
      (exp) => exp._id.toString() !== exp_id,
    );

    return await profile.save();
  }

  async getGithubRepos(username: string): Promise<any> {
    const uri = encodeURI(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };
    try {
      const githubResponse = await axios.get(uri, { headers });
      return githubResponse.data;
    } catch (error) {
      throw new BadRequestException('No Github profile found');
    }
  }
}
