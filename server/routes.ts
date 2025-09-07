import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { telegramService } from "./telegram";
import { insertLeadSchema, insertPropertyForecastSchema, insertSurveyResponseSchema, insertEmailRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead creation endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);
      
      // Send Telegram notification
      await telegramService.sendMessage(
        telegramService.formatContactFormMessage({
          name: data.name || undefined,
          email: data.email,
          phone: data.phone || undefined,
          company: data.company || undefined,
          audience_type: data.audience_type,
          message: data.metadata ? JSON.stringify(data.metadata) : undefined
        })
      );
      
      res.json({ success: true, lead });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Property forecast endpoint
  app.post("/api/property-forecast", async (req, res) => {
    try {
      const forecastData = insertPropertyForecastSchema.parse(req.body);
      
      // Create or find lead by email
      let lead = await storage.getLeadByEmail(forecastData.email);
      if (!lead) {
        lead = await storage.createLead({
          email: forecastData.email,
          audience_type: "property_owners",
          lead_source: "property_forecast",
          name: null,
          phone: null,
          company: null,
          metadata: null
        });
      }

      const forecast = await storage.createPropertyForecast({
        ...forecastData,
        lead_id: lead.id
      });

      // Simulate AI valuation results
      const currentValue = Math.floor(Math.random() * 500000) + 200000;
      const oneYearForecast = Math.floor(currentValue * (1 + (Math.random() * 0.1 + 0.02)));
      const fiveYearForecast = Math.floor(currentValue * (1 + (Math.random() * 0.4 + 0.15)));
      const confidence = Math.floor(Math.random() * 10 + 90);

      const results = {
        currentValue,
        oneYearForecast,
        fiveYearForecast,
        confidence,
        oneYearGrowth: ((oneYearForecast - currentValue) / currentValue * 100).toFixed(1),
        fiveYearGrowth: ((fiveYearForecast - currentValue) / currentValue * 100).toFixed(1)
      };

      // Send Telegram notification
      await telegramService.sendMessage(
        telegramService.formatPropertyUpdateMessage({
          email: forecastData.email,
          property_address: forecastData.property_address,
          property_type: forecastData.property_type,
          bedrooms: forecastData.bedrooms || undefined
        })
      );

      res.json({ 
        success: true, 
        forecast,
        results
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Survey response endpoint
  app.post("/api/survey", async (req, res) => {
    try {
      const surveyData = insertSurveyResponseSchema.extend({
        email: z.string().email().optional()
      }).parse(req.body);
      
      let lead_id: string | undefined;
      
      if (surveyData.email) {
        let lead = await storage.getLeadByEmail(surveyData.email);
        if (!lead) {
          lead = await storage.createLead({
            email: surveyData.email,
            audience_type: "property_owners",
            lead_source: "survey",
            name: null,
            phone: null,
            company: null,
            metadata: surveyData.responses
          });
        }
        lead_id = lead.id;
      }

      const response = await storage.createSurveyResponse({
        responses: surveyData.responses,
        completed: surveyData.completed,
        lead_id
      });

      res.json({ success: true, response });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Demo request endpoint
  app.post("/api/demo-request", async (req, res) => {
    try {
      const demoData = z.object({
        email: z.string().email(),
        name: z.string().min(1),
        company: z.string().optional(),
        phone: z.string().optional(),
        audience_type: z.enum(["banks", "estate_agents", "property_investors", "property_owners"])
      }).parse(req.body);

      const lead = await storage.createLead({
        ...demoData,
        lead_source: "demo_request",
        metadata: null
      });

      res.json({ success: true, lead });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Newsletter signup endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = z.object({
        email: z.string().email(),
        name: z.string().optional()
      }).parse(req.body);

      let lead = await storage.getLeadByEmail(newsletterData.email);
      if (!lead) {
        lead = await storage.createLead({
          email: newsletterData.email,
          name: newsletterData.name || null,
          audience_type: "property_owners",
          lead_source: "newsletter",
          phone: null,
          company: null,
          metadata: null
        });
      }

      res.json({ success: true, lead });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Address autocomplete endpoint
  app.get("/api/addresses", async (req, res) => {
    try {
      const searchTerm = req.query.q as string;
      const addresses = await storage.getPropertyAddresses(searchTerm);
      
      res.json({ 
        success: true, 
        addresses: addresses.map(addr => ({
          id: addr.id,
          address: addr.address,
          postcode: addr.postcode,
          city: addr.city,
          county: addr.county
        }))
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  // Property search endpoint
  app.post("/api/property-search", async (req, res) => {
    try {
      const searchData = z.object({
        address: z.string().min(1),
        property_type: z.string().optional(),
        bedrooms: z.string().optional()
      }).parse(req.body);

      // Simulate property search results with dummy data
      const currentValue = Math.floor(Math.random() * 500000) + 200000;
      const oneYearForecast = Math.floor(currentValue * (1 + (Math.random() * 0.1 + 0.02)));
      const fiveYearForecast = Math.floor(currentValue * (1 + (Math.random() * 0.4 + 0.15)));
      const confidence = Math.floor(Math.random() * 10 + 90);

      const results = {
        currentValue,
        oneYearForecast,
        fiveYearForecast,
        confidence,
        oneYearGrowth: ((oneYearForecast - currentValue) / currentValue * 100).toFixed(1),
        fiveYearGrowth: ((fiveYearForecast - currentValue) / currentValue * 100).toFixed(1),
        propertyType: searchData.property_type || "Unknown",
        bedrooms: searchData.bedrooms || "Unknown",
        address: searchData.address
      };

      res.json({ 
        success: true, 
        results
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Email results request endpoint
  app.post("/api/email-results", async (req, res) => {
    try {
      const emailData = insertEmailRequestSchema.parse(req.body);
      const emailRequest = await storage.createEmailRequest(emailData);
      
      // Send Telegram notification
      await telegramService.sendMessage(
        telegramService.formatEmailRequestMessage({
          email: emailData.email,
          property_address: emailData.property_address,
          results: emailData.property_results
        })
      );
      
      res.json({ success: true, emailRequest });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
