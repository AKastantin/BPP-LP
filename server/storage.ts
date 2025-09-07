import { 
  type User, 
  type InsertUser, 
  type Lead, 
  type InsertLead,
  type PropertyForecast,
  type InsertPropertyForecast,
  type SurveyResponse,
  type InsertSurveyResponse,
  type PropertyAddress,
  type InsertPropertyAddress,
  type EmailRequest,
  type InsertEmailRequest
} from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

interface CSVPropertyData {
  uniqueadd: string;
  pcdist: string;
  ptype: string;
  val_2025q2: string;
  val_2026q2: string;
  val_2028q2: string;
  val_2030q2: string;
}

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
  
  getPropertyAddresses(searchTerm?: string): Promise<PropertyAddress[]>;
  createPropertyAddress(address: InsertPropertyAddress): Promise<PropertyAddress>;
  getPropertyDataByAddress(address: string): Promise<CSVPropertyData | undefined>;
  
  createEmailRequest(request: InsertEmailRequest): Promise<EmailRequest>;
  getEmailRequest(id: string): Promise<EmailRequest | undefined>;
  getPendingEmailRequests(): Promise<EmailRequest[]>;
  markEmailRequestAsSent(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private property_forecasts: Map<string, PropertyForecast>;
  private survey_responses: Map<string, SurveyResponse>;
  private property_addresses: Map<string, PropertyAddress>;
  private email_requests: Map<string, EmailRequest>;
  private csvData: Map<string, CSVPropertyData>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.property_forecasts = new Map();
    this.survey_responses = new Map();
    this.property_addresses = new Map();
    this.email_requests = new Map();
    this.csvData = new Map();
    
    // Initialize with real CSV data
    this.initializeCSVData();
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
      name: insertLead.name ?? null,
      phone: insertLead.phone ?? null,
      company: insertLead.company ?? null,
      metadata: insertLead.metadata ?? null,
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
      lead_id: insertForecast.lead_id ?? null,
      bedrooms: insertForecast.bedrooms ?? null,
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
      lead_id: insertResponse.lead_id ?? null,
      completed: insertResponse.completed ?? false,
      created_at: new Date()
    };
    this.survey_responses.set(id, response);
    return response;
  }

  async getSurveyResponse(id: string): Promise<SurveyResponse | undefined> {
    return this.survey_responses.get(id);
  }

  async getPropertyAddresses(searchTerm?: string): Promise<PropertyAddress[]> {
    const csvEntries = Array.from(this.csvData.values());
    
    if (!searchTerm) {
      return csvEntries.slice(0, 20).map(entry => ({
        id: randomUUID(),
        address: entry.uniqueadd,
        postcode: entry.pcdist,
        city: null,
        county: null,
        created_at: new Date()
      }));
    }
    
    const filtered = csvEntries.filter(entry => 
      entry.uniqueadd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.pcdist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.slice(0, 10).map(entry => ({
      id: randomUUID(),
      address: entry.uniqueadd,
      postcode: entry.pcdist,
      city: null,
      county: null,
      created_at: new Date()
    }));
  }

  async createPropertyAddress(address: InsertPropertyAddress): Promise<PropertyAddress> {
    const id = randomUUID();
    const propertyAddress: PropertyAddress = {
      ...address,
      id,
      postcode: address.postcode ?? null,
      city: address.city ?? null,
      county: address.county ?? null,
      created_at: new Date()
    };
    this.property_addresses.set(id, propertyAddress);
    return propertyAddress;
  }

  async getPropertyDataByAddress(address: string): Promise<CSVPropertyData | undefined> {
    return this.csvData.get(address);
  }

  async createEmailRequest(request: InsertEmailRequest): Promise<EmailRequest> {
    const id = randomUUID();
    const emailRequest: EmailRequest = {
      ...request,
      id,
      sent: false,
      created_at: new Date()
    };
    this.email_requests.set(id, emailRequest);
    return emailRequest;
  }

  async getEmailRequest(id: string): Promise<EmailRequest | undefined> {
    return this.email_requests.get(id);
  }

  async getPendingEmailRequests(): Promise<EmailRequest[]> {
    return Array.from(this.email_requests.values()).filter(request => !request.sent);
  }

  async markEmailRequestAsSent(id: string): Promise<void> {
    const request = this.email_requests.get(id);
    if (request) {
      this.email_requests.set(id, { ...request, sent: true });
    }
  }

  private initializeCSVData(): void {
    const csvPath = path.join(process.cwd(), 'value_forecasts_redditch_bromsgrove.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.warn('CSV file not found, using empty data');
      return;
    }

    const results: CSVPropertyData[] = [];
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data: CSVPropertyData) => results.push(data))
      .on('end', () => {
        console.log(`Loaded ${results.length} properties from CSV`);
        results.forEach(entry => {
          this.csvData.set(entry.uniqueadd, entry);
        });
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
      });
  }
}

export const storage = new MemStorage();
