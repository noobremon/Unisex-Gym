import { 
  User, InsertUser, MembershipPlan, InsertMembershipPlan, 
  Trainer, InsertTrainer, GymClass, InsertGymClass, 
  ClassSchedule, InsertClassSchedule, Facility, InsertFacility, 
  Testimonial, InsertTestimonial, Booking, InsertBooking, 
  MembershipRegistration, InsertMembershipRegistration, 
  ContactMessage, InsertContactMessage 
} from "@shared/schema";

// Define the storage interface with all required CRUD operations
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Membership Plans
  getMembershipPlans(): Promise<MembershipPlan[]>;
  getMembershipPlan(id: number): Promise<MembershipPlan | undefined>;
  createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan>;
  
  // Trainers
  getTrainers(): Promise<Trainer[]>;
  getTrainer(id: number): Promise<Trainer | undefined>;
  createTrainer(trainer: InsertTrainer): Promise<Trainer>;
  
  // Gym Classes
  getGymClasses(): Promise<GymClass[]>;
  getGymClass(id: number): Promise<GymClass | undefined>;
  createGymClass(gymClass: InsertGymClass): Promise<GymClass>;
  
  // Class Schedules
  getClassSchedules(): Promise<ClassSchedule[]>;
  getClassSchedulesByDay(day: string): Promise<ClassSchedule[]>;
  getClassSchedule(id: number): Promise<ClassSchedule | undefined>;
  createClassSchedule(schedule: InsertClassSchedule): Promise<ClassSchedule>;
  updateClassSchedule(id: number, schedule: Partial<ClassSchedule>): Promise<ClassSchedule | undefined>;
  
  // Facilities
  getFacilities(): Promise<Facility[]>;
  getFacility(id: number): Promise<Facility | undefined>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Membership Registrations
  getMembershipRegistrations(): Promise<MembershipRegistration[]>;
  getMembershipRegistrationsByUser(userId: number): Promise<MembershipRegistration[]>;
  getMembershipRegistration(id: number): Promise<MembershipRegistration | undefined>;
  createMembershipRegistration(registration: InsertMembershipRegistration): Promise<MembershipRegistration>;
  
  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

