import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '@prisma/client';

describe('EventService', () => {
  let service: EventService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, PrismaService],
    }).compile();

    service = module.get<EventService>(EventService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEvent', () => {
    it('should create an event', async () => {
      const eventData = {
        title: 'Test Event',
        description: 'This is a test event',
        date: new Date(),
        category: 'Test',
      };

      const expectedEvent: Event = {
        id: 1,
        ...eventData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaService.event.create = jest.fn().mockResolvedValue(expectedEvent);

      const result = await service.createEvent(eventData);

      expect(result).toEqual(expectedEvent);
      expect(prismaService.event.create).toHaveBeenCalledWith({
        data: eventData,
      });
    });
  });

  describe('events', () => {
    it('should return an array of events', async () => {
      const expectedEvents: Event[] = [
        {
          id: 1,
          title: 'Event 1',
          description: 'Description 1',
          date: new Date(),
          category: 'Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Event 2',
          description: 'Description 2',
          date: new Date(),
          category: 'Category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaService.event.findMany = jest
        .fn()
        .mockResolvedValue(expectedEvents);

      const result = await service.events({});

      expect(result).toEqual(expectedEvents);
      expect(prismaService.event.findMany).toHaveBeenCalled();
    });
  });

  describe('event', () => {
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

      prismaService.event.findUnique = jest
        .fn()
        .mockResolvedValue(expectedEvent);

      const result = await service.event({ id: 1 });

      expect(result).toEqual(expectedEvent);
      expect(prismaService.event.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('updateEvent', () => {
    it('should update an event', async () => {
      const updateData = {
        title: 'Updated Event',
        description: 'This is an updated event',
      };

      const expectedEvent: Event = {
        id: 1,
        ...updateData,
        date: new Date(),
        category: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaService.event.update = jest.fn().mockResolvedValue(expectedEvent);

      const result = await service.updateEvent({
        where: { id: 1 },
        data: updateData,
      });

      expect(result).toEqual(expectedEvent);
      expect(prismaService.event.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
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

      prismaService.event.delete = jest.fn().mockResolvedValue(expectedEvent);

      const result = await service.deleteEvent({ id: 1 });

      expect(result).toEqual(expectedEvent);
      expect(prismaService.event.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
