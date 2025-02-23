import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, { tokenIdentifier }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
      .unique();
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    tokenIdentifier: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { name, tokenIdentifier, email }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
      .unique();

    if (!existingUser) {
      await ctx.db.insert("users", { name, tokenIdentifier, email });
    }
  },
});
