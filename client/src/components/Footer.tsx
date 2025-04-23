import { Link } from "wouter";
import { FaDumbbell, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#0c0c0c] dark:bg-[#0c0c0c] pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="mb-6">
              <Link href="/" className="font-bebas text-3xl text-primary flex items-center">
                <FaDumbbell className="inline-block mr-2" />
                MAXIMUS
              </Link>
            </div>
            <p className="text-neutral/70 mb-6">
              Transform your body and mind with our state-of-the-art facilities and expert trainers. Join the MAXIMUS family today!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral/70 hover:text-primary transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-neutral/70 hover:text-primary transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-neutral/70 hover:text-primary transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-neutral/70 hover:text-primary transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-montserrat font-bold text-neutral mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-neutral/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-neutral/70 hover:text-primary transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-neutral/70 hover:text-primary transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/#trainers" className="text-neutral/70 hover:text-primary transition-colors">
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="/#facilities" className="text-neutral/70 hover:text-primary transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-neutral/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-montserrat font-bold text-neutral mb-6">Classes</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-neutral/70 hover:text-primary transition-colors">HIIT Training</a>
              </li>
              <li>
                <a href="#" className="text-neutral/70 hover:text-primary transition-colors">Yoga Flow</a>
              </li>
              <li>
                <a href="#" className="text-neutral/70 hover:text-primary transition-colors">Spin Cycle</a>
              </li>
              <li>
                <a href="#" className="text-neutral/70 hover:text-primary transition-colors">Circuit Training</a>
              </li>
              <li>
                <a href="#" className="text-neutral/70 hover:text-primary transition-colors">Pilates</a>
              </li>
              <li>
                <a href="#" className="text-neutral/70 hover:text-primary transition-colors">Boxing</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-montserrat font-bold text-neutral mb-6">Newsletter</h3>
            <p className="text-neutral/70 mb-4">
              Subscribe to our newsletter for the latest updates, fitness tips, and exclusive offers.
            </p>
            <form className="mb-4">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow bg-secondary border border-gray-700 rounded-l-lg px-4 py-2 text-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-r-lg rounded-l-none">
                  <FaPaperPlane />
                </Button>
              </div>
            </form>
            <p className="text-neutral/50 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-neutral/50">&copy; {new Date().getFullYear()} MAXIMUS Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
