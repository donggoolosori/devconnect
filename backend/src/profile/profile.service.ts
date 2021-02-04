import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { normalize } from 'path';
import { User } from 'src/users/schema/User.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './interfaces/profile.interface';

@Injectable()
export class ProfileService {
  constructor(@InjectModel('Profile') private profileModel: Model<Profile>) {}

  async getMyProfile(id: User): Promise<Profile> {
    const profile = await this.profileModel
      .findOne({ user: id })
      .populate('user', ['name', 'avatar']);
    if (!profile) {
      throw new BadRequestException('There is no profile for this user');
    }

    return profile;
  }

  async createProfile(createProfileDto: CreateProfileDto, id: User) {
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
}
