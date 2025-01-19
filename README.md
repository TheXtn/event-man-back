# Event Management API

A RESTful API built with NestJS, Prisma ORM, and MySQL for managing events. This API provides endpoints for creating, reading, updating, and deleting events with features like pagination, filtering, and validation.

## Tech Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: MySQL 8.0
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest & Supertest
- **Container**: Docker & Docker Compose

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- MySQL 8.0 (if running locally)

## Getting Started

### Using Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/TheXtn/event-man-back
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

   This will start:
   - API server on port 3000
   - MySQL database on port 3306

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your database credentials.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

## Database Schema

### Event
```prisma
model Event {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  date        DateTime
  category    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Get Events
```http
GET /events
```

Query Parameters:
- `skip` (optional): Number of records to skip (pagination)
- `take` (optional): Number of records to take (pagination)
- `category` (optional): Filter events by category

Response Headers:
- `x-total-count`: Total number of records

Response Body:
```json
[
  {
    "id": 1,
    "title": "Sample Event",
    "description": "Event description",
    "date": "2024-03-20T15:00:00.000Z",
    "category": "Conference",
    "createdAt": "2024-03-19T10:00:00.000Z",
    "updatedAt": "2024-03-19T10:00:00.000Z"
  }
]
```

#### Get Event by ID
```http
GET /events/:id
```

Response: Single event object

#### Create Event
```http
POST /events
```

Request Body:
```json
{
  "title": "New Event",
  "description": "Event description",
  "date": "2024-03-20T15:00:00.000Z",
  "category": "Conference"
}
```

Validation:
- `title`: Required, string
- `description`: Optional, string
- `date`: Required, ISO 8601 date string
- `category`: Required, string

#### Update Event
```http
PUT /events/:id
```

Request Body: Same as Create Event (all fields optional)

#### Delete Event
```http
DELETE /events/:id
```

### Error Responses

```json
{
  "statusCode": 400,
  "message": ["title must be a string"],
  "error": "Bad Request"
}
```

## Testing

### Unit Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:cov
```


## Development Guidelines

1. **Code Style**
   - Follow NestJS best practices
   - Use TypeScript decorators for validation
   - Implement proper error handling
   - Write comprehensive unit tests

2. **API Design**
   - Follow RESTful principles
   - Use proper HTTP status codes
   - Implement pagination for list endpoints
   - Add proper validation for all inputs

3. **Database**
   - Use Prisma migrations for schema changes
   - Use transactions where necessary

4. **Testing**
   - Write unit tests for services
   - Maintain good test coverage

## Environment Variables

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/event_management"

# API
PORT=3000
NODE_ENV=development

# Optional
SWAGGER_PATH=/api
CORS_ORIGIN=http://localhost:3000
```

## Docker Support

The application includes a `Dockerfile` and `docker-compose.yml` for containerization

