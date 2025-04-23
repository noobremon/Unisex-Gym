import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaRunning, FaBiking, FaHeartbeat } from 'react-icons/fa';

const GymScene: React.FC = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center p-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { icon: FaDumbbell, label: "Strength" },
            { icon: FaRunning, label: "Cardio" },
            { icon: FaBiking, label: "Cycling" },
            { icon: FaHeartbeat, label: "Fitness" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-primary/10 p-4 rounded-lg"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                delay: index * 0.2,
                ease: "easeInOut" 
              }}
            >
              <item.icon className="text-primary text-3xl mx-auto mb-2" />
            
            </motion.div>
          ))}
        </div>
        {/* Removed the heading and description text from the video section */}
        <div className="flex justify-center space-x-2">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GymScene;
