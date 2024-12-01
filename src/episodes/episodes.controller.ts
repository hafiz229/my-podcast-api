import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from 'src/config/config.service';
import { IsPositivePipe } from 'src/pipes/is-positive.pipe';
import { CreateEpisodeDto } from 'src/dto/create-episode.dto';
import { ApiKeyGuard } from 'src/guards/api-key.guard';


@UseGuards(ApiKeyGuard)
@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number,
  ) {
    console.log(sort);
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    console.log(id);
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
      // throw new HttpException("Episode not found", HttpStatus.NOT_FOUND);
      // throw new Error("Episode not found");
    }

    return episode;
  }

  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    console.log(input);
    return this.episodesService.create(input);
  }
}
