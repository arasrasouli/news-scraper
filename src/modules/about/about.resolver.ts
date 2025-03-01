import { Query, Resolver } from '@nestjs/graphql';
import { AboutService } from './about.service';
import { AboutDto } from './dtos/about.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => AboutDto)
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}

  @Query(() => AboutDto)
  @UseGuards(JwtAuthGuard)
  about(): AboutDto {
    return this.aboutService.getAbout();
  }
}
