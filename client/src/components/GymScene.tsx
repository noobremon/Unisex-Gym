import React from 'react';
import { motion } from 'framer-motion';
import { FaRunning, FaBiking, FaHeartbeat, FaWeightHanging } from 'react-icons/fa';

const GymScene: React.FC = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center p-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-6 w-full max-w-xl mx-auto">
          {[
            { icon: FaWeightHanging, label: "Strength" },
            { icon: FaRunning, label: "Cardio" },
            { icon: FaBiking, label: "Cycling" },
            { icon: FaHeartbeat, label: "Fitness" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-primary/10 p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px] min-h-[100px] sm:min-h-[120px] md:min-h-[140px] shadow-md"
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
              <item.icon className="text-primary text-3xl sm:text-4xl md:text-5xl mx-auto mb-2" />
              <span className="text-primary text-base sm:text-lg md:text-xl font-semibold">{item.label}</span>
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