// src/pages/this-week.tsx
import { useState, useEffect } from "react";
import RoleCard from "@/components/layout/role-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getCurrentWeekRange } from "@/lib/utils";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { Role } from "@/types/roles";

const MAX_ROLES = 6;
const STORAGE_KEY = 'harmony-roles';

const DEFAULT_ROLE: Role = {
  id: '1',
  title: "🔥 Name Your Role",
  goals: [{ id: "1", text: "Add up to 2 goals", completed: false, isDefault: true }],
  isDefault: true,
};

export default function ThisWeek() {
  const [roles, setRoles] = useState<Role[]>([]);

  // Load roles from localStorage on initial render
  useEffect(() => {
    const savedRoles = localStorage.getItem(STORAGE_KEY);
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
    } else {
      // Initialize with one default role if none exist
      setRoles([{ ...DEFAULT_ROLE, id: Date.now().toString() }]);
    }
  }, []);

  // Save roles to localStorage whenever they change
  useEffect(() => {
    if (roles.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
    }
  }, [roles]);

  const handleAddRole = () => {
    if (roles.length < MAX_ROLES) {
      const newRole = {
        ...DEFAULT_ROLE,
        id: Date.now().toString(),
      };
      setRoles([...roles, newRole]);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
    if (roles.length === 1) {
      // If last role is deleted, add a new default role
      setRoles([{ ...DEFAULT_ROLE, id: Date.now().toString() }]);
    }
  };

  const handleUpdateRole = (roleId: string, updatedRole: Partial<Role>) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, ...updatedRole } : role
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{getCurrentWeekRange()}</h1>
        {roles.length < MAX_ROLES && (
          <Button
            onClick={handleAddRole}
            className="gap-2"
            size="lg"
            variant="secondary"
          >
            <Plus className="h-4 w-4" />
            Add Role
          </Button>
        )}
      </div>
      <p className="text-muted-foreground mb-8">
        What is ONE thing you could do this week in each role that would have the greatest positive impact?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onDelete={() => handleDeleteRole(role.id)}
            onChange={(updatedRole) => handleUpdateRole(role.id, updatedRole)}
          />
        ))}
      </div>
      <YouTubeEmbed videoId="YOUR_VIDEO_ID_HERE" />
    </div>
  );
}