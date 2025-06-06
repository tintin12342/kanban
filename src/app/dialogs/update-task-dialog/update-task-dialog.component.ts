import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { Status, Priority, Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { StatusEnumConverterPipe } from '../../pipes/status-enum-converter.pipe';
import { LowerCasePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

interface DialogData {
  task: Task;
}

const MAT_MODULES = [
  MatButtonModule,
  MatDialogContent,
  MatDialogActions,
  MatInputModule,
  MatRadioModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatIconModule,
];

@Component({
  selector: 'app-update-task-dialog',
  imports: [MAT_MODULES, StatusEnumConverterPipe, LowerCasePipe],
  templateUrl: './update-task-dialog.component.html',
  styleUrl: './update-task-dialog.component.scss',
})
export class UpdateTaskDialogComponent {
  #fb = inject(FormBuilder);

  readonly dialogRef = inject(MatDialogRef<UpdateTaskDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  taskForm: FormGroup = this.#fb.group({
    title: [this.data.task.title, [Validators.required, Validators.maxLength(100)]],
    description: [this.data.task.description, [Validators.required, Validators.maxLength(400)]],
    priority: [this.data.task.priority, Validators.required],
    status: [this.data.task.status, Validators.required],
  });

  readonly Priority = Priority;
  readonly Status = Status;

  get descriptionLength(): number {
    return this.taskForm.get('description')?.value?.length || 0;
  }

  get titleLength(): number {
    return this.taskForm.get('title')?.value?.length || 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.data.task,
        ...this.taskForm.value
      };
      this.dialogRef.close(updatedTask);
    }
  }

  onDelete(): void {
    this.dialogRef.close({ delete: true, task: this.data.task });
  }
}