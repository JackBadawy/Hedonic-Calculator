# Hedon Calculator

## Overview

This is a calculator based on Jeremy Bentham's felicific calculus. The purpose of this project is to calculate the amount of joy a given course of action will bring you.

## Key Features

- Calculation of joy based on various factors
- Modal system using the Builder pattern for flexible and intuitive modal creation
- Event management system with add and remove functionality
- Server-Side Rendering (SSR) optimized components

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

## Project Structure

```
app/
  Contexts/
    EventsContext.tsx
    ModalContext.tsx
  Components/
    Buttons/
      AddEvent.tsx
    Cards/
      EventCard.tsx
    Containers/
      EventListContainer.tsx
      EventListContainerClient.tsx
    Modals/
      NewEventForm.tsx
  Types/
    hedon.ts
  layout.tsx
  page.tsx
  Providers.tsx
```

## Live Demo

TBA
