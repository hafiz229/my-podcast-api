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
    findOne(@Param() id: string) {
        console.log(id)
        return this.episodesService.findOne(id)
    }

    @Post()
    create(@Body() input: any) {
        console.log(input)
        return this.episodesService.create(input)
    }
}
