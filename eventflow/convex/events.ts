import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
    createdBy: v.string(),
    inviteLink: v.string(),
    sharedMedia: v.array(v.id("media")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});

export const getEventsByUser = query({
  args: { createdBy: v.string() },
  handler: async (ctx, { createdBy }) => {
    return await ctx.db
      .query("events")
      .withIndex("by_creator", (q) => q.eq("createdBy", createdBy))
      .collect();
  },
});

export const getEventById = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    return await ctx.db.get(eventId);
  },
});
