import { Injectable } from '@angular/core';
import { Task, Status, Priority } from '../models/task.model';
import { Observable, of } from 'rxjs';

let MOCK_TASKS: Task[] = [
  {
    title: 'Design UI',
    description: 'Create wireframes for the new dashboard',
    status: Status.TO_DO,
    priority: Priority.HIGH,
  },
  {
    title: 'Fix login bug',
    description: 'Resolve session timeout issue on login page',
    status: Status.IN_PROGRESS,
    priority: Priority.MED,
  },
  {
    title: 'Database migration',
    description: 'Migrate user data to the new schema',
    status: Status.DONE,
    priority: Priority.HIGH,
  },
  {
    title: 'Write unit tests',
    description: 'Cover core utilities with unit tests',
    status: Status.TO_DO,
    priority: Priority.LOW,
  },
  {
    title: 'Update documentation',
    description: 'Add new API endpoints to the documentation',
    status: Status.IN_PROGRESS,
    priority: Priority.MED,
  },
  {
    title: 'Deploy to staging',
    description: 'Push latest build to staging environment',
    status: Status.DONE,
    priority: Priority.MED,
  },
  {
    title: 'Implement dark mode',
    description: 'Add dark mode toggle to user settings',
    status: Status.TO_DO,
    priority: Priority.LOW,
  },
  {
    title: 'Code review',
    description: 'Review pull requests for the analytics module',
    status: Status.IN_PROGRESS,
    priority: Priority.HIGH,
  },
  {
    title: 'Optimize images',
    description: 'Compress assets to reduce load time',
    status: Status.DONE,
    priority: Priority.LOW,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  getTasks(): Observable<Task[]> {
    return of(MOCK_TASKS);
  }

  createTask(task: Task): Observable<Task[]> {
    MOCK_TASKS = [...MOCK_TASKS, task]
    return of(MOCK_TASKS);
  }

  updateTask(task: Task): Observable<Task[]> {
    return of(MOCK_TASKS.map((t) => (t.title === task.title ? task : t)));
  }
}
