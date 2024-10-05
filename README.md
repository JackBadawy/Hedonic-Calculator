# Hedon Calculator

## Overview

This is a calculator based on Jeremy Bentham's felicific calculus. The purpose of this project is to calculate the amount of joy a given course of action will bring you.

## Key Features

- Calculation of joy based on various factors
- Modal system using the Builder pattern for flexible and intuitive modal creation

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

### Live Demo

TBA
