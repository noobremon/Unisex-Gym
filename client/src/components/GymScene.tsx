import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell } from 'react-icons/fa';

// This is a simplified version of the gym scene that doesn't use Three.js
// We'll use this as a placeholder until the 3D issues are resolved
const GymScene: React.FC = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center p-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mx-auto bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mb-4"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0, -5, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut" 
          }}
        >
          <FaDumbbell className="text-primary text-4xl" />
        </motion.div>
        <h3 className="text-xl md:text-2xl font-bebas text-primary tracking-wide">FLEXFIT GYM</h3>
        <p className="text-neutral/80 mt-2">Interactive 3D Gym View Loading...</p>
        <div className="mt-4 flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1] }}
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
