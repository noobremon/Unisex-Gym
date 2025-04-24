import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRunning, FaBiking, FaHeartbeat, FaWeightHanging } from 'react-icons/fa';

const placeholderImages = [
  'https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80',
];

const optionImages: Record<string, string[]> = {
  Strength: placeholderImages,
  Cardio: placeholderImages,
  Cycling: placeholderImages,
  Fitness: placeholderImages,
};

const options = [
  { icon: FaWeightHanging, label: 'Strength' },
  { icon: FaRunning, label: 'Cardio' },
  { icon: FaBiking, label: 'Cycling' },
  { icon: FaHeartbeat, label: 'Fitness' },
];

const GymScene: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showOptionsExpanded, setShowOptionsExpanded] = useState(true);
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);

  useEffect(() => {
    if (isFadingOut) {
      const timeout = setTimeout(() => {
        setSelected(pendingSelection);
        setIsFadingOut(false);
        setShowOptionsExpanded(true);
      }, 500); // match duration of exit animation
      return () => clearTimeout(timeout);
    }
  }, [isFadingOut, pendingSelection]);

  // When options are expanded and no option is selected, reset to initial state after a short delay
  useEffect(() => {
    if (!selected && showOptionsExpanded) {
      const timeout = setTimeout(() => {
        setShowOptionsExpanded(false);
      }, 350); // allow the expansion animation to complete
      return () => clearTimeout(timeout);
    }
  }, [selected, showOptionsExpanded]);

  // When an option is selected, shrink and move up the options
  useEffect(() => {
    if (selected) {
      setShowOptionsExpanded(false);
    }
  }, [selected]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center p-6">
      <motion.div
        className="text-center w-full max-w-xl mx-auto rounded-xl p-6 relative min-h-[420px] overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`grid ${selected ? 'grid-cols-4 grid-rows-1 gap-4 mb-1 mt-32' : 'grid-cols-2 grid-rows-2 gap-6 mb-6 mt-12'} w-full transition-all duration-500`}
          animate={selected && !isFadingOut ? { scale: 0.67, y: 0 } : { scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          style={{ maxWidth: '100%', margin: '0 auto', minHeight: selected ? 110 : 250 }}
        >
          {options.map((item, index) => (
            <motion.div
              key={index}
              className={`bg-primary/10 rounded-lg flex flex-col items-center justify-center shadow-md cursor-pointer border-2 ${selected === item.label ? 'border-primary' : 'border-transparent'} transition-all`}
              style={selected
                ? { minWidth: 85, minHeight: 85, padding: 15, fontSize: '1.08rem' }
                : { minWidth: 115, minHeight: 115, padding: 20, fontSize: '1.35rem' }
              }
              whileHover={!selected ? { scale: 1.08 } : {}}
              animate={!selected ? { scale: 1 } : {}}
              onClick={() => {
                if (selected) {
                  // If already selected, always fade out images before switching
                  setPendingSelection(selected === item.label ? null : item.label);
                  setIsFadingOut(true);
                } else {
                  setSelected(item.label);
                }
              }}
            >
              <item.icon className={`text-primary mx-auto mb-2 ${selected ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl'}`} />
              <span className={`text-primary font-bold ${selected ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selected && !isFadingOut && (
            <motion.div
              key={selected}
              className="flex flex-col items-center justify-center mt-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-row justify-center items-center gap-6 mb-0">
                {optionImages[selected].map((img, idx) => (
                  <motion.img
                    key={img}
                    src={img}
                    alt={`${selected} ${idx+1}`}
                    className="w-36 h-36 md:w-44 md:h-44 object-cover aspect-square rounded-lg shadow-lg border-2 border-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: 60 }}
                    transition={{ delay: 0.2 * idx, duration: 0.4 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <div className="flex justify-center space-x-2 mt-10">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GymScene;