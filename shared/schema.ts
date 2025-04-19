import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull()
});

export const membershipPlans = pgTable("membership_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  icon: text("icon").notNull(),
  popular: boolean("popular").default(false)
});

export const trainers = pgTable("trainers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  speciality: text("speciality").notNull(),
  image: text("image").notNull(),
  instagram: text("instagram"),
  facebook: text("facebook"),
  twitter: text("twitter")
});

export const gymClasses = pgTable("gym_classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(), 
  duration: integer("duration").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  trainerId: integer("trainer_id").notNull()
});

export const classSchedules = pgTable("class_schedules", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  capacity: integer("capacity").notNull(),
  booked: integer("booked").default(0)
});

export const facilities = pgTable("facilities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull()
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  testimonial: text("testimonial").notNull(),
  achievement: text("achievement").notNull(),
  rating: integer("rating").notNull(),
  duration: text("duration").notNull()
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  scheduleId: integer("schedule_id").notNull(),
  bookingDate: timestamp("booking_date").notNull(),
  status: text("status").notNull()
});

export const membershipRegistrations = pgTable("membership_registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  planId: integer("plan_id").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  status: text("status").notNull()
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull()
});

// Insert schemas for all tables
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertMembershipPlanSchema = createInsertSchema(membershipPlans).omit({ id: true });
export const insertTrainerSchema = createInsertSchema(trainers).omit({ id: true });
export const insertGymClassSchema = createInsertSchema(gymClasses).omit({ id: true });
export const insertClassScheduleSchema = createInsertSchema(classSchedules).omit({ id: true });
export const insertFacilitySchema = createInsertSchema(facilities).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true });
export const insertMembershipRegistrationSchema = createInsertSchema(membershipRegistrations).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

// Insert types for all tables
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMembershipPlan = z.infer<typeof insertMembershipPlanSchema>;
export type InsertTrainer = z.infer<typeof insertTrainerSchema>;
export type InsertGymClass = z.infer<typeof insertGymClassSchema>;
export type InsertClassSchedule = z.infer<typeof insertClassScheduleSchema>;
export type InsertFacility = z.infer<typeof insertFacilitySchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertMembershipRegistration = z.infer<typeof insertMembershipRegistrationSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// Select types for all tables
export type User = typeof users.$inferSelect;
export type MembershipPlan = typeof membershipPlans.$inferSelect;
export type Trainer = typeof trainers.$inferSelect;
export type GymClass = typeof gymClasses.$inferSelect;
export type ClassSchedule = typeof classSchedules.$inferSelect;
export type Facility = typeof facilities.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type MembershipRegistration = typeof membershipRegistrations.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Extended schemas for API validation
export const contactMessageSchema = insertContactMessageSchema.extend({
  createdAt: z.date().optional(),
});

export const bookClassSchema = z.object({
  userId: z.number(),
  scheduleId: z.number()
});

export const registerMembershipSchema = z.object({
  userId: z.number(),
  planId: z.number()
});
