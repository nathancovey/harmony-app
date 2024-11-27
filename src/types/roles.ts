export interface Goal {
  id: string;
  text: string;
  completed: boolean;
  isDefault: boolean;
}

export interface Role {
  id: string;
  title: string;
  goals: Goal[];
  isDefault: boolean;
}