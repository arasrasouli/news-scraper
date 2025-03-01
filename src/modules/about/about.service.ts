import { Injectable } from '@nestjs/common';
import { AboutDto } from 'src/modules/about/dtos/about.dto';

@Injectable()
export class AboutService {
  getAbout(): AboutDto {
    return {
      title: process.env.APP_ABOUT_TITLE || 'Default Title',
      description:
        process.env.APP_ABOUT_DESCRIPTION ||
        'This is the default description of the API.',
      version: process.env.APP_VERSION || '1.0.1',
    };
  }
}
