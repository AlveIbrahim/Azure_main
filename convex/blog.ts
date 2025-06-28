import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("blogPosts", {
      ...args,
      publishedAt: Date.now(),
    });
    return postId;
  },
});

export const getPosts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const query = ctx.db.query("blogPosts").order("desc");
    if (args.limit) {
      return await query.take(args.limit);
    }
    return await query.collect();
  },
});

export const getFeaturedPosts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blogPosts")
      .filter((q) => q.eq(q.field("featured"), true))
      .order("desc")
      .take(3);
  },
});
