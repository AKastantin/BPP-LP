import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name"),
  phone: text("phone"),
  company: text("company"),
  audience_type: text("audience_type").notNull(), // banks, estate_agents, property_investors, property_owners
  lead_source: text("lead_source").notNull(), // property_forecast, survey, demo_request, newsletter, etc.
  metadata: json("metadata"), // additional form data
  created_at: timestamp("created_at").defaultNow(),
});

export const property_forecasts = pgTable("property_forecasts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lead_id: varchar("lead_id").references(() => leads.id),
  property_address: text("property_address").notNull(),
  property_type: text("property_type").notNull(),
  bedrooms: text("bedrooms"),
  email: text("email").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const survey_responses = pgTable("survey_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lead_id: varchar("lead_id").references(() => leads.id),
  responses: json("responses").notNull(), // all survey answers
  completed: boolean("completed").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  email: true,
  name: true,
  phone: true,
  company: true,
  audience_type: true,
  lead_source: true,
  metadata: true,
});

export const insertPropertyForecastSchema = createInsertSchema(property_forecasts).pick({
  property_address: true,
  property_type: true,
  bedrooms: true,
  email: true,
});

export const insertSurveyResponseSchema = createInsertSchema(survey_responses).pick({
  responses: true,
  completed: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertPropertyForecast = z.infer<typeof insertPropertyForecastSchema>;
export type PropertyForecast = typeof property_forecasts.$inferSelect;
export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;
export type SurveyResponse = typeof survey_responses.$inferSelect;
