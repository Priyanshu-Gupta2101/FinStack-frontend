import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {
  Task,
  TaskFilters,
  User,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '../../models/models';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FiltersModalComponent } from '../filters-modal/filters-modal.component';
import { TaskActionsModalComponent } from '../task-actions-modal/task-actions-modal.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    TaskFormComponent,
    FiltersModalComponent,
    TaskActionsModalComponent,
    TruncatePipe,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  @Input() users: User[] = [];
  showTaskFormModal = false;
  showFiltersModal = false;
  showTaskActionsModal = false;
  showStatusChangeModal: string | null = null;
  selectedTask: Task | null = null;
  isLoading = true;
  filters: TaskFilters = {};
  activeFilters: { [key: string]: string } = {};
  objectKeys = Object.keys;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks(this.filters).subscribe({
      next: (response) => {
        this.tasks = response.tasks;
        this.isLoading = false;
        this.updateActiveFilters();
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.isLoading = false;
      },
    });
  }

  loadUsers(): void {
    this.taskService.getUsers().subscribe({
      next: (response) => {
        this.users = response.users;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      },
    });
  }

  openNewTaskModal(): void {
    this.selectedTask = null;
    this.showTaskFormModal = true;
  }

  openTaskActionsModal(task: Task): void {
    this.selectedTask = task;
    this.showTaskActionsModal = true;
  }

  clearTaskTypeFilter(): void {
    this.filters.task_type = undefined;
    this.loadTasks();
  }

  clearDateFromFilter(): void {
    this.filters.date_from = undefined;
    this.loadTasks();
  }

  clearDateToFilter(): void {
    this.filters.date_to = undefined;
    this.loadTasks();
  }

  updateTask(taskId: string, updates: UpdateTaskRequest): void {
    this.isLoading = true;
    this.taskService.updateTask(taskId, updates).subscribe({
      next: () => {
        this.showTaskFormModal = false;
        this.loadTasks();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error updating task:', err);
      },
    });
  }

  onTaskFormSubmit(formData: CreateTaskRequest | UpdateTaskRequest): void {
    this.isLoading = true;
    if (this.selectedTask) {
      this.updateTask(this.selectedTask.id, formData as UpdateTaskRequest);
    } else {
      this.taskService.createTask(formData as CreateTaskRequest).subscribe({
        next: () => {
          this.showTaskFormModal = false;
          this.loadTasks();
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    }
  }

  onFiltersApply(filters: any): void {
    this.filters = {
      ...this.filters,
      task_type: filters.task_type,
      status: filters.status,
      date_from: filters.date_from,
      date_to: filters.date_to,
    };
    this.showFiltersModal = false;
    this.loadTasks();
  }

  updateActiveFilters(): void {
    this.activeFilters = {};

    if (this.filters.task_type) {
      this.activeFilters['Task Type'] = this.filters.task_type;
    }
    if (this.filters.status) {
      this.activeFilters['Status'] = this.filters.status;
    }
    if (this.filters.date_from) {
      this.activeFilters['From'] = this.filters.date_from;
    }
    if (this.filters.date_to) {
      this.activeFilters['To'] = this.filters.date_to;
    }
  }

  clearFilter(filterType: string): void {
    switch (filterType) {
      case 'Status':
        this.filters.status = undefined;
        break;
      case 'Task Type':
        this.filters.task_type = undefined;
        break;
      case 'From':
        this.filters.date_from = undefined;
        break;
      case 'To':
        this.filters.date_to = undefined;
        break;
    }
    this.loadTasks();
  }

  toggleStatusDropdown(taskId: string): void {
    this.showStatusChangeModal =
      this.showStatusChangeModal === taskId ? null : taskId;
  }

  updateTaskStatus(taskId: string, status: 'open' | 'closed'): void {
    this.taskService.updateTaskStatus(taskId, status).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error updating task status:', err);
      },
    });
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.loadTasks();
          this.showTaskActionsModal = false;
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        },
      });
    }
  }

  duplicateTask(task: Task): void {
    this.taskService.duplicateTask(task).subscribe({
      next: () => {
        this.loadTasks();
        this.showTaskActionsModal = false;
      },
      error: (err) => {
        console.error('Error duplicating task:', err);
      },
    });
  }

  getStatusClasses(status: string): any {
    return {
      'px-2': true,
      'py-1': true,
      rounded: true,
      'text-xs': true,
      'font-medium': true,
      'cursor-pointer': true,
      'bg-orange-100': status === 'open',
      'text-orange-800': status === 'open',
      'bg-blue-100': status === 'closed',
      'text-blue-800': status === 'closed',
    };
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.status-dropdown-trigger') &&
      !target.closest('.status-dropdown-menu')
    ) {
      this.showStatusChangeModal = null;
    }
  }
}