// Implement in-memory storage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private membershipPlans: Map<number, MembershipPlan>;
  private trainers: Map<number, Trainer>;
  private gymClasses: Map<number, GymClass>;
  private classSchedules: Map<number, ClassSchedule>;
  private facilities: Map<number, Facility>;
  private testimonials: Map<number, Testimonial>;
  private bookings: Map<number, Booking>;
  private membershipRegistrations: Map<number, MembershipRegistration>;
  private contactMessages: Map<number, ContactMessage>;
  
  private userId: number;
  private membershipPlanId: number;
  private trainerId: number;
  private gymClassId: number;
  private classScheduleId: number;
  private facilityId: number;
  private testimonialId: number;
  private bookingId: number;
  private membershipRegistrationId: number;
  private contactMessageId: number;
  
  constructor() {
    this.users = new Map();
    this.membershipPlans = new Map();
    this.trainers = new Map();
    this.gymClasses = new Map();
    this.classSchedules = new Map();
    this.facilities = new Map();
    this.testimonials = new Map();
    this.bookings = new Map();
    this.membershipRegistrations = new Map();
    this.contactMessages = new Map();
    
    this.userId = 1;
    this.membershipPlanId = 1;
    this.trainerId = 1;
    this.gymClassId = 1;
    this.classScheduleId = 1;
    this.facilityId = 1;
    this.testimonialId = 1;
    this.bookingId = 1;
    this.membershipRegistrationId = 1;
    this.contactMessageId = 1;
    
    this.initializeData();
  }
  
  private initializeData() {
    // Initialize membership plans
    const basicPlan: InsertMembershipPlan = {
      name: "Basic Plan",
      price: 29,
      description: "Access to gym facilities and standard equipment",
      features: ["Access to gym facilities", "Standard gym equipment", "Locker access"],
      icon: "fa-dumbbell",
      popular: false
    };
    
    const premiumPlan: InsertMembershipPlan = {
      name: "Premium Plan",
      price: 59,
      description: "All Basic features plus classes and training sessions",
      features: ["All Basic Plan features", "Group fitness classes", "Nutrition consultation", "2 Personal training sessions"],
      icon: "fa-crown",
      popular: true
    };
    
    const elitePlan: InsertMembershipPlan = {
      name: "Elite Plan",
      price: 99,
      description: "Unlimited access to all premium features",
      features: ["All Premium Plan features", "Unlimited premium classes", "5 Personal training sessions", "Monthly body assessment", "Priority booking for classes"],
      icon: "fa-gem",
      popular: false
    };
    
    this.createMembershipPlan(basicPlan);
    this.createMembershipPlan(premiumPlan);
    this.createMembershipPlan(elitePlan);
    
    // Initialize trainers
    const trainer1: InsertTrainer = {
      name: "John Davis",
      speciality: "HIIT Specialist",
      image: "https://images.unsplash.com/photo-1597347343908-2937e7dcc560?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80",
      instagram: "johndavis",
      facebook: "johndavis",
      twitter: "johndavis"
    };
    
    const trainer2: InsertTrainer = {
      name: "Sarah Chen",
      speciality: "Yoga Instructor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80",
      instagram: "sarahchen",
      facebook: "sarahchen",
      twitter: "sarahchen"
    };
    
    const trainer3: InsertTrainer = {
      name: "Mike Johnson",
      speciality: "Cycling Coach",
      image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80",
      instagram: "mikejohnson",
      facebook: "mikejohnson",
      twitter: "mikejohnson"
    };
    
    const trainer4: InsertTrainer = {
      name: "Amanda Lee",
      speciality: "Strength Coach",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80",
      instagram: "amandalee",
      facebook: "amandalee",
      twitter: "amandalee"
    };
    
    const trainer1Id = this.createTrainer(trainer1).id;
    const trainer2Id = this.createTrainer(trainer2).id;
    const trainer3Id = this.createTrainer(trainer3).id;
    const trainer4Id = this.createTrainer(trainer4).id;
    
    // Initialize gym classes
    const hiitClass: InsertGymClass = {
      name: "HIIT Training",
      description: "High-intensity interval training combining cardio and strength exercises for maximum calorie burn.",
      duration: 45,
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "High Intensity",
      price: 15,
      trainerId: trainer1Id
    };
    
    const yogaClass: InsertGymClass = {
      name: "Yoga Flow",
      description: "Fluid movement sequences connecting breath with movement for strength, flexibility and mindfulness.",
      duration: 60,
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Mind & Body",
      price: 12,
      trainerId: trainer2Id
    };
    
    const spinClass: InsertGymClass = {
      name: "Spin Cycle",
      description: "High-energy indoor cycling with motivating music and interval-based choreography for all levels.",
      duration: 50,
      image: "https://images.unsplash.com/photo-1589955791915-526198ae4ee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Cardio",
      price: 14,
      trainerId: trainer3Id
    };
    
    const circuitClass: InsertGymClass = {
      name: "Circuit Training",
      description: "A form of body conditioning or resistance training using high-intensity aerobics.",
      duration: 60,
      image: "https://images.unsplash.com/photo-1521805103424-d8f8430e8933?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Strength",
      price: 15,
      trainerId: trainer4Id
    };
    
    const class1Id = this.createGymClass(hiitClass).id;
    const class2Id = this.createGymClass(yogaClass).id;
    const class3Id = this.createGymClass(spinClass).id;
    const class4Id = this.createGymClass(circuitClass).id;
    
    // Initialize class schedules
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // Sample schedules for Tuesday (selected in the UI)
    this.createClassSchedule({
      classId: class1Id,
      dayOfWeek: "Tuesday",
      startTime: "07:00",
      endTime: "07:45",
      capacity: 20,
      booked: 12
    });
    
    this.createClassSchedule({
      classId: class2Id,
      dayOfWeek: "Tuesday",
      startTime: "09:30",
      endTime: "10:30",
      capacity: 15,
      booked: 8
    });
    
    this.createClassSchedule({
      classId: class3Id,
      dayOfWeek: "Tuesday",
      startTime: "12:00",
      endTime: "12:50",
      capacity: 20,
      booked: 15
    });
    
    this.createClassSchedule({
      classId: class4Id,
      dayOfWeek: "Tuesday",
      startTime: "18:00",
      endTime: "19:00",
      capacity: 15,
      booked: 4
    });
    
    // Initialize facilities
    const facilities = [
      {
        name: "Cardio Zone",
        description: "State-of-the-art treadmills, ellipticals, bikes, and rowing machines with individual entertainment screens.",
        image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
      },
      {
        name: "Strength Area",
        description: "Comprehensive free weight section, power racks, and specialized machines for targeted strength training.",
        image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
      },
      {
        name: "Functional Training",
        description: "Open space with TRX, kettlebells, battle ropes, medicine balls, and other functional equipment.",
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
      },
      {
        name: "Studio Rooms",
        description: "Dedicated spaces for group classes including yoga, spinning, HIIT, and other specialty fitness programs.",
        image: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
      },
      {
        name: "Recovery Zone",
        description: "Sauna, steam room, cold plunge, and massage therapy rooms to enhance recovery and relaxation.",
        image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
      },
      {
        name: "Locker Rooms",
        description: "Modern locker rooms with showers, changing areas, and amenities for comfort and convenience.",
        image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
      }
    ];
    
    facilities.forEach(facility => {
      this.createFacility(facility);
    });
    
    // Initialize testimonials
    const testimonials = [
      {
        name: "Sarah J.",
        image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
        testimonial: "I've lost 30 pounds since joining FlexFit! The trainers are amazing and the community keeps me motivated. Best decision I ever made.",
        achievement: "Lost 30 lbs",
        rating: 5,
        duration: "Member for 6 months"
      },
      {
        name: "Michael T.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
        testimonial: "After trying many gyms, I finally found my home at FlexFit. The facilities are top-notch and the trainers really care about your progress.",
        achievement: "Gained 12 lbs muscle",
        rating: 4,
        duration: "Member for 1 year"
      },
      {
        name: "Emily R.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80",
        testimonial: "The yoga classes here transformed not just my body but my mind. I've never felt stronger or more centered. Worth every penny!",
        achievement: "Improved flexibility",
        rating: 5,
        duration: "Member for 8 months"
      }
    ];
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const id = this.userId++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
  
  // Membership Plans methods
  async getMembershipPlans(): Promise<MembershipPlan[]> {
    return Array.from(this.membershipPlans.values());
  }
  
  async getMembershipPlan(id: number): Promise<MembershipPlan | undefined> {
    return this.membershipPlans.get(id);
  }
  
  async createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan> {
    const id = this.membershipPlanId++;
    const newPlan: MembershipPlan = { ...plan, id };
    this.membershipPlans.set(id, newPlan);
    return newPlan;
  }
  
  // Trainers methods
  async getTrainers(): Promise<Trainer[]> {
    return Array.from(this.trainers.values());
  }
  
  async getTrainer(id: number): Promise<Trainer | undefined> {
    return this.trainers.get(id);
  }
  
  async createTrainer(trainer: InsertTrainer): Promise<Trainer> {
    const id = this.trainerId++;
    const newTrainer: Trainer = { ...trainer, id };
    this.trainers.set(id, newTrainer);
    return newTrainer;
  }
  
  // Gym Classes methods
  async getGymClasses(): Promise<GymClass[]> {
    return Array.from(this.gymClasses.values());
  }
  
  async getGymClass(id: number): Promise<GymClass | undefined> {
    return this.gymClasses.get(id);
  }
  
  async createGymClass(gymClass: InsertGymClass): Promise<GymClass> {
    const id = this.gymClassId++;
    const newGymClass: GymClass = { ...gymClass, id };
    this.gymClasses.set(id, newGymClass);
    return newGymClass;
  }
  
  // Class Schedules methods
  async getClassSchedules(): Promise<ClassSchedule[]> {
    return Array.from(this.classSchedules.values());
  }
  
  async getClassSchedulesByDay(day: string): Promise<ClassSchedule[]> {
    return Array.from(this.classSchedules.values()).filter(
      schedule => schedule.dayOfWeek === day
    );
  }
  
  async getClassSchedule(id: number): Promise<ClassSchedule | undefined> {
    return this.classSchedules.get(id);
  }
  
  async createClassSchedule(schedule: InsertClassSchedule): Promise<ClassSchedule> {
    const id = this.classScheduleId++;
    const newSchedule: ClassSchedule = { ...schedule, id };
    this.classSchedules.set(id, newSchedule);
    return newSchedule;
  }
  
  async updateClassSchedule(id: number, scheduleUpdate: Partial<ClassSchedule>): Promise<ClassSchedule | undefined> {
    const schedule = this.classSchedules.get(id);
    if (!schedule) {
      return undefined;
    }
    
    const updatedSchedule = { ...schedule, ...scheduleUpdate };
    this.classSchedules.set(id, updatedSchedule);
    return updatedSchedule;
  }
  
  // Facilities methods
  async getFacilities(): Promise<Facility[]> {
    return Array.from(this.facilities.values());
  }
  
  async getFacility(id: number): Promise<Facility | undefined> {
    return this.facilities.get(id);
  }
  
  async createFacility(facility: InsertFacility): Promise<Facility> {
    const id = this.facilityId++;
    const newFacility: Facility = { ...facility, id };
    this.facilities.set(id, newFacility);
    return newFacility;
  }
  
  // Testimonials methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  // Bookings methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
  
  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.userId === userId
    );
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const newBooking: Booking = { ...booking, id };
    this.bookings.set(id, newBooking);
    
    // Update the class schedule booked count
    const schedule = await this.getClassSchedule(booking.scheduleId);
    if (schedule) {
      await this.updateClassSchedule(schedule.id, { booked: schedule.booked + 1 });
    }
    
    return newBooking;
  }
  
  // Membership Registrations methods
  async getMembershipRegistrations(): Promise<MembershipRegistration[]> {
    return Array.from(this.membershipRegistrations.values());
  }
  
  async getMembershipRegistrationsByUser(userId: number): Promise<MembershipRegistration[]> {
    return Array.from(this.membershipRegistrations.values()).filter(
      registration => registration.userId === userId
    );
  }
  
  async getMembershipRegistration(id: number): Promise<MembershipRegistration | undefined> {
    return this.membershipRegistrations.get(id);
  }
  
  async createMembershipRegistration(registration: InsertMembershipRegistration): Promise<MembershipRegistration> {
    const id = this.membershipRegistrationId++;
    const newRegistration: MembershipRegistration = { ...registration, id };
    this.membershipRegistrations.set(id, newRegistration);
    return newRegistration;
  }
  
  // Contact Messages methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const createdAt = new Date();
    const newMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
