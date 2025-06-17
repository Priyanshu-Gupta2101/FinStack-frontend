import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CreateTaskRequest, Task, User } from '../../models/models';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null | undefined;
  @Output() formSubmitted = new EventEmitter<CreateTaskRequest>();
  @Output() formCanceled = new EventEmitter<void>();

  taskForm: FormGroup;
  @Input() users: User[] = [];
  isLoading = false;
  errorMessage = '';
  formErrors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      entity_name: ['', Validators.required],
      task_type: ['Call', Validators.required],
      task_time: ['', Validators.required],
      contact_person_id: ['', Validators.required],
      note: [''],
      status: ['open'],
    });
  }

  ngOnInit(): void {
    if (this.task) {
      const taskTime = new Date(this.task.task_time);
      const formattedTime = taskTime.toISOString().slice(0, 16);

      this.taskForm.patchValue({
        entity_name: this.task.entity_name,
        task_type: this.task.task_type,
        task_time: formattedTime,
        contact_person_id: this.task.contact_person?.id,
        note: this.task.note,
        status: this.task.status,
      });
    }
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.isLoading = true;
      const formData = this.taskForm.value;
      formData.task_time = new Date(formData.task_time).toISOString();

      if (this.task) {
        delete formData.status;
      }

      this.formSubmitted.emit(formData);
    }
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (this.taskForm.get('entity_name')?.invalid) {
      this.formErrors['entity_name'] = 'Entity name is required';
      isValid = false;
    }

    if (this.taskForm.get('task_time')?.invalid) {
      this.formErrors['task_time'] = 'Task time is required';
      isValid = false;
    }

    if (this.taskForm.get('contact_person_id')?.invalid) {
      this.formErrors['contact_person_id'] = 'Please select a contact person';
      isValid = false;
    }

    return isValid;
  }

  onCancel(): void {
    this.formCanceled.emit();
  }
}
