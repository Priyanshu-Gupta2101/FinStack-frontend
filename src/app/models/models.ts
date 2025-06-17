export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
}

export interface Task {
  id: string;
  date_created: string;
  entity_name: string;
  task_type: string;
  task_time: string;
  contact_person: User | null;
  note: string | null;
  status: 'open' | 'closed';
  created_by: User | null;
  updated_at: string;
}

export interface CreateTaskRequest {
  entity_name: string;
  task_type: string;
  task_time: string;
  contact_person_id: string;
  note?: string;
  status?: 'open' | 'closed';
}

export interface UpdateTaskRequest {
  entity_name?: string;
  task_type?: string;
  task_time?: string;
  contact_person_id?: string;
  note?: string;
  status?: 'open' | 'closed';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  access_token: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  details?: any;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface TaskFilters {
  status?: 'open' | 'closed';
  task_type?: string;
  entity_name?: string;
  contact_person_id?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

export interface DashboardAnalytics {
  summary: {
    total_tasks: number;
    open_tasks: number;
    closed_tasks: number;
  };
  task_types: Array<{
    type: string;
    count: number;
  }>;
  user_tasks: Array<{
    user: string;
    count: number;
  }>;
}
