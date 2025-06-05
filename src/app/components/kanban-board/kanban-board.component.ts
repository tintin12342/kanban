import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Status, Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { Observable, of, take } from 'rxjs';
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
  imports: [MAT_MODULES, StatusEnumConverterPipe],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
  #tasksService = inject(TasksService);
  #dialog = inject(MatDialog);

  readonly Status = Status;

  tasks: Observable<Task[]> = this.#tasksService.getTasks();

  addTask(status: Status): void {
    const dialogRef = this.#dialog.open(CreateNewTaskDialogComponent, {
      data: { status },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.#tasksService
          .createTask(result)
          .pipe(take(1))
          .subscribe((tasks) => {
            this.tasks = of(tasks);
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
        console.log('Deleting task:', result.task);
        this.#tasksService.deleteTask(result).subscribe((tasks) => {
          this.tasks = of(tasks);
        });
      } else if (result) {
        console.log('Updating task:', result);
        this.#tasksService.updateTask(result).subscribe((tasks) => {
          this.tasks = of(tasks);
        });
      }
    });
  }
}
