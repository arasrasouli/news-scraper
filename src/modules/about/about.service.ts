import { Injectable } from '@nestjs/common';
import { AboutModel } from 'src/models/about.model';

@Injectable()
export class AboutService {
  getAbout(): AboutModel {
    return {
      title: process.env.APP_ABOUT_TITLE || 'Default Title',
      description:
        process.env.APP_ABOUT_DESCRIPTION ||
        'This is the default description of the API.',
      version: process.env.APP_VERSION || '1.0.1',
    };
  }
}
