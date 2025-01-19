import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: Event,
  })
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'Return all events.',
    type: [Event],
  })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  async getAllEvents(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    @Query('category') category?: string,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<Event[]> {
    const [events, total] = await this.eventService.eventsWithCount({
      skip,
      take,
      where: category ? { category } : undefined,
    });

    res?.setHeader('X-Total-Count', total.toString());
    return events;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by id' })
  @ApiResponse({ status: 200, description: 'Return the event.', type: Event })
  @ApiParam({ name: 'id', type: 'number' })
  async getEventById(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return this.eventService.event({ id: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully updated.',
    type: Event,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.updateEvent({
      where: { id: id },
      data: updateEventDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully deleted.',
    type: Event,
  })
  @ApiParam({ name: 'id', type: 'number' })
  async deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return this.eventService.deleteEvent({ id: id });
  }
}
