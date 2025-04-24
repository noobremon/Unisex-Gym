import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const FacilitySection = () => {
  // --- MOCK DATA ---
  const mockFacilities = [
    {
      id: 1,
      name: 'Cardio Zone',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      description: 'A full range of treadmills, bikes, and ellipticals.',
    },
    {
      id: 2,
      name: 'Strength Area',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80',
      description: 'Dumbbells, barbells, and resistance machines.',
    },
    {
      id: 3,
      name: 'Yoga Studio',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      description: 'A quiet, relaxing space for yoga and meditation.',
    },
  ];

  const facilities = mockFacilities;
  const isLoading = false;
  const error = false;

  return (
    <section id="facilities" className="py-20 bg-[#0c0c0c] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
            Our <span className="text-primary">Facilities</span>
          </h2>
          <p className="text-neutral/80 max-w-2xl mx-auto">
            Experience state-of-the-art equipment and amenities designed to enhance your workout and recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="tilt-card facility-item rounded-xl overflow-hidden bg-dark border border-gray-800 shadow-xl"
            >
              <div className="relative h-60">
                <img 
                  src={facility.image} 
                  alt={facility.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 tilt-card-content">
                <h3 className="text-xl font-montserrat font-bold text-neutral mb-3">{facility.name}</h3>
                <p className="text-neutral/70 text-sm">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Gym Tour */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Top left overlay text */}
          <div className="absolute top-0 left-0 m-4 z-20">
            <span className="bg-primary text-white font-bold px-4 py-2 rounded-lg shadow-lg text-lg opacity-90">
              Explore Our Gym
            </span>
          </div>
          <div className="aspect-w-16 aspect-h-9 relative">
            <img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=675&q=80" 
              alt="Gym Interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-dark bg-opacity-50 flex items-center justify-center">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-primary bg-opacity-90 flex items-center justify-center transition-transform transform hover:scale-110"
              >
                <FaPlay className="text-neutral text-2xl" />
              </motion.button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark to-transparent">
            <h3 className="text-2xl font-montserrat font-bold text-neutral mb-2"></h3>
            <p className="text-neutral/80"></p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .facility-item {
          transition: all 0.3s ease;
        }
        .facility-item:hover {
          transform: scale(1.05);
        }
        .tilt-card {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .tilt-card:hover {
          transform: rotateX(5deg) rotateY(5deg);
        }
        .tilt-card-content {
          transform: translateZ(20px);
        }
      `}</style>
    </section>
  );
};

export default FacilitySection;
