// src/components/layout/role-card.tsx
import React, { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash2 } from "lucide-react";
import { Role } from "@/types/roles";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  role: Role;
  onDelete?: () => void;
  onChange: (updatedRole: Partial<Role>) => void;
}

const MAX_GOALS = 2;
const MAX_LINES = 3;
const MAX_TITLE_LENGTH = 30;
const MAX_GOAL_LENGTH = 120;

export default function RoleCard({ role, onDelete, onChange }: RoleCardProps) {
  const goalInputRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});
  
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    if (newTitle.length <= MAX_TITLE_LENGTH) {
      onChange({ 
        title: newTitle,
        isDefault: false
      });
    }
  };

  const handleTitleFocus = () => {
    if (role.isDefault) {
      onChange({ 
        title: "",
        isDefault: false
      });
    }
  };

  const handleTitleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    if (!newTitle) {
      onChange({ 
        title: "🔥 Name Your Role",
        isDefault: true
      });
    }
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleGoalChange = (goalId: string, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    
    if (newText.length > MAX_GOAL_LENGTH) return;
    
    const lines = newText.split('\n');
    if (lines.length > MAX_LINES) return;
    
    const updatedGoals = role.goals.map(goal =>
      goal.id === goalId 
        ? { ...goal, text: newText, isDefault: false }
        : goal
    );

    onChange({ goals: updatedGoals });
    adjustTextareaHeight(event.target);
  };

  const handleGoalKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>, goalId: string) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (role.goals.length < MAX_GOALS) {
        const newGoalId = Date.now().toString();
        const newGoal = {
          id: newGoalId,
          text: "",
          completed: false,
          isDefault: false
        };
        onChange({ goals: [...role.goals, newGoal] });
        
        setTimeout(() => {
          goalInputRefs.current[newGoalId]?.focus();
        }, 0);
      }
    } else if (event.key === 'Enter' && event.shiftKey) {
      const currentLines = event.currentTarget.value.split('\n').length;
      if (currentLines >= MAX_LINES) {
        event.preventDefault();
      }
    }
  };

  const handleGoalFocus = (goalId: string) => {
    const updatedGoals = role.goals.map(goal =>
      goal.id === goalId && goal.isDefault
        ? { ...goal, text: "", isDefault: false }
        : goal
    );
    onChange({ goals: updatedGoals });
  };

  const handleGoalBlur = (goalId: string, event: React.FocusEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value.trim();
    if (!newText) {
      if (role.goals.length > 1) {
        onChange({ 
          goals: role.goals.filter(goal => goal.id !== goalId)
        });
      } else {
        onChange({ 
          goals: [{
            id: "1",
            text: "Add up to 2 goals",
            completed: false,
            isDefault: true
          }]
        });
      }
    }
  };

  const toggleGoalCompletion = (goalId: string) => {
    const updatedGoals = role.goals.map(goal =>
      goal.id === goalId
        ? { ...goal, completed: !goal.completed }
        : goal
    );
    onChange({ goals: updatedGoals });
  };

  const cardContent = (
    <CardContent className="pt-6">
      <Input
        value={role.title}
        onChange={handleTitleChange}
        onFocus={handleTitleFocus}
        onBlur={handleTitleBlur}
        className={`!text-xl font-semibold mb-4 border-none p-0 h-auto focus-visible:ring-0 ${
          role.isDefault ? 'text-muted-foreground' : ''
        }`}
      />
      <div className="space-y-2">
        {role.goals.map(goal => (
          <div key={goal.id} className="flex items-start space-x-2">
            <Checkbox
              checked={goal.completed}
              onCheckedChange={() => toggleGoalCompletion(goal.id)}
              className="mt-1 flex-shrink-0"
            />
            <div className="flex-1 min-w-0"> {/* Add wrapper div */}
              <textarea
                ref={el => goalInputRefs.current[goal.id] = el}
                value={goal.text}
                onChange={(e) => handleGoalChange(goal.id, e)}
                onKeyDown={(e) => handleGoalKeyPress(e, goal.id)}
                onFocus={() => handleGoalFocus(goal.id)}
                onBlur={(e) => handleGoalBlur(goal.id, e)}
                rows={1}
                spellCheck={false}
                className={cn(
                  "w-full outline-none resize-none bg-transparent p-0 block",
                  "whitespace-pre-wrap break-words overflow-hidden",
                  goal.isDefault && "text-muted-foreground italic"
                )}
                style={{ 
                  minHeight: '24px',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-full">
          {cardContent}
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onDelete} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Role
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}