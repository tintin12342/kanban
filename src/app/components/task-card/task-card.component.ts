import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Priority, Task } from '../../models/task.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-task-card',
  imports: [MatCardModule, MatChipsModule, MatDividerModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;

  readonly Priority = Priority;
}
