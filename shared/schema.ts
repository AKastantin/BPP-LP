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

export const property_addresses = pgTable("property_addresses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  address: text("address").notNull(),
  postcode: text("postcode"),
  city: text("city"),
  county: text("county"),
  created_at: timestamp("created_at").defaultNow(),
});

export const email_requests = pgTable("email_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  property_address: text("property_address").notNull(),
  property_results: json("property_results").notNull(), // the property valuation results
  sent: boolean("sent").default(false),
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
  email: true,
});

export const insertSurveyResponseSchema = createInsertSchema(survey_responses).pick({
  responses: true,
  completed: true,
});

export const insertPropertyAddressSchema = createInsertSchema(property_addresses).pick({
  address: true,
  postcode: true,
  city: true,
  county: true,
});

export const insertEmailRequestSchema = createInsertSchema(email_requests).pick({
  email: true,
  property_address: true,
  property_results: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertPropertyForecast = z.infer<typeof insertPropertyForecastSchema>;
export type PropertyForecast = typeof property_forecasts.$inferSelect;
export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;
export type SurveyResponse = typeof survey_responses.$inferSelect;
export type InsertPropertyAddress = z.infer<typeof insertPropertyAddressSchema>;
export type PropertyAddress = typeof property_addresses.$inferSelect;
export type InsertEmailRequest = z.infer<typeof insertEmailRequestSchema>;
export type EmailRequest = typeof email_requests.$inferSelect;
