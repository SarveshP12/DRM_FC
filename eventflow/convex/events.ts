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
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const inviteLink = `https://yourapp.com/invite/${crypto.randomUUID()}`;
    return await ctx.db.insert("events", { ...args, inviteLink, sharedMedia: [] });
  },
});

export const getEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.eventId);
  },
});
