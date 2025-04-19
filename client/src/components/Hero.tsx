import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaUsers, FaTrophy, FaClock } from "react-icons/fa";
import GymScene from "./GymScene";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen pt-20 flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-secondary/80 to-secondary/80">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=800&q=80"
          alt="Gym interior with equipment" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-neutral leading-tight mb-4">
              Transform Your <span className="text-primary">Body</span>, Transform Your <span className="text-primary">Life</span>
            </h1>
            <p className="text-lg md:text-xl font-inter text-neutral/80 mb-8">
              Experience premium fitness facilities, expert trainers, and a supportive community dedicated to helping you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-montserrat px-8 py-6 text-lg"
              >
                Join Today
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-neutral hover:border-primary hover:text-primary text-neutral transition-all px-8 py-6 text-lg"
              >
                Book a Tour
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center">
                <FaUsers className="text-primary text-xl mr-2" />
                <span className="text-neutral">2500+ Members</span>
              </div>
              <div className="flex items-center">
                <FaTrophy className="text-primary text-xl mr-2" />
                <span className="text-neutral">Expert Trainers</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-primary text-xl mr-2" />
                <span className="text-neutral">24/7 Access</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative animate-float">
              <div className="absolute -right-8 -top-8 w-64 h-64 bg-primary rounded-full opacity-10"></div>
              <div className="h-[500px] w-full">
                <GymScene />
              </div>
              <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-blue-500 rounded-full opacity-10"></div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
