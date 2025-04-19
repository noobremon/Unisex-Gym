import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactMessageSchema, InsertContactMessage } from '@shared/schema';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Message sent!',
        description: 'We will get back to you soon.',
        variant: 'default',
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-neutral mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-neutral/80 max-w-2xl mx-auto">
            Have questions or ready to start your fitness journey? Contact us today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark rounded-xl p-8 shadow-xl border border-gray-800"
          >
            <h3 className="text-2xl font-montserrat font-bold text-neutral mb-6">Send us a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral/80">Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral/80">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral/80">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral/80">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-neutral focus:outline-none focus:ring-2 focus:ring-primary resize-none" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-montserrat font-medium py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-dark rounded-xl p-8 shadow-xl border border-gray-800 mb-8">
              <h3 className="text-2xl font-montserrat font-bold text-neutral mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-neutral font-medium">Address</p>
                    <p className="text-neutral/80">123 Fitness Avenue, Cityville, CA 90210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-neutral font-medium">Phone</p>
                    <p className="text-neutral/80">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-neutral font-medium">Email</p>
                    <p className="text-neutral/80">info@flexfitgym.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-neutral font-medium">Hours</p>
                    <p className="text-neutral/80">Monday - Friday: 5am - 11pm</p>
                    <p className="text-neutral/80">Saturday - Sunday: 7am - 8pm</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-neutral font-medium mb-4">Follow us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-neutral transition-all">
                    <FaFacebook />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-neutral transition-all">
                    <FaInstagram />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-neutral transition-all">
                    <FaTwitter />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-neutral transition-all">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-dark rounded-xl overflow-hidden shadow-xl border border-gray-800 h-72">
              <div className="h-full w-full bg-secondary relative">
                <img 
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80" 
                  alt="Map location" 
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary flex items-center justify-center animate-bounce">
                      <FaMapMarkerAlt className="text-neutral text-xl" />
                    </div>
                    <p className="text-neutral font-medium">We are here!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
