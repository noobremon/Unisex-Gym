import { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, Circle, ScaleControl, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import gymIconUrl from '@/assets/gym-icon.svg';
import emailjs from 'emailjs-com';

// Fix default marker icon for leaflet in React (required workaround):
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom Gym Icon
const gymIcon = new L.Icon({
  iconUrl: gymIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -36],
});

// User Location Marker Component
const UserLocationMarker = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [accuracy, setAccuracy] = useState(0);
  useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      setAccuracy(e.accuracy);
    },
    locationerror() {
      setPosition(null);
    }
  });
  const map = useMap();
  useEffect(() => {
    map.locate({ setView: false, watch: false });
  }, [map]);
  return position ? (
    <>
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
      <Circle center={position} radius={accuracy} pathOptions={{ color: 'green', fillColor: '#22c55e', fillOpacity: 0.2 }} />
    </>
  ) : null;
};

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

  // EmailJS config - TODO: Replace with your actual IDs from EmailJS dashboard
  const EMAILJS_SERVICE_ID = 'service_3dctakv';
  const EMAILJS_TEMPLATE_ID = 'template_6xkppf9';
  const EMAILJS_USER_ID = 'chl9UUEBs8MhFKeXC';

  const onSubmit = (data: InsertContactMessage) => {
    setIsSubmitting(true);
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: 'rajarshidas729@gmail.com', // Ensures message is sent to this address
      },
      EMAILJS_USER_ID
    )
    .then(() => {
      toast({
        title: 'Message sent!',
        description: 'We will get back to you soon.',
        variant: 'default',
      });
      form.reset();
      setIsSubmitting(false);
    })
    .catch(() => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    });
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
                    <p className="text-neutral/80">Dum Dum Road, Opp - South Dumdum Municipality, Kolkata - 700074</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-neutral font-medium">Phone</p>
                    <p className="text-neutral/80">6969696969</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-neutral font-medium">Email</p>
                    <p className="text-neutral/80">rajarshidas729@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-neutral font-medium">Hours</p>
                    <p className="text-neutral/80">Monday - Friday: 7:30am - 11pm</p>
                    <p className="text-neutral/80">Saturday - Sunday: 8am - 10:30pm</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-neutral font-medium mb-4">Follow us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-black transition-all">
                    <FaFacebook />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-black transition-all">
                    <FaInstagram />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-black transition-all">
                    <FaTwitter />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-black transition-all">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-dark rounded-xl overflow-hidden shadow-xl border border-gray-800 h-72">
              <MapContainer
                center={[22.622801279456, 88.41037137507931]}
                zoom={17}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Main Gym Marker with Custom Icon and Directions Button */}
                <Marker position={[22.622801279456, 88.41037137507931]} icon={gymIcon}>
                  <Popup>
                    <div style={{ textAlign: 'center' }}>
                      <b>MAXIMUS FITNESS HUB</b><br />
                      Dum Dum Road, Kolkata - 700074<br />
                      <a href="https://goo.gl/maps/4V2jVw8u4W7wF3pF9" target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                      <br />
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=22.622801279456,88.41037137507931`} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontWeight: 'bold' }}>Get Directions</a>
                    </div>
                  </Popup>
                </Marker>
                {/* Circle highlighting gym area */}
                <Circle
                  center={[22.622801279456, 88.41037137507931]}
                  radius={70}
                  pathOptions={{ color: 'blue', fillColor: '#3b82f6', fillOpacity: 0.2 }}
                />
                {/* Nearby Metro Station Marker */}
                <Marker position={[22.6265, 88.4112]}>
                  <Popup>
                    Dum Dum Metro Station<br />
                    <a href="https://goo.gl/maps/6yq8u3p4t7P2" target="_blank" rel="noopener noreferrer">Directions</a>
                  </Popup>
                </Marker>
                {/* Parking Landmark */}
                <Marker position={[22.6238, 88.4092]}>
                  <Popup>
                    Public Parking<br />
                    <a href="https://goo.gl/maps/7Xn7G2R2T8y" target="_blank" rel="noopener noreferrer">Directions</a>
                  </Popup>
                </Marker>
                {/* User Location Marker */}
                <UserLocationMarker />
                {/* Scale Bar */}
                <ScaleControl position="bottomleft" />
                {/* Zoom Control repositioned */}
                <ZoomControl position="topright" />
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// TODO: Install emailjs-com if not already installed: npm install emailjs-com or yarn add emailjs-com
export default ContactSection;
