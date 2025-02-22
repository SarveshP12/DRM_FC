import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
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
    inviteLink: v.string(),
    sharedMedia: v.array(v.id("media")),
  }).index("by_creator", ["createdBy"]),

  rsvp: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),
    status: v.union(v.literal("accepted"), v.literal("declined"), v.literal("pending")),
  }).index("by_event", ["eventId"]),

  media: defineTable({
    eventId: v.id("events"),
    uploadedBy: v.id("users"),
    fileUrl: v.string(),
    fileType: v.union(v.literal("image"), v.literal("video")),
    createdAt: v.string(),
  }).index("by_event", ["eventId"]),
});
