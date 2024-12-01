# Hedonic Calculator

## Overview

This is a calculator based on Jeremy Bentham's felicific calculus. The purpose of this project is to calculate the amount of joy a given course of action will bring you.

## Key Features

- Authentication system with user registration, login, and session management
- Calculation of joy based on various factors
- Modal system using the Builder pattern for flexible and intuitive modal creation
- Event management system with add and remove functionality
- Server-Side Rendering (SSR) optimized components
- Comprehensive test suite for backend functionality

## Variables

The calculator considers the following variables in its calculations:

1. **Intensity**: How strong is the pleasure?
2. **Duration**: How long will the pleasure last?
3. **Certainty or uncertainty**: How likely or unlikely is it that the pleasure will occur?
4. **Propinquity or remoteness**: How soon will the pleasure occur?
5. **Fecundity**: The probability that the action will be followed by sensations of the same kind.
6. **Purity**: The probability that it will not be followed by sensations of the opposite kind.
7. **Extent**: How many people will be affected?

### Modal System

This project implements a flexible modal system using the Builder pattern. This approach allows for intuitive and customizable creation of modals throughout the application.

#### Key Features of the Modal System:

- Uses a `ModalBuilder` class for creating and configuring modals
- Supports setting custom messages, content, confirmation actions, dimensions, and CSS classes
- Automatically closes modals upon confirmation
- Centralized modal management through a `ModalContext`

### Example Usage:

```typescript
const { ModalBuilder } = useModal();

new ModalBuilder()
  .setMessage("Add New Event")
  .displayContent(<NewEventForm />)
  .setWidth("500px")
  .setHeight("400px")
  .setClassName("custom-modal")
  .setOnConfirm(() => {
    console.log("Event added");
  })
  .open();
```

This pattern allows for easy creation, customization, and immediate display of modals across the application.

### Event Management System

The application includes an event management system that allows users to add and remove events. Key features include:

- `EventsContext` for centralized state management of events
- `EventListContainer` for displaying the list of events
- `EventCard` component for rendering individual event details
- Add and remove functionality for events

### SSR Optimization

The project is optimized for Server-Side Rendering:

- Use of Next.js App Router for efficient routing and rendering
- Separation of server and client components for optimal performance
- Implementation of Suspense and fallback components for improved loading experience

## Backend

The backend is built using Spring Boot and provides a RESTful API for managing events and courses of action, and user authentication.

### Key Features:

- User authentication and session management
- CRUD operations for events and courses of action
- Automatic calculation of hedonic values for courses of action
- Determination of the ideal course of action for each event

### Authentication System:

The project includes a robust authentication system with the following features:

- User registration with unique usernames
- Secure password hashing using BCrypt
- User login with session token generation
- Session validation
- Logout functionality

The authentication system is implemented in the `AuthService` class and utilizes Spring Security for password encoding.

### Utility Functions

The backend includes utility functions for calculating hedonic values and determining ideal courses of action:

- `calculateHedonicValue(HCourseOfAction course)`: Calculates the hedonic value of a course of action based on its attributes.
- `findIdealCourse(List<HCourseOfAction> courses)`: Determines the course of action with the highest hedonic value from a list of courses.

### Automatic Updates

The system automatically updates hedonic values and ideal courses:

- When a course of action is created or updated, its hedonic value is automatically calculated.
- When an event's courses of action are set or updated, the ideal course is automatically determined.

### API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout
- `GET /api/auth/validate`: Validate session token
- `GET /api/events`: Retrieve all events
- `GET /api/events/{id}`: Retrieve a specific event
- `POST /api/events`: Create a new event
- `PUT /api/events/{id}`: Update an existing event
- `DELETE /api/events/{id}`: Delete an event

## Live Link

https://gentle-wave-01f645f1e.4.azurestaticapps.net/login

## Backend

https://github.com/JackBadawy/hcalc_backend
