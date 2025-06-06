import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Status, Task, TaskApiResult } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { Observable, BehaviorSubject, switchMap, tap, take } from 'rxjs';
import { TaskCardComponent } from '../task-card/task-card.component';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateNewTaskDialogComponent } from '../../dialogs/create-new-task-dialog/create-new-task-dialog.component';
import { UpdateTaskDialogComponent } from '../../dialogs/update-task-dialog/update-task-dialog.component';
import { StatusEnumConverterPipe } from '../../pipes/status-enum-converter.pipe';

const MAT_MODULES = [
  MatButtonModule,
  TaskCardComponent,
  AsyncPipe,
  MatTooltipModule,
  MatDialogModule,
];

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [MAT_MODULES, StatusEnumConverterPipe],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
  #tasksService = inject(TasksService);
  #dialog = inject(MatDialog);

  readonly Status = Status;
  
  #refreshTrigger = new BehaviorSubject<void>(undefined);
  
  taskApiResult$: Observable<TaskApiResult> = this.#refreshTrigger.pipe(
    switchMap(() => this.#tasksService.getTasks().pipe(take(1)))
  );

  addTask(status: Status): void {
    const dialogRef = this.#dialog.open(CreateNewTaskDialogComponent, {
      data: { status },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.#tasksService.createTask(result).pipe(take(1)).subscribe({
          next: () => this.#refreshTrigger.next(),
          error: (err) => console.error('Error creating task:', err)
        });
      }
    });
  }

  updateTask(selectedTask: Task): void {
    const dialogRef = this.#dialog.open(UpdateTaskDialogComponent, {
      data: { task: selectedTask },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.delete) {
        this.#tasksService.deleteTask(result.task.id).pipe(take(1)).subscribe({
          next: () => this.#refreshTrigger.next(),
          error: (err) => console.error('Error deleting task:', err)
        });
      } else if (result) {
        this.#tasksService.updateTask(result.id, result).pipe(take(1)).subscribe({
          next: () => this.#refreshTrigger.next(),
          error: (err) => console.error('Error updating task:', err)
        });
      }
    });
  }
}