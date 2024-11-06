import { HEvent } from "../Types/hedon";

export async function fetchEvents(sessionToken: string): Promise<HEvent[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/events`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch events");
      return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function removeEvent(
  id: number,
  sessionToken: string
): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error removing event:", error);
    return false;
  }
}

export async function addEvent(
  event: HEvent,
  sessionToken: string
): Promise<HEvent | null> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(event),
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error("Error adding event:", error);
    return null;
  }
}
