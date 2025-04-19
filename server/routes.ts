import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  contactMessageSchema, 
  bookClassSchema, 
  registerMembershipSchema 
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route("/api");
  
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  // Get membership plans
  app.get("/api/membership-plans", async (req, res) => {
    try {
      const plans = await storage.getMembershipPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch membership plans" });
    }
  });
  
  // Get membership plan by ID
  app.get("/api/membership-plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const plan = await storage.getMembershipPlan(id);
      if (!plan) {
        return res.status(404).json({ message: "Membership plan not found" });
      }
      
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch membership plan" });
    }
  });
  
  // Register for membership
  app.post("/api/membership-registration", async (req, res) => {
    try {
      const data = registerMembershipSchema.parse(req.body);
      
      // Validate that user and plan exist
      const user = await storage.getUser(data.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const plan = await storage.getMembershipPlan(data.planId);
      if (!plan) {
        return res.status(404).json({ message: "Membership plan not found" });
      }
      
      // Create registration
      const registration = await storage.createMembershipRegistration({
        userId: data.userId,
        planId: data.planId,
        startDate: new Date(),
        status: "active"
      });
      
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to register for membership" });
      }
    }
  });
  
  // Get trainers
  app.get("/api/trainers", async (req, res) => {
    try {
      const trainers = await storage.getTrainers();
      res.json(trainers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trainers" });
    }
  });
  
  // Get gym classes
  app.get("/api/classes", async (req, res) => {
    try {
      const classes = await storage.getGymClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classes" });
    }
  });
  
  // Get facilities
  app.get("/api/facilities", async (req, res) => {
    try {
      const facilities = await storage.getFacilities();
      res.json(facilities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });
  
  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // Get class schedules
  app.get("/api/class-schedules", async (req, res) => {
    try {
      const day = req.query.day as string;
      let schedules;
      
      if (day) {
        schedules = await storage.getClassSchedulesByDay(day);
      } else {
        schedules = await storage.getClassSchedules();
      }
      
      // Enrich schedules with class details
      const enrichedSchedules = await Promise.all(
        schedules.map(async (schedule) => {
          const gymClass = await storage.getGymClass(schedule.classId);
          const trainer = gymClass ? await storage.getTrainer(gymClass.trainerId) : null;
          
          return {
            ...schedule,
            class: gymClass,
            trainer: trainer
          };
        })
      );
      
      res.json(enrichedSchedules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch class schedules" });
    }
  });
  
  // Book a class
  app.post("/api/book-class", async (req, res) => {
    try {
      const data = bookClassSchema.parse(req.body);
      
      // Validate that user and schedule exist
      const user = await storage.getUser(data.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const schedule = await storage.getClassSchedule(data.scheduleId);
      if (!schedule) {
        return res.status(404).json({ message: "Class schedule not found" });
      }
      
      // Check if class is full
      if (schedule.booked >= schedule.capacity) {
        return res.status(400).json({ message: "Class is full" });
      }
      
      // Create booking
      const booking = await storage.createBooking({
        userId: data.userId,
        scheduleId: data.scheduleId,
        bookingDate: new Date(),
        status: "confirmed"
      });
      
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to book class" });
      }
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        createdAt: new Date()
      });
      
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
