import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const uploadMedia = mutation({
  args: {
    eventId: v.id("events"),
    uploadedBy: v.string(),
    fileUrl: v.string(),
    fileType: v.union(v.literal("image"), v.literal("video")),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("media", args);
  },
});

export const getMediaForEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    return await ctx.db
      .query("media")
      .withIndex("by_event", (q) => q.eq("eventId", eventId))
      .collect();
  },
});
