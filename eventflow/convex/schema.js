import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  events: defineTable({
    title: "string",
    description: "string",
    date: "string",
    location: "string",
    createdBy: "string", // User ID from Clerk
    inviteLink: "string",
  }),
  rsvps: defineTable({
    eventId: "string",
    userId: "string",
    status: "string", // "accepted", "declined", "maybe"
  }),
});
