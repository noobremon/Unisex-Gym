import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Booking from "@/pages/booking";
import Membership from "@/pages/membership";
import Trainers from "@/pages/trainers";
import Facilities from "@/pages/facilities";
import Contact from "@/pages/contact";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/booking" component={Booking} />
      <Route path="/membership" component={Membership} />
      <Route path="/trainers" component={Trainers} />
      <Route path="/facilities" component={Facilities} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={true}>
      <TooltipProvider>
        <Toaster />
        <div className="font-inter bg-[#0c0c0c] dark:bg-[#0c0c0c] text-neutral overflow-x-hidden min-h-screen">
          <Navbar />
          <Router />
          <Footer />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
