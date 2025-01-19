import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { Event } from '@prisma/client';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService, PrismaService],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEvent', () => {
    it('should create an event', async () => {
      const createEventDto: CreateEventDto = {
        title: 'Test Event',
        description: 'This is a test event',
        date: new Date('2023-05-20T12:00:00Z'),
        category: 'Test',
      };

      const expectedEvent: Event = {
        id: 1,
        title: createEventDto.title,
        description: createEventDto.description,
        date: createEventDto.date,
        category: createEventDto.category,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'createEvent').mockResolvedValue(expectedEvent);

      const result = await controller.createEvent(createEventDto);

      expect(result).toEqual(expectedEvent);
      expect(service.createEvent).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('getEventById', () => {
    it('should return a single event', async () => {
      const expectedEvent: Event = {
        id: 1,
        title: 'Test Event',
        description: 'This is a test event',
        date: new Date(),
        category: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'event').mockResolvedValue(expectedEvent);

      const result = await controller.getEventById(1);

      expect(result).toEqual(expectedEvent);
      expect(service.event).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('updateEvent', () => {
    it('should update an event', async () => {
      const updateEventDto: UpdateEventDto = {
        title: 'Updated Event',
        description: 'This is an updated event',
      };

      const existingEvent: Event = {
        id: 1,
        title: 'Original Event',
        description: 'This is the original event',
        date: new Date('2023-05-20T12:00:00Z'),
        category: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedEvent: Event = {
        ...existingEvent,
        ...updateEventDto,
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'updateEvent').mockResolvedValue(expectedEvent);

      const result = await controller.updateEvent(1, updateEventDto);

      expect(result).toEqual(expectedEvent);
      expect(service.updateEvent).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateEventDto,
      });
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      const expectedEvent: Event = {
        id: 1,
        title: 'Test Event',
        description: 'This is a test event',
        date: new Date(),
        category: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'deleteEvent').mockResolvedValue(expectedEvent);

      const result = await controller.deleteEvent(1);

      expect(result).toEqual(expectedEvent);
      expect(service.deleteEvent).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
