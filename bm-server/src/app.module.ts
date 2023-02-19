import * as Joi from 'joi';
import * as cookieParser from 'cookie-parser';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfig } from './interfaces/app-config.interface';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<AppConfig>) => ({
        uri: configService.get('MONGO_DB_URI'),
        user: configService.get('MONGO_USERNAME'),
        pass: configService.get('MONGO_PASSWORD'),
        dbName: configService.get('MONGO_DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object<AppConfig, string>({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(80),
        MONGO_DB_URI: Joi.string().required(),
        MONGO_DB_NAME: Joi.string().required(),
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
      }),
    }),
    AuthModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
