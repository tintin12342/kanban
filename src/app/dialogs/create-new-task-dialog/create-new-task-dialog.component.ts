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
  status: Status;
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
  selector: 'app-create-new-task-dialog',
  imports: [MAT_MODULES, StatusEnumConverterPipe, LowerCasePipe],
  templateUrl: './create-new-task-dialog.component.html',
  styleUrl: './create-new-task-dialog.component.scss',
})
export class CreateNewTaskDialogComponent {
  #fb = inject(FormBuilder);

  readonly dialogRef = inject(MatDialogRef<CreateNewTaskDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  taskForm: FormGroup = this.#fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(400)]],
    priority: [Priority.LOW, Validators.required],
  });

  readonly Priority = Priority;

  get descriptionLength(): number {
    return this.taskForm.get('description')?.value?.length || 0;
  }

  get titleLength(): number {
    return this.taskForm.get('title')?.value?.length || 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        status: this.data.status,
      };
      this.dialogRef.close(newTask);
    }
  }
}
