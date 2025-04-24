import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GymClass, ClassSchedule, Trainer } from '@shared/schema';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface EnrichedSchedule extends ClassSchedule {
  class?: GymClass;
  trainer?: Trainer;
}

const ClassSection = () => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState('Tuesday'); // Default to Tuesday as shown in design
  
  // --- MOCK DATA ---
  const mockClasses = [
    {
      id: 1,
      name: 'HIIT Blast',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      description: 'High-intensity interval training for all levels.',
      level: 'All Levels',
      duration: 45,
      rating: 5,
      category: 'Strength',
      price: 10,
    },
    {
      id: 2,
      name: 'Yoga Flow',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      description: 'Flow through yoga poses to improve flexibility.',
      level: 'Beginner',
      duration: 60,
      rating: 4,
      category: 'Yoga',
      price: 12,
    },
    {
      id: 3,
      name: 'Strength Circuit',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80',
      description: 'Build strength with guided circuits.',
      level: 'Intermediate',
      duration: 50,
      rating: 5,
      category: 'Strength',
      price: 15,
    },
    {
      id: 4,
      name: 'Cardio Burn',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      description: 'Burn calories with fast-paced cardio routines.',
      level: 'All Levels',
      duration: 40,
      rating: 4.5,
      category: 'Cardio',
      price: 11,
    },
    {
      id: 5,
      name: 'Pilates Core',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      description: 'Strengthen your core and improve flexibility.',
      level: 'Beginner',
      duration: 55,
      rating: 4.7,
      category: 'Pilates',
      price: 13,
    },
  ];

  const mockSchedules = [
    // Tuesday
    {
      id: 1,
      classId: 1,
      trainerId: 1,
      day: 'Tuesday',
      startTime: '07:00',
      endTime: '07:45',
      booked: 5,
      capacity: 12,
      class: mockClasses[0],
      trainer: { id: 1, name: 'Alex Turner', speciality: 'HIIT', image: 'trainer1.jpg' },
    },
    {
      id: 2,
      classId: 2,
      trainerId: 2,
      day: 'Tuesday',
      startTime: '09:00',
      endTime: '10:00',
      booked: 8,
      capacity: 15,
      class: mockClasses[1],
      trainer: { id: 2, name: 'Sara Lee', speciality: 'Yoga', image: 'trainer2.jpg' },
    },
    // Wednesday
    {
      id: 3,
      classId: 3,
      trainerId: 3,
      day: 'Wednesday',
      startTime: '18:00',
      endTime: '18:50',
      booked: 4,
      capacity: 10,
      class: mockClasses[2],
      trainer: { id: 3, name: 'Mike Chen', speciality: 'Strength', image: 'trainer3.jpg' },
    },
    // Thursday
    {
      id: 4,
      classId: 4,
      trainerId: 4,
      day: 'Thursday',
      startTime: '17:00',
      endTime: '17:40',
      booked: 10,
      capacity: 12,
      class: mockClasses[3],
      trainer: { id: 4, name: 'Lily Evans', speciality: 'Cardio', image: 'trainer4.jpg' },
    },
    // Friday
    {
      id: 5,
      classId: 5,
      trainerId: 2,
      day: 'Friday',
      startTime: '08:00',
      endTime: '08:55',
      booked: 7,
      capacity: 15,
      class: mockClasses[4],
      trainer: { id: 2, name: 'Sara Lee', speciality: 'Pilates', image: 'trainer2.jpg' },
    },
  ];
  
  const classes = mockClasses;
  const isLoadingClasses = false;

  const schedules = mockSchedules.filter(s => s.day === selectedDay);
  const displaySchedules = schedules.length === 0 ? mockSchedules : schedules;
  const isLoadingSchedules = false;
  
  // Book a class mutation
  const bookClassMutation = {
    mutate: (scheduleId: number) => {
      // In a real app, we would get the userId from auth context
      toast({
        title: "Success!",
        description: "Class booked successfully.",
        variant: "default",
      });
    },
  };
  
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Featured classes (show all for this section)
  const featuredClasses = classes;
  
  const handleBookClass = (scheduleId: number) => {
    bookClassMutation.mutate(scheduleId);
  };
  
  return (
    <section id="classes" className="py-20 bg-[#0c0c0c] dark:bg-[#0c0c0c] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">Our <span className="text-primary">Classes</span></h2>
          <p className="text-neutral/80 max-w-2xl mx-auto">
            Join our expert-led classes designed for all fitness levels. Book your spot and start your fitness journey today.
          </p>
        </div>

        {/* Featured Classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredClasses.map((gymClass, index) => (
            <motion.div
              key={gymClass.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="class-card rounded-xl overflow-hidden bg-dark border border-gray-800 shadow-xl"
            >
              <div className="relative h-48">
                <img 
                  src={gymClass.image} 
                  alt={gymClass.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent py-2 px-4">
                  <span className="text-primary font-medium">{gymClass.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-montserrat font-bold text-neutral">{gymClass.name}</h3>
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">{gymClass.duration} min</span>
                </div>
                <p className="text-neutral/70 text-sm mb-4">
                  {gymClass.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" 
                      alt="Trainer" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="ml-2 text-neutral/80 text-sm">John Davis</span>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1 text-xs" />
                    <span className="text-neutral/80 text-sm">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral font-medium">${gymClass.price} / session</span>
                  <Button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-neutral text-sm font-medium">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Class Schedule */}
        <div className="bg-dark rounded-xl p-6 md:p-8 shadow-xl border border-gray-800">
          <h3 className="text-2xl font-montserrat font-bold text-neutral mb-6">Class Schedule</h3>
          <div className="flex flex-wrap gap-4 mb-6">
            {weekDays.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "secondary"}
                className={`calendar-day px-4 py-2 rounded-lg font-medium focus:outline-none ${
                  selectedDay === day 
                    ? 'bg-primary text-neutral' 
                    : 'bg-secondary text-neutral hover:text-primary'
                }`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
          {displaySchedules.length === 0 ? (
            <p className="text-neutral p-4">No classes available at the moment.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Time</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Class</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Trainer</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Level</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Capacity</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Booked</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displaySchedules.map((schedule) => (
                    <tr key={schedule.id} className="border-t border-gray-800">
                      <td className="py-4 px-4 text-neutral">{schedule.startTime} - {schedule.endTime}</td>
                      <td className="py-4 px-4 text-neutral">{schedule.class?.name}</td>
                      <td className="py-4 px-4 text-neutral/80">{schedule.trainer?.name}</td>
                      <td className="py-4 px-4 text-neutral/80">{schedule.class?.level}</td>
                      <td className="py-4 px-4 text-neutral/80">{schedule.class?.category}</td>
                      <td className="py-4 px-4 text-neutral/80">{schedule.capacity}</td>
                      <td className="py-4 px-4 text-neutral/80">{schedule.booked}</td>
                      <td className="py-4 px-4">
                        <Button 
                          className="px-4 py-1 rounded-lg bg-primary hover:bg-primary/90 text-neutral text-sm"
                          onClick={() => handleBookClass(schedule.id)}
                          disabled={schedule.booked >= schedule.capacity}
                        >
                          Book
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .class-card {
          transition: all 0.3s ease;
        }
        .class-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .calendar-day {
          transition: all 0.2s ease;
        }
        .calendar-day:hover:not(.disabled) {
          background-color: rgba(255, 69, 0, 0.1);
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default ClassSection;
