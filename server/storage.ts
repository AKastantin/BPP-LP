import { 
  type User, 
  type InsertUser, 
  type Lead, 
  type InsertLead,
  type PropertyForecast,
  type InsertPropertyForecast,
  type SurveyResponse,
  type InsertSurveyResponse
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLead(lead: InsertLead): Promise<Lead>;
  getLead(id: string): Promise<Lead | undefined>;
  getLeadByEmail(email: string): Promise<Lead | undefined>;
  
  createPropertyForecast(forecast: InsertPropertyForecast & { lead_id?: string }): Promise<PropertyForecast>;
  getPropertyForecast(id: string): Promise<PropertyForecast | undefined>;
  
  createSurveyResponse(response: InsertSurveyResponse & { lead_id?: string }): Promise<SurveyResponse>;
  getSurveyResponse(id: string): Promise<SurveyResponse | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private property_forecasts: Map<string, PropertyForecast>;
  private survey_responses: Map<string, SurveyResponse>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.property_forecasts = new Map();
    this.survey_responses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead, 
      id,
      created_at: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async getLeadByEmail(email: string): Promise<Lead | undefined> {
    return Array.from(this.leads.values()).find(
      (lead) => lead.email === email,
    );
  }

  async createPropertyForecast(insertForecast: InsertPropertyForecast & { lead_id?: string }): Promise<PropertyForecast> {
    const id = randomUUID();
    const forecast: PropertyForecast = { 
      ...insertForecast, 
      id,
      created_at: new Date()
    };
    this.property_forecasts.set(id, forecast);
    return forecast;
  }

  async getPropertyForecast(id: string): Promise<PropertyForecast | undefined> {
    return this.property_forecasts.get(id);
  }

  async createSurveyResponse(insertResponse: InsertSurveyResponse & { lead_id?: string }): Promise<SurveyResponse> {
    const id = randomUUID();
    const response: SurveyResponse = { 
      ...insertResponse, 
      id,
      created_at: new Date()
    };
    this.survey_responses.set(id, response);
    return response;
  }

  async getSurveyResponse(id: string): Promise<SurveyResponse | undefined> {
    return this.survey_responses.get(id);
  }
}

export const storage = new MemStorage();
