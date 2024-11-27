import { Link, useLocation } from 'react-router-dom';
import { Calendar, Target, History, BarChart, Compass } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  
  const navigation = [
    { name: 'This Week', href: '/', icon: Calendar },
    { name: 'Mission Statement', href: '/mission', icon: Compass },
    { name: 'Long Term Goals', href: '/long-term-goals', icon: Target },
    { name: 'History', href: '/history', icon: History },
    { name: 'Analytics', href: '/analytics', icon: BarChart },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="p-6">
        <img src="harmony-logo.svg" alt="Harmony" className="h-8" />
      </div>
      
      <nav className="flex-1 space-y-1 px-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center py-2 rounded-md ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="ml-3">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6"> {/* Consistent padding for upgrade section */}
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