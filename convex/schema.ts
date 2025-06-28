import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    service: v.string(),
    message: v.string(),
    status: v.optional(v.string()),
  }).index("by_email", ["email"]),
  
  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    publishedAt: v.number(),
    featured: v.optional(v.boolean()),
  }).index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_published", ["publishedAt"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
