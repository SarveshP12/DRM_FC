import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRSVP = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
    status: v.union(v.literal("accepted"), v.literal("declined"), v.literal("pending")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("rsvp", args);
  },
});

export const getRSVPsForEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    return await ctx.db
      .query("rsvp")
      .withIndex("by_event", (q) => q.eq("eventId", eventId))
      .collect();
  },
});

export const updateRSVP = mutation({
  args: {
    rsvpId: v.id("rsvp"),
    status: v.union(v.literal("accepted"), v.literal("declined"), v.literal("pending")),
  },
  handler: async (ctx, { rsvpId, status }) => {
    await ctx.db.patch(rsvpId, { status });
  },
});
