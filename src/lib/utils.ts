import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentWeekRange() {
  const today = new Date();
  
  const monday = new Date(today);
  const mondayOffset = today.getDay() || 7;
  monday.setDate(today.getDate() - (mondayOffset - 1));
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return `${formatDate(monday)} - ${formatDate(sunday)}`;
}
