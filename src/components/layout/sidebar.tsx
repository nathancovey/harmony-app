// src/components/layout/sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Target, History, BarChart, Compass } from 'lucide-react';
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();
  
  const navigation = [
    { name: 'This Week', href: '/', icon: Calendar },
    { name: 'Mission Statement', href: '/mission', icon: Compass },
    { name: 'Long Term Goals', href: '/long-term-goals', icon: Target },
    { name: 'History', href: '/history', icon: History },
    { name: 'Analytics', href: '/analytics', icon: BarChart },
  ];

  const isActivePage = (href: string) => {
    if (href === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname === href;
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="px-6 py-5">
        <img src="harmony-logo.svg" alt="Harmony" className="h-8" />
      </div>
      
      <nav className="flex-1 space-y-1 px-6">
        {navigation.map((item) => {
          const isActive = isActivePage(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center h-9 rounded-md",
                "hover:bg-secondary/80",
                isActive 
                  ? "text-purple-600 font-medium dark:bg-purple-950 dark:text-purple-400" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="px-6 py-5">
        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-semibold">Upgrade to Pro</h3>
          <p className="text-sm text-muted-foreground">
            Keep track of your history and unlock powerful analytics.
          </p>
          <button className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}