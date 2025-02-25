import { Query, Resolver } from '@nestjs/graphql';
import { AboutService } from './about.service';
import { AboutModel } from '../../models/about.model';

@Resolver(() => AboutModel)
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}

  @Query(() => AboutModel)
  about(): AboutModel {
    return this.aboutService.getAbout();
  }
}
