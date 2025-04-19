import { db } from "./db";
import {
  membershipPlans,
  trainers,
  gymClasses,
  classSchedules,
  facilities,
  testimonials
} from "@shared/schema";

// Seed the database with initial data
async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Seed membership plans
    console.log("Seeding membership plans...");
    await db.insert(membershipPlans).values([
      {
        name: "Basic Plan",
        price: 29,
        description: "Access to gym facilities and standard equipment",
        features: ["Access to gym facilities", "Standard gym equipment", "Locker access"],
        icon: "fa-dumbbell",
        popular: false
      },
      {
        name: "Premium Plan",
        price: 59,
        description: "All Basic features plus classes and training sessions",
        features: ["All Basic Plan features", "Group fitness classes", "Nutrition consultation", "2 Personal training sessions"],
        icon: "fa-crown",
        popular: true
      },
      {
        name: "Elite Plan",
        price: 99,
        description: "Unlimited access to all premium features",
        features: ["All Premium Plan features", "Unlimited premium classes", "5 Personal training sessions", "Monthly body assessment", "Priority booking for classes"],
        icon: "fa-gem",
        popular: false
      }
    ]);

    // Seed trainers
    console.log("Seeding trainers...");
    const trainerResults = await db.insert(trainers).values([
      {
        name: "John Davis",
        speciality: "HIIT Specialist",
        image: "https://images.unsplash.com/photo-1597347343908-2937e7dcc560?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80",
        instagram: "johndavis",
        facebook: "johndavis",
        twitter: "johndavis"
      },
      {
        name: "Sarah Chen",
        speciality: "Yoga Instructor",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80",
        instagram: "sarahchen",
        facebook: "sarahchen",
        twitter: "sarahchen"
      },
      {
        name: "Mike Johnson",
        speciality: "Cycling Coach",
        image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80",
        instagram: "mikejohnson",
        facebook: "mikejohnson",
        twitter: "mikejohnson"
      },
      {
        name: "Amanda Lee",
        speciality: "Strength Coach",
        image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80",
        instagram: "amandalee",
        facebook: "amandalee",
        twitter: "amandalee"
      }
    ]).returning();

    // Get trainer IDs
    const trainerId1 = trainerResults[0].id;
    const trainerId2 = trainerResults[1].id;
    const trainerId3 = trainerResults[2].id;
    const trainerId4 = trainerResults[3].id;

    // Seed gym classes
    console.log("Seeding gym classes...");
    const classResults = await db.insert(gymClasses).values([
      {
        name: "HIIT Training",
        description: "High-intensity interval training combining cardio and strength exercises for maximum calorie burn.",
        duration: 45,
        image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
        category: "High Intensity",
        price: 15,
        trainerId: trainerId1
      },
      {
        name: "Yoga Flow",
        description: "Fluid movement sequences connecting breath with movement for strength, flexibility and mindfulness.",
        duration: 60,
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
        category: "Mind & Body",
        price: 12,
        trainerId: trainerId2
      },
      {
        name: "Spin Cycle",
        description: "High-energy indoor cycling with motivating music and interval-based choreography for all levels.",
        duration: 50,
        image: "https://images.unsplash.com/photo-1589955791915-526198ae4ee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
        category: "Cardio",
        price: 14,
        trainerId: trainerId3
      },
      {
        name: "Circuit Training",
        description: "A form of body conditioning or resistance training using high-intensity aerobics.",
        duration: 60,
        image: "https://images.unsplash.com/photo-1521805103424-d8f8430e8933?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
        category: "Strength",
        price: 15,
        trainerId: trainerId4
      }
    ]).returning();

    // Get class IDs
    const classId1 = classResults[0].id;
    const classId2 = classResults[1].id;
    const classId3 = classResults[2].id;
    const classId4 = classResults[3].id;

    // Seed class schedules
    console.log("Seeding class schedules...");
    await db.insert(classSchedules).values([
      {
        classId: classId1,
        dayOfWeek: "Tuesday",
        startTime: "07:00",
        endTime: "07:45",
        capacity: 20,
        booked: 12
      },
      {
        classId: classId2,
        dayOfWeek: "Tuesday",
        startTime: "09:30",
        endTime: "10:30",
        capacity: 15,
        booked: 8
      },
      {
        classId: classId3,
        dayOfWeek: "Tuesday",
        startTime: "12:00",
        endTime: "12:50",
        capacity: 20,
        booked: 15
      },
      {
        classId: classId4,
        dayOfWeek: "Tuesday",
        startTime: "18:00",
        endTime: "19:00",
        capacity: 15,
        booked: 4
      }
    ]);

    // Seed facilities
    console.log("Seeding facilities...");
    await db.insert(facilities).values([
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
    ]);

    // Seed testimonials
    console.log("Seeding testimonials...");
    await db.insert(testimonials).values([
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
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Database seeding failed:", error);
    process.exit(1);
  });