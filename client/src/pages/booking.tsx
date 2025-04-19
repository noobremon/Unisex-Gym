import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GymClass, ClassSchedule, Trainer } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaClock, FaUsers, FaDollarSign } from 'react-icons/fa';

interface EnrichedSchedule extends ClassSchedule {
  class?: GymClass;
  trainer?: Trainer;
}

const Booking = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState('Monday');
  
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
  
  const handleBookClass = (scheduleId: number) => {
    bookClassMutation.mutate(scheduleId);
  };
  
  return (
    <div className="py-32 bg-secondary min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-neutral mb-4">
            Book Your <span className="text-primary">Classes</span>
          </h1>
          <p className="text-neutral/80 max-w-2xl mx-auto">
            Choose from a variety of classes designed for all fitness levels. Secure your spot today!
          </p>
        </motion.div>
        
        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="classes">All Classes</TabsTrigger>
            <TabsTrigger value="schedule">Class Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classes" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoadingClasses ? (
                <p className="text-neutral col-span-3 text-center py-10">Loading classes...</p>
              ) : classes.length === 0 ? (
                <p className="text-neutral col-span-3 text-center py-10">No classes available at the moment.</p>
              ) : (
                classes.map((gymClass, index) => (
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
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-montserrat font-bold text-neutral">{gymClass.name}</h3>
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                          <FaClock className="inline-block mr-1" /> {gymClass.duration} min
                        </span>
                      </div>
                      <p className="text-neutral/70 text-sm mb-4">
                        {gymClass.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-neutral/80">
                          <FaCalendarAlt className="text-primary mr-2" />
                          <span>Multiple sessions</span>
                        </div>
                        <div className="flex items-center text-sm text-neutral/80">
                          <FaUsers className="text-primary mr-2" />
                          <span>Max 20 people</span>
                        </div>
                        <div className="flex items-center text-sm text-neutral/80">
                          <FaStar className="text-yellow-500 mr-2" />
                          <span>4.8 Rating</span>
                        </div>
                        <div className="flex items-center text-sm text-neutral/80">
                          <FaDollarSign className="text-primary mr-2" />
                          <span>${gymClass.price}/session</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        onClick={() => {
                          document.getElementById('schedule-section')?.scrollIntoView({ 
                            behavior: 'smooth' 
                          });
                          setSelectedDay('Monday'); // Default day
                        }}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" id="schedule-section">
            <Card>
              <CardHeader>
                <CardTitle>Class Schedule</CardTitle>
                <CardDescription>
                  Select a day to view available classes. Book your spot before they fill up!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-6">
                  {weekDays.map((day) => (
                    <Button
                      key={day}
                      variant={selectedDay === day ? "default" : "secondary"}
                      className={`px-4 py-2 rounded-lg font-medium focus:outline-none ${
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
                  <div className="text-center py-10">
                    <p className="text-neutral">Loading schedule...</p>
                  </div>
                ) : schedules.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-neutral">No classes scheduled for {selectedDay}.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Time</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Class</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Trainer</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Spots</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-neutral/70">Price</th>
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
                            <td className="py-4 px-4 text-neutral/80">
                              <span className={schedule.booked >= schedule.capacity ? 'text-red-500' : ''}>
                                {schedule.booked}/{schedule.capacity}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-neutral/80">
                              ${schedule.class?.price}
                            </td>
                            <td className="py-4 px-4">
                              <Button 
                                className="px-4 py-1 rounded-lg bg-primary hover:bg-primary/90 text-neutral text-sm"
                                onClick={() => handleBookClass(schedule.id)}
                                disabled={schedule.booked >= schedule.capacity || bookClassMutation.isPending}
                              >
                                {bookClassMutation.isPending ? 'Booking...' : schedule.booked >= schedule.capacity ? 'Full' : 'Book'}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-neutral/60">
                  * Please arrive 10 minutes before your class starts.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx>{`
        .class-card {
          transition: all 0.3s ease;
        }
        .class-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Booking;
