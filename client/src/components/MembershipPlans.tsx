import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MembershipPlan } from '@shared/schema';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { FaDumbbell, FaCrown, FaGem, FaCheck, FaTimes } from 'react-icons/fa';

const MembershipPlans = () => {
  const { toast } = useToast();

  const { data: membershipPlans = [], isLoading, error } = useQuery<MembershipPlan[]>({
    queryKey: ['/api/membership-plans'],
  });

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

  if (isLoading) {
    return (
      <section id="membership" className="py-20 bg-[#0c0c0c] dark:bg-[#0c0c0c]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
              Membership <span className="text-primary">Plans</span>
            </h2>
            <p className="text-neutral/80 max-w-2xl mx-auto">
              Loading membership plans...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="membership" className="py-20 bg-[#0c0c0c] dark:bg-[#0c0c0c]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
              Membership <span className="text-primary">Plans</span>
            </h2>
            <p className="text-red-500 max-w-2xl mx-auto">
              Error loading membership plans. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="membership" className="py-20 bg-[#0c0c0c] dark:bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
            Membership <span className="text-primary">Plans</span>
          </h2>
          <p className="text-neutral/80 max-w-2xl mx-auto">
            Choose a plan that fits your lifestyle and goals. All memberships include access to our state-of-the-art facilities and basic classes.
          </p>
        </div>

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
    </section>
  );
};

export default MembershipPlans;
