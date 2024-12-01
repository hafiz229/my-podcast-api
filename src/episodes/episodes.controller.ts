import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from 'src/config/config.service';

@Controller('episodes')
export class EpisodesController {
    constructor(
        private episodesService: EpisodesService,
        private configService: ConfigService
    ) {}

    @Get()
    findAll(@Query("sort") sort: "asc" | "desc" = "desc") {
        console.log(sort)
        return this.episodesService.findAll(sort)
    }

    @Get("featured")
    findFeatured() {
        return this.episodesService.findFeatured()
    }

    @Get(":id")
    async findOne(@Param() id: string) {
        console.log(id)
        const episode = await this.episodesService.findOne(id);
        if(!episode) {
            throw new Error("Episode not found");
        }

        return episode;
    }

    @Post()
    create(@Body() input: any) {
        console.log(input)
        return this.episodesService.create(input)
    }
}
