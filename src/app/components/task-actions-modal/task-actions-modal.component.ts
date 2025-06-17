import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Task } from '../../models/models';

@Component({
  selector: 'app-task-actions-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './task-actions-modal.component.html',
})
export class TaskActionsModalComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<void>();
  @Output() duplicate = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<'open' | 'closed'>();
  @Output() delete = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }

  onDuplicate(): void {
    this.duplicate.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }

  toggleStatus(): void {
    const newStatus = this.task.status === 'open' ? 'closed' : 'open';
    this.changeStatus.emit(newStatus);
  }
}
