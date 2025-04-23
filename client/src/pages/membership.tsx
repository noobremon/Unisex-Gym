import { useEffect, useState } from 'react';
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
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');
  const [tab, setTab] = useState<'plans' | 'benefits'>('plans');

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- MOCK DATA ---
  const mockMembershipPlansMonthly = [
    {
      id: 1,
      name: 'Basic Plan',
      price: 999,
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
      price: 1999,
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
      price: 3499,
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

  const mockMembershipPlansYearly = [
    {
      id: 1,
      name: 'Basic Plan',
      price: 9999,
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
      price: 18999,
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
      price: 32999,
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

  const membershipPlans = planType === 'monthly' ? mockMembershipPlansMonthly : mockMembershipPlansYearly;
  const isLoading = false;
  const error = false;

  const handleSelectPlan = async (planId: number) => {
    try {
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
        {/* Tabs for Plans/Benefits */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold border border-primary focus:outline-none transition-colors duration-200 ${tab === 'plans' ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
            onClick={() => setTab('plans')}
          >
            Membership Plans
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold border border-primary focus:outline-none transition-colors duration-200 ${tab === 'benefits' ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
            onClick={() => setTab('benefits')}
          >
            Membership Benefits
          </button>
        </div>
        {/* Plan Type Toggle - only show if on Plans tab */}
        {tab === 'plans' && (
          <div className="flex justify-center mb-8">
            <button
              className={`px-6 py-2 rounded-l-lg font-semibold border border-primary focus:outline-none transition-colors duration-200 ${planType === 'monthly' ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
              onClick={() => setPlanType('monthly')}
            >
              Monthly Plan
            </button>
            <button
              className={`px-6 py-2 rounded-r-lg font-semibold border border-primary focus:outline-none transition-colors duration-200 ${planType === 'yearly' ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
              onClick={() => setPlanType('yearly')}
            >
              Yearly Plan
            </button>
          </div>
        )}
        {/* Plans Grid or Benefits */}
        {tab === 'plans' ? (
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
                    <span className="font-bebas text-5xl text-neutral">₹{plan.price}</span>
                    <span className="text-neutral/70 ml-1">/{planType === 'monthly' ? 'month' : 'year'}</span>
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
        ) : (
          <div className="bg-dark rounded-xl p-8 max-w-3xl mx-auto text-neutral/90 text-lg shadow-lg border border-gray-800">
            <h3 className="text-2xl font-montserrat font-bold mb-4 text-primary">Membership Benefits</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>Access to all gym equipment and facilities</li>
              <li>Locker room and shower access</li>
              <li>Group fitness classes</li>
              <li>Personal trainer sessions (varies by plan)</li>
              <li>Nutrition and wellness consultation</li>
              <li>Priority and VIP support for Premium/Elite</li>
              <li>Exclusive access to gym events</li>
              <li>Discounts on merchandise and partner services</li>
            </ul>
          </div>
        )}
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
                There is a one-time joining fee of ₹49 for Basic and Premium plans. This fee is waived for Elite plan members.
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
