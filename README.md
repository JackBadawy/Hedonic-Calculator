# Hedonic Calculator

A calculator based on Jeremy Bentham's felicific calculus (hedonic calculus) designed to help evaluate and calculate the potential joy or utility of different courses of action.

## Links

[Live Deployment](https://gentle-wave-01f645f1e.4.azurestaticapps.net/login)

[Backend Repository](https://github.com/JackBadawy/hcalc_backend)

## Key Features

- Authentication system with user registration, login, and session management
- Interactive calculator for evaluating actions based on Bentham's criteria
- PDF generation of Bentham's original essay "An Introduction to the Principles of Morals and Legislation"
- Event management system with add and remove functionality
- Modal system using the Builder pattern
- Server-Side Rendering (SSR) optimized components
- Comprehensive test suite for backend functionality

## Felicific Calculus Variables

The calculator evaluates actions based on seven key variables from Bentham's original framework:

1. **Intensity**: How strong is the pleasure?
2. **Duration**: How long will the pleasure last?
3. **Certainty**: How likely is it that the pleasure will occur?
4. **Propinquity**: How soon will the pleasure occur?
5. **Fecundity**: The probability of similar sensations following
6. **Purity**: The probability it won't be followed by opposite sensations
7. **Extent**: Number of people affected

## Frontend Features

### PDF Generation

With help from the book 'PDF Explained: The ISO Standard for Document Exchange' by John Whitington, this application includes functionality to generate and download a PDF version of Bentham's essay "An Introduction to the Principles of Morals and Legislation". Key features include:

- Dynamic PDF generation with proper formatting
- Chapter-based organization
- Styled headings and text
- Downloadable format for offline reading

### Modal System

Implements a flexible modal system using the Builder pattern for intuitive modal creation:

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

### Event Management System

Features a comprehensive event management system with:

- `EventsContext` for centralized state management
- `EventListContainer` for event display
- `EventCard` component for individual events
- Add/remove event functionality

### SSR Optimization

Optimized for Server-Side Rendering using:

- Next.js App Router
- Server/client component separation
- Suspense and fallback components

## Backend Architecture

The backend is built with Spring Boot and provides a RESTful API for:

### Authentication System

- User registration with unique usernames
- Secure password hashing (BCrypt)
- Session token management
- Login/logout functionality

### Core Functionality

- CRUD operations for events
- Automatic calculation of hedonic values
- Ideal course of action determination
- Session validation

### API Endpoints

#### Authentication
- `POST /api/auth/register`: Register user
- `POST /api/auth/login`: Login
- `POST /api/auth/logout`: Logout
- `GET /api/auth/validate`: Validate session

#### Event Management
- `GET /api/events`: List events
- `GET /api/events/{id}`: Get event
- `POST /api/events`: Create event
- `PUT /api/events/{id}`: Update event
- `DELETE /api/events/{id}`: Delete event

### Utility Functions

- `calculateHedonicValue(HCourseOfAction course)`: Calculate hedonic values
- `findIdealCourse(List<HCourseOfAction> courses)`: Determine optimal actions
