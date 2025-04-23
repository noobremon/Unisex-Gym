import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { MembershipPlan } from '@shared/schema';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';
import { FaDumbbell, FaCrown, FaGem, FaCheck, FaTimes, FaUserCheck, FaChartLine, FaHeart, FaRunning } from 'react-icons/fa';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Membership = () => {
  const { toast } = useToast();

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- MOCK DATA ---
  const mockMembershipPlans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: 29,
      features: [
        'Access to gym equipment',
        'Locker room access',
        '1 group class per week',
        'Standard support',
        'No personal trainer',
      ],
      icon: 'fa-dumbbell',
      popular: false,
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: 59,
      features: [
        'All Basic features',
        'Unlimited group classes',
        'Sauna access',
        'Priority support',
        '5 personal trainer sessions',
      ],
      icon: 'fa-crown',
      popular: true,
    },
    {
      id: 3,
      name: 'Elite Plan',
      price: 99,
      features: [
        'All Premium features',
        'Private locker',
        'Nutrition consultation',
        'Unlimited personal trainer',
        'VIP events',
      ],
      icon: 'fa-gem',
      popular: false,
    },
  ];

  const membershipPlans = mockMembershipPlans;
  const isLoading = false;
  const error = false;

  const handleSelectPlan = async (planId: number) => {
    try {
      // In a real app, we would get the userId from auth context
      // This is just for demonstration as we don't have auth implemented
      await apiRequest('POST', '/api/membership-registration', { 
        userId: 1, // Mock user ID
        planId: planId 
      });
      
      toast({
        title: "Plan selected!",
        description: "Your membership has been registered successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register membership. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'fa-dumbbell':
        return <FaDumbbell className="text-primary text-2xl" />;
      case 'fa-crown':
        return <FaCrown className="text-primary text-2xl" />;
      case 'fa-gem':
        return <FaGem className="text-blue-500 text-2xl" />;
      default:
        return <FaDumbbell className="text-primary text-2xl" />;
    }
  };

  return (
    <div className="py-32 bg-[#0c0c0c] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-neutral mb-4">
            Choose Your <span className="text-primary">Membership</span>
          </h1>
          <p className="text-neutral/80 max-w-2xl mx-auto">
            Select a plan that fits your lifestyle and fitness goals. All memberships include access to our state-of-the-art facilities.
          </p>
        </motion.div>

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="plans">Membership Plans</TabsTrigger>
            <TabsTrigger value="benefits">Membership Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans">
            {isLoading ? (
              <div className="text-center py-10">
                <p className="text-neutral">Loading membership plans...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">Error loading membership plans. Please try again later.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {membershipPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`membership-card rounded-xl overflow-hidden ${
                      plan.popular
                        ? 'bg-secondary border-2 border-primary shadow-2xl transform -translate-y-4'
                        : 'bg-secondary border border-gray-800 shadow-xl'
                    }`}
                  >
                    {plan.popular && (
                      <div className="w-full bg-primary py-2">
                        <p className="text-center font-montserrat font-medium text-neutral">Most Popular</p>
                      </div>
                    )}
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full ${
                        plan.name === 'Elite Plan' ? 'bg-blue-500/10' : 'bg-primary/10'
                      }`}>
                        {getIcon(plan.icon)}
                      </div>
                      <h3 className="text-2xl font-montserrat font-bold text-neutral text-center mb-2">{plan.name}</h3>
                      <div className="flex justify-center items-baseline my-6">
                        <span className="font-bebas text-5xl text-neutral">${plan.price}</span>
                        <span className="text-neutral/70 ml-1">/month</span>
                      </div>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className={`flex items-center ${i >= plan.features.length - (plan.name === 'Basic Plan' ? 2 : plan.name === 'Premium Plan' ? 1 : 0) ? 'opacity-50' : ''}`}>
                            {i >= plan.features.length - (plan.name === 'Basic Plan' ? 2 : plan.name === 'Premium Plan' ? 1 : 0) ? (
                              <FaTimes className="text-red-500 mr-3" />
                            ) : (
                              <FaCheck className="text-green-500 mr-3" />
                            )}
                            <span className="text-neutral/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full py-6 ${
                          plan.name === 'Elite Plan' 
                            ? 'bg-blue-500 hover:bg-blue-500/90' 
                            : 'bg-primary hover:bg-primary/90'
                        } text-neutral font-montserrat font-medium transition-all`}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        Select Plan
                      </Button>
                    </CardContent>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>Membership Benefits</CardTitle>
                <CardDescription>
                  Discover all the exclusive benefits included with your MAXIMUS membership
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-dark p-6 rounded-lg border border-gray-800">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <FaUserCheck className="text-primary text-xl" />
                      </div>
                      <h3 className="ml-4 text-xl font-montserrat font-semibold text-neutral">Personalized Experience</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Initial fitness assessment with professional trainers</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Customized workout plan based on your goals</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Regular progress tracking and plan adjustments</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark p-6 rounded-lg border border-gray-800">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <FaChartLine className="text-blue-500 text-xl" />
                      </div>
                      <h3 className="ml-4 text-xl font-montserrat font-semibold text-neutral">Performance Tracking</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Access to our mobile app for tracking workouts</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Body composition analysis every month</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Fitness milestone celebrations and rewards</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark p-6 rounded-lg border border-gray-800">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <FaHeart className="text-green-500 text-xl" />
                      </div>
                      <h3 className="ml-4 text-xl font-montserrat font-semibold text-neutral">Health & Recovery</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Access to sauna, steam room, and recovery areas</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Nutritional guidance and meal planning</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Discounts on massage therapy and recovery services</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark p-6 rounded-lg border border-gray-800">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <FaRunning className="text-primary text-xl" />
                      </div>
                      <h3 className="ml-4 text-xl font-montserrat font-semibold text-neutral">Classes & Community</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Access to group fitness classes (varies by plan)</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Monthly community fitness challenges</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral/80">Exclusive member events and workshops</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-neutral/70">
                  Benefits may vary based on the membership plan selected. Elite members receive all benefits listed above.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-montserrat font-bold text-neutral mb-8 text-center">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-dark p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-montserrat font-semibold text-neutral mb-3">How do I get started?</h3>
              <p className="text-neutral/80">
                Simply select your preferred membership plan above. After registration, you'll receive a welcome email with instructions to book your initial fitness assessment.
              </p>
            </div>
            <div className="bg-dark p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-montserrat font-semibold text-neutral mb-3">Can I freeze my membership?</h3>
              <p className="text-neutral/80">
                Yes, all memberships can be frozen for up to 3 months per year. Elite members can freeze their membership for up to 6 months.
              </p>
            </div>
            <div className="bg-dark p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-montserrat font-semibold text-neutral mb-3">Is there a joining fee?</h3>
              <p className="text-neutral/80">
                There is a one-time joining fee of $49 for Basic and Premium plans. This fee is waived for Elite plan members.
              </p>
            </div>
            <div className="bg-dark p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-montserrat font-semibold text-neutral mb-3">Can I upgrade my plan later?</h3>
              <p className="text-neutral/80">
                Absolutely! You can upgrade your membership at any time. The price difference will be prorated for the remainder of your billing cycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .membership-card {
          transition: all 0.3s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .membership-card:hover {
          transform: translateY(-10px) rotateY(5deg);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
};

export default Membership;
