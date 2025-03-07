import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { NewsProviderModule } from './modules/news-provider/news-provider.module';
import { ConfigModule } from '@nestjs/config';
import { AboutModule } from './modules/about/about.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './env.validation'; 
import { NewsProvider } from './database/entities/news-provider.entity';
import { AuthModule } from './auth/auth.module';
import { NewsPattern } from './database/entities/news-pattern.entity';
import { NewsPatternModule } from './modules/news-pattern/news-pattern.module';
import { TopicModule } from './modules/topic/topic.module';
import { Topic } from './database/entities/topic.entity';
import { NewsArticle } from './database/entities/news-article.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate, 
      isGlobal: true,
    }),
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [NewsProvider, NewsPattern, Topic, NewsArticle],
      synchronize: true ,
      dropSchema: process.env.NODE_ENV === 'test',
      autoLoadEntities: true,
      logging:
        process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    }),
    NewsProviderModule,
    NewsPatternModule,
    TopicModule,
    AboutModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};
