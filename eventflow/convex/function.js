import { mutation, query } from "./_generated/server";

export const createEvent = mutation(async ({ db }, { title, description, date, location, userId }) => {
  const inviteLink = `https://yourdomain.com/event/${crypto.randomUUID()}`;
  return await db.insert("events", { title, description, date, location, createdBy: userId, inviteLink });
});

export const getEvents = query(async ({ db }) => {
  return await db.query("events").collect();
});

export const rsvpEvent = mutation(async ({ db }, { eventId, userId, status }) => {
  return await db.insert("rsvps", { eventId, userId, status });
});
