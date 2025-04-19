import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GymClass, ClassSchedule, Trainer } from '@shared/schema';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface EnrichedSchedule extends ClassSchedule {
  class?: GymClass;
  trainer?: Trainer;
}

const ClassSection = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState('Tuesday'); // Default to Tuesday as shown in design
  
  // Fetch all classes
  const { data: classes = [], isLoading: isLoadingClasses } = useQuery<GymClass[]>({
    queryKey: ['/api/classes'],
  });
  
  // Fetch schedules for the selected day
  const { data: schedules = [], isLoading: isLoadingSchedules } = useQuery<EnrichedSchedule[]>({
    queryKey: ['/api/class-schedules', selectedDay],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(`/api/class-schedules?day=${queryKey[1]}`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to fetch schedules');
      }
      return res.json();
    }
  });
  
  // Book a class mutation
  const bookClassMutation = useMutation({
    mutationFn: (scheduleId: number) => {
      // In a real app, we would get the userId from auth context
      return apiRequest('POST', '/api/book-class', { 
        userId: 1, // Mock user ID
        scheduleId 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/class-schedules'] });
      toast({
        title: "Success!",
        description: "Class booked successfully.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to book class. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Featured classes (the first 3 for this example)
  const featuredClasses = classes.slice(0, 3);
  
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
          {isLoadingClasses ? (
            <p className="text-neutral">Loading classes...</p>
          ) : (
            featuredClasses.map((gymClass, index) => (
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
            ))
          )}
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
          
          {isLoadingSchedules ? (
            <p className="text-neutral p-4">Loading schedule...</p>
          ) : schedules.length === 0 ? (
            <p className="text-neutral p-4">No classes scheduled for {selectedDay}.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Time</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Class</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Trainer</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Spots</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule) => (
                    <tr key={schedule.id} className="border-t border-gray-800">
                      <td className="py-4 px-4 text-neutral">{schedule.startTime} - {schedule.endTime}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
                          <span className="text-neutral">{schedule.class?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-neutral/80">{schedule.trainer?.name}</td>
                      <td className="py-4 px-4 text-neutral/80">{schedule.booked}/{schedule.capacity}</td>
                      <td className="py-4 px-4">
                        <Button 
                          className="px-4 py-1 rounded-lg bg-primary hover:bg-primary/90 text-neutral text-sm"
                          onClick={() => handleBookClass(schedule.id)}
                          disabled={schedule.booked >= schedule.capacity || bookClassMutation.isPending}
                        >
                          {bookClassMutation.isPending ? 'Booking...' : 'Book'}
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
