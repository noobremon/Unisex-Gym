import { z } from "zod";

// --- MEMBERSHIP PLAN ---
export const membershipPlanSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  features: z.string().array(),
  icon: z.string(),
  popular: z.boolean().optional(),
});
export type MembershipPlan = z.infer<typeof membershipPlanSchema>;

// --- GYM CLASS ---
export const gymClassSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  level: z.string(),
  duration: z.number(),
  rating: z.number(),
  category: z.string().optional(),
  price: z.number().optional(),
});
export type GymClass = z.infer<typeof gymClassSchema>;

// --- CLASS SCHEDULE ---
export const classScheduleSchema = z.object({
  id: z.number(),
  classId: z.number(),
  trainerId: z.number(),
  day: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  booked: z.number(),
  capacity: z.number(),
});
export type ClassSchedule = z.infer<typeof classScheduleSchema>;

// --- TRAINER ---
export const trainerSchema = z.object({
  id: z.number(),
  name: z.string(),
  speciality: z.string(),
  image: z.string(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
});
export type Trainer = z.infer<typeof trainerSchema>;

// --- FACILITY ---
export const facilitySchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
});
export type Facility = z.infer<typeof facilitySchema>;

// --- TESTIMONIAL ---
export const testimonialSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  testimonial: z.string(),
  rating: z.number(),
  achievement: z.string(),
  duration: z.string(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

// --- CONTACT MESSAGE ---
export const contactMessageSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
  createdAt: z.date().optional()
});
export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type InsertContactMessage = Omit<ContactMessage, "id" | "createdAt">;
