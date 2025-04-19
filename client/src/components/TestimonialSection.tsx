import { useQuery } from '@tanstack/react-query';
import { Testimonial } from '@shared/schema';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const TestimonialSection = () => {
  const { data: testimonials = [], isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-[#0c0c0c] dark:bg-[#0c0c0c]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
              Success <span className="text-primary">Stories</span>
            </h2>
            <p className="text-neutral/80 max-w-2xl mx-auto">
              Loading testimonials...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#0c0c0c] dark:bg-[#0c0c0c]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
              Success <span className="text-primary">Stories</span>
            </h2>
            <p className="text-red-500 max-w-2xl mx-auto">
              Error loading testimonials. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0c0c0c] dark:bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="text-neutral/80 max-w-2xl mx-auto">
            Hear from our members who have transformed their lives with our programs and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="testimonial-card rounded-xl bg-secondary p-6 shadow-xl border border-gray-800"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-montserrat font-bold text-neutral">{testimonial.name}</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < testimonial.rating ? 'text-yellow-500' : 'text-gray-400'} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral/80 italic">
                "{testimonial.testimonial}"
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-primary font-medium">{testimonial.achievement}</span>
                <span className="text-neutral/60 text-sm">{testimonial.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
