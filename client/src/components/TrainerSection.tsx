import { Trainer } from '@shared/schema';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const TrainerSection = () => {
  // --- MOCK DATA ---
  const mockTrainers = [
    {
      id: 1,
      name: 'Alex Turner',
      speciality: 'HIIT',
      image: 'trainer1.jpg',
      instagram: 'alexturner',
      facebook: 'alexturner',
      twitter: 'alexturner',
    },
    {
      id: 2,
      name: 'Sara Lee',
      speciality: 'Yoga',
      image: 'trainer2.jpg',
      instagram: 'saralee',
      facebook: 'saralee',
      twitter: 'saralee',
    },
    {
      id: 3,
      name: 'Mike Chen',
      speciality: 'Strength',
      image: 'trainer3.jpg',
      instagram: 'mikechen',
      facebook: 'mikechen',
      twitter: 'mikechen',
    },
    {
      id: 4,
      name: 'Lily Evans',
      speciality: 'Cardio',
      image: 'trainer4.jpg',
      instagram: 'lilyevans',
      facebook: 'lilyevans',
      twitter: 'lilyevans',
    },
  ];

  const trainers = mockTrainers;
  const isLoading = false;
  const error = false;

  return (
    <section id="trainers" className="py-20 bg-[#0c0c0c] dark:bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
            Expert <span className="text-primary">Trainers</span>
          </h2>
          <p className="text-neutral/80 max-w-2xl mx-auto">
            Our professional trainers are dedicated to helping you achieve your fitness goals with personalized guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="trainer-card rounded-xl overflow-hidden shadow-xl"
            >
              <div className="relative h-80">
                <img
                  src={`/images/${trainer.image}`}
                  alt={`${trainer.name} - ${trainer.speciality}`}
                  className="w-full h-full object-cover"
                />
                <div className="trainer-overlay absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-montserrat font-bold text-neutral">{trainer.name}</h3>
                  <p className="text-primary font-medium text-sm mb-2">{trainer.speciality}</p>
                  <div className="flex space-x-3 mt-2">
                    {trainer.instagram && (
                      <a href={`https://instagram.com/${trainer.instagram}`} className="text-neutral hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                      </a>
                    )}
                    {trainer.facebook && (
                      <a href={`https://facebook.com/${trainer.facebook}`} className="text-neutral hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                      </a>
                    )}
                    {trainer.twitter && (
                      <a href={`https://twitter.com/${trainer.twitter}`} className="text-neutral hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .trainer-card {
          transition: all 0.3s ease;
        }
        .trainer-card:hover {
          transform: scale(1.03);
        }
        .trainer-overlay {
          background: linear-gradient(to top, rgba(30, 32, 35, 0.9), transparent 80%);
        }
      `}</style>
    </section>
  );
};

export default TrainerSection;