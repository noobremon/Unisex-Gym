import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { MembershipPlan, GymClass, Trainer, ClassSchedule } from '@shared/schema';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  membershipId?: number;
  bookings: number[];
}

interface GymState {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  
  // Selected items
  selectedDay: string;
  selectedMembershipPlan: number | null;
  selectedClass: number | null;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectDay: (day: string) => void;
  selectMembershipPlan: (planId: number | null) => void;
  selectClass: (classId: number | null) => void;
  bookClass: (scheduleId: number) => Promise<boolean>;
  registerMembership: (planId: number) => Promise<boolean>;
  addBooking: (scheduleId: number) => void;
}

export const useGymStore = create<GymState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        selectedDay: 'Monday',
        selectedMembershipPlan: null,
        selectedClass: null,
        
        // Actions
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        
        login: async (username, password) => {
          try {
            // This is a mock implementation since we don't have a real authentication system
            // In a real app, this would make an API request to authenticate
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // For demo purposes, let's create a mock user
            const mockUser: User = {
              id: 1,
              username,
              name: 'John Doe',
              email: 'john.doe@example.com',
              bookings: []
            };
            
            set({ user: mockUser, isAuthenticated: true });
            return true;
          } catch (error) {
            console.error('Login failed:', error);
            return false;
          }
        },
        
        logout: () => {
          set({ user: null, isAuthenticated: false });
        },
        
        selectDay: (day) => {
          set({ selectedDay: day });
        },
        
        selectMembershipPlan: (planId) => {
          set({ selectedMembershipPlan: planId });
        },
        
        selectClass: (classId) => {
          set({ selectedClass: classId });
        },
        
        bookClass: async (scheduleId) => {
          try {
            const { user } = get();
            
            if (!user) {
              throw new Error('User not authenticated');
            }
            
            // In a real app, this would make an API request to book a class
            const response = await fetch('/api/book-class', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: user.id,
                scheduleId
              }),
              credentials: 'include'
            });
            
            if (!response.ok) {
              throw new Error('Failed to book class');
            }
            
            // Add booking to user's bookings
            get().addBooking(scheduleId);
            
            return true;
          } catch (error) {
            console.error('Booking failed:', error);
            return false;
          }
        },
        
        registerMembership: async (planId) => {
          try {
            const { user } = get();
            
            if (!user) {
              throw new Error('User not authenticated');
            }
            
            // In a real app, this would make an API request to register membership
            const response = await fetch('/api/membership-registration', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: user.id,
                planId
              }),
              credentials: 'include'
            });
            
            if (!response.ok) {
              throw new Error('Failed to register membership');
            }
            
            // Update user with new membership
            set({ 
              user: { 
                ...user, 
                membershipId: planId 
              }
            });
            
            return true;
          } catch (error) {
            console.error('Membership registration failed:', error);
            return false;
          }
        },
        
        addBooking: (scheduleId) => {
          const { user } = get();
          
          if (user) {
            set({
              user: {
                ...user,
                bookings: [...user.bookings, scheduleId]
              }
            });
          }
        }
      }),
      {
        name: 'gym-storage',
        partialize: (state) => ({ 
          user: state.user,
          isAuthenticated: state.isAuthenticated
        }),
      }
    )
  )
);
