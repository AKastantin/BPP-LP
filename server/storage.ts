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

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.property_forecasts = new Map();
    this.survey_responses = new Map();
    this.property_addresses = new Map();
    this.email_requests = new Map();
    
    // Initialize with dummy addresses
    this.initializeDummyAddresses();
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
    const addresses = Array.from(this.property_addresses.values());
    
    if (!searchTerm) {
      return addresses.slice(0, 20); // Return first 20 addresses for autocomplete
    }
    
    const filtered = addresses.filter(address => 
      address.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.postcode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.slice(0, 10); // Return max 10 results
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

  private initializeDummyAddresses(): void {
    const dummyAddresses = [
      { address: "123 Baker Street, London", postcode: "NW1 6XE", city: "London", county: "Greater London" },
      { address: "45 Oxford Street, London", postcode: "W1D 2DZ", city: "London", county: "Greater London" },
      { address: "78 Regent Street, London", postcode: "W1B 5AH", city: "London", county: "Greater London" },
      { address: "12 Piccadilly, London", postcode: "W1J 0BT", city: "London", county: "Greater London" },
      { address: "34 Bond Street, London", postcode: "W1S 2SR", city: "London", county: "Greater London" },
      { address: "56 King's Road, London", postcode: "SW3 4UD", city: "London", county: "Greater London" },
      { address: "89 Fulham Road, London", postcode: "SW3 6HR", city: "London", county: "Greater London" },
      { address: "23 Knightsbridge, London", postcode: "SW1X 7LY", city: "London", county: "Greater London" },
      { address: "67 Sloane Street, London", postcode: "SW1X 9SP", city: "London", county: "Greater London" },
      { address: "91 Brompton Road, London", postcode: "SW3 1ER", city: "London", county: "Greater London" },
      { address: "15 Park Lane, London", postcode: "W1K 1QA", city: "London", county: "Greater London" },
      { address: "42 Grosvenor Square, London", postcode: "W1K 2HP", city: "London", county: "Greater London" },
      { address: "8 Berkeley Square, London", postcode: "W1J 6DB", city: "London", county: "Greater London" },
      { address: "29 Mount Street, London", postcode: "W1K 3SB", city: "London", county: "Greater London" },
      { address: "73 Curzon Street, London", postcode: "W1J 7TF", city: "London", county: "Greater London" },
      { address: "156 Victoria Street, London", postcode: "SW1E 5LB", city: "London", county: "Greater London" },
      { address: "88 Buckingham Palace Road, London", postcode: "SW1W 0TQ", city: "London", county: "Greater London" },
      { address: "201 Westminster Bridge Road, London", postcode: "SE1 7UT", city: "London", county: "Greater London" },
      { address: "45 Southwark Street, London", postcode: "SE1 1UN", city: "London", county: "Greater London" },
      { address: "92 Borough High Street, London", postcode: "SE1 1LL", city: "London", county: "Greater London" },
      { address: "17 Tower Bridge Road, London", postcode: "SE1 2UP", city: "London", county: "Greater London" },
      { address: "63 Bermondsey Street, London", postcode: "SE1 3XF", city: "London", county: "Greater London" },
      { address: "28 Tooley Street, London", postcode: "SE1 2QY", city: "London", county: "Greater London" },
      { address: "84 London Bridge Street, London", postcode: "SE1 9SG", city: "London", county: "Greater London" },
      { address: "156 Blackfriars Road, London", postcode: "SE1 8EN", city: "London", county: "Greater London" },
      { address: "45 Waterloo Road, London", postcode: "SE1 8UL", city: "London", county: "Greater London" },
      { address: "72 Stamford Street, London", postcode: "SE1 9NY", city: "London", county: "Greater London" },
      { address: "93 The Cut, London", postcode: "SE1 8LN", city: "London", county: "Greater London" },
      { address: "34 Lower Marsh, London", postcode: "SE1 7RG", city: "London", county: "Greater London" },
      { address: "67 Waterloo Station, London", postcode: "SE1 8SW", city: "London", county: "Greater London" }
    ];

    dummyAddresses.forEach(addr => {
      const id = randomUUID();
      const propertyAddress: PropertyAddress = {
        ...addr,
        id,
        created_at: new Date()
      };
      this.property_addresses.set(id, propertyAddress);
    });
  }
}

export const storage = new MemStorage();
