import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFilters } from '../../models/models';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-filters-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './filters-modal.component.html',
})
export class FiltersModalComponent implements OnInit {
  @Input() currentFilters: TaskFilters = {};
  @Output() applyFilters = new EventEmitter<TaskFilters>();
  @Output() closeModal = new EventEmitter<void>();

  filters = {
    task_type: '',
    status: '' as 'open' | 'closed' | '',
    date_from: '',
    date_to: '',
  };

  taskTypes = ['Call', 'Meeting', 'Video Call'];
  statusOptions: ('open' | 'closed')[] = ['open', 'closed'];

  ngOnInit(): void {
    if (this.currentFilters) {
      this.filters = {
        task_type: this.currentFilters.task_type || '',
        status: this.currentFilters.status || '',
        date_from: this.currentFilters.date_from
          ? new Date(this.currentFilters.date_from).toISOString().split('T')[0]
          : '',
        date_to: this.currentFilters.date_to
          ? new Date(this.currentFilters.date_to).toISOString().split('T')[0]
          : '',
      };
    }
  }

  get isDateRangeValid(): boolean {
    if (this.filters.date_from && this.filters.date_to) {
      return new Date(this.filters.date_from) <= new Date(this.filters.date_to);
    }
    return true;
  }

  onApply(): void {
    if (!this.isDateRangeValid) return;

    const appliedFilters: TaskFilters = {
      task_type: this.filters.task_type || undefined,
      status: this.filters.status === '' ? undefined : this.filters.status,
      date_from: this.filters.date_from
        ? new Date(this.filters.date_from).toISOString()
        : undefined,
      date_to: this.filters.date_to
        ? new Date(this.filters.date_to).toISOString()
        : undefined,
    };
    this.applyFilters.emit(appliedFilters);
  }

  onClose(): void {
    this.closeModal.emit();
  }

  clearFilters(): void {
    this.filters = {
      task_type: '',
      status: '',
      date_from: '',
      date_to: '',
    };
    this.applyFilters.emit({});
  }
}
