import { Query, Resolver } from '@nestjs/graphql';
import { AboutService } from './about.service';
import { AboutModel } from '../../models/about.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => AboutModel)
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}

  @Query(() => AboutModel)
  @UseGuards(JwtAuthGuard)
  about(): AboutModel {
    return this.aboutService.getAbout();
  }
}
