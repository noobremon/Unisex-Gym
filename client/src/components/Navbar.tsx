import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FaDumbbell } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    
    { name: "Classes", href: "/classes" },
    { name: "Trainers", href: "/trainers" },
    { name: "Facilities", href: "/facilities" },
    { name: "Membership", href: "/membership" },
    
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const elementId = href.substring(2);
      if (location === "/") {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Store the target section in sessionStorage
        sessionStorage.setItem("scrollTarget", elementId);
        // Navigate to home page
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    // Check if there's a stored scroll target when component mounts
    const scrollTarget = sessionStorage.getItem("scrollTarget");
    if (scrollTarget && location === "/") {
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          sessionStorage.removeItem("scrollTarget");
        }
      }, 100);
    }
  }, [location]);

  return (
    <nav
      className={`fixed w-full bg-[#0c0c0c] dark:bg-[#0c0c0c] z-50 ${isScrolled ? "bg-opacity-95 shadow-lg" : "bg-opacity-70"} transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="font-bebas text-3xl text-primary flex items-center"
            >
              <FaDumbbell className="inline-block mr-2" />
              MAXIMUS
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link font-montserrat font-medium ${isActive(link.href) ? "text-primary active" : "text-neutral hover:text-primary"}`}
                onClick={(e) => handleNavigation(e, link.href)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white ml-4"
            >
              Join Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#0c0c0c] dark:bg-[#0c0c0c] bg-opacity-95 pb-4 ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-neutral hover:text-primary"
              }`}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleNavigation(e, link.href);
              }}
            >
              {link.name}
            </Link>
          ))}
          <Button
            className="mt-2 w-full bg-primary hover:bg-primary/90 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Now
          </Button>
        </div>
      </div>

      <style>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: hsl(16, 100%, 50%);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
