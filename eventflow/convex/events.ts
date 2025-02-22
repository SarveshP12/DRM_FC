import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Create a new event
export const createEvent = mutation({
  args: {
    title: v.string(),
    date: v.object({
      start: v.string(),
      end: v.optional(v.string()),
      isFullDay: v.boolean(),
    }),
    time: v.optional(v.string()),
    location: v.string(),
    capacity: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const tokenIdentifier = identity.tokenIdentifier;
    
    // Generate a random string for the invite link
    const randomString = Math.random().toString(36).substring(2, 15);
    
    // Create the invite link for local development
    const inviteLink = `http://localhost:3000/invite/${randomString}`;

    const eventId = await ctx.db.insert("events", {
      ...args,
      createdBy: tokenIdentifier,
      inviteLink,
      sharedMedia: [],
    });

    return { eventId, inviteLink };
  },
});

// Update an existing event
export const updateEvent = mutation({
  args: {
    eventId: v.id("events"),
    eventData: v.object({
      title: v.optional(v.string()),
      date: v.optional(
        v.object({
          start: v.string(),
          end: v.optional(v.string()),
          isFullDay: v.boolean(),
        })
      ),
      time: v.optional(v.string()),
      location: v.optional(v.string()),
      capacity: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    // Verify the user is the event creator
    if (event.createdBy !== identity.tokenIdentifier) {
      throw new Error("Unauthorized to update this event");
    }

    await ctx.db.patch(args.eventId, args.eventData);
    return ctx.db.get(args.eventId);
  },
});

// Delete an event
export const deleteEvent = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (event.createdBy !== identity.tokenIdentifier) {
      throw new Error("Unauthorized to delete this event");
    }

    // Delete associated RSVPs and media
    const rsvps = await ctx.db
      .query("rsvp")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    const media = await ctx.db
      .query("media")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    // Delete RSVPs
    for (const rsvp of rsvps) {
      await ctx.db.delete(rsvp._id);
    }

    // Delete media
    for (const item of media) {
      await ctx.db.delete(item._id);
    }

    // Delete the event
    await ctx.db.delete(args.eventId);
    return { success: true };
  },
});

// Get event by ID
export const getEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  },
});

// Get events created by the current user
export const getUserEvents = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("createdBy"), identity.tokenIdentifier))
      .collect();
  },
});