import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TasksResponse,
  TaskFilters,
  User,
  DashboardAnalytics,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(filters?: TaskFilters): Observable<TasksResponse> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = (filters as any)[key];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<TasksResponse>(`${this.apiUrl}/tasks`, { params });
  }

  getTask(taskId: string): Observable<{ task: Task }> {
    return this.http.get<{ task: Task }>(`${this.apiUrl}/tasks/${taskId}`);
  }

  createTask(
    task: CreateTaskRequest
  ): Observable<{ message: string; task: Task }> {
    console.log(task);
    return this.http.post<{ message: string; task: Task }>(
      `${this.apiUrl}/tasks`,
      task
    );
  }

  updateTask(
    taskId: string,
    updates: UpdateTaskRequest
  ): Observable<{ message: string; task: Task }> {
    return this.http.put<{ message: string; task: Task }>(
      `${this.apiUrl}/tasks/${taskId}`,
      updates
    );
  }

  updateTaskStatus(
    taskId: string,
    status: 'open' | 'closed'
  ): Observable<{ message: string; task: Task }> {
    return this.http.patch<{ message: string; task: Task }>(
      `${this.apiUrl}/tasks/${taskId}/status`,
      { status }
    );
  }

  deleteTask(taskId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/tasks/${taskId}`
    );
  }

  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.apiUrl}/users`);
  }

  getDashboardAnalytics(): Observable<DashboardAnalytics> {
    return this.http.get<DashboardAnalytics>(
      `${this.apiUrl}/analytics/dashboard`
    );
  }

  duplicateTask(task: Task): Observable<{ message: string; task: Task }> {
    const duplicateTaskData: CreateTaskRequest = {
      entity_name: `${task.entity_name} (Copy)`,
      task_type: task.task_type,
      task_time: new Date().toISOString(),
      contact_person_id: task.contact_person?.id || '',
      note: task.note || undefined,
    };

    return this.createTask(duplicateTaskData);
  }
}
