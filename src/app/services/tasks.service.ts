import { Injectable } from '@angular/core';
import { Task, Status, Priority } from '../models/task.model';
import { Observable, of } from 'rxjs';

let MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design UI',
    description: 'Create wireframes for the new dashboard',
    status: Status.TO_DO,
    priority: Priority.HIGH,
  },
  {
    id: '2',
    title: 'Fix login bug',
    description: 'Resolve session timeout issue on login page',
    status: Status.IN_PROGRESS,
    priority: Priority.MED,
  },
  {
    id: '3',
    title: 'Database migration',
    description: 'Migrate user data to the new schema',
    status: Status.DONE,
    priority: Priority.HIGH,
  },
  {
    id: '4',
    title: 'Write unit tests',
    description: 'Cover core utilities with unit tests',
    status: Status.TO_DO,
    priority: Priority.LOW,
  },
  {
    id: '5',
    title: 'Update documentation',
    description: 'Add new API endpoints to the documentation',
    status: Status.IN_PROGRESS,
    priority: Priority.MED,
  },
  {
    id: '6',
    title: 'Deploy to staging',
    description: 'Push latest build to staging environment',
    status: Status.DONE,
    priority: Priority.MED,
  },
  {
    id: '7',
    title: 'Implement dark mode',
    description: 'Add dark mode toggle to user settings',
    status: Status.TO_DO,
    priority: Priority.LOW,
  },
  {
    id: '8',
    title: 'Code review',
    description: 'Review pull requests for the analytics module',
    status: Status.IN_PROGRESS,
    priority: Priority.HIGH,
  },
  {
    id: '9',
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
    MOCK_TASKS = [...MOCK_TASKS, task];
    return of(MOCK_TASKS);
  }

  updateTask(task: Task): Observable<Task[]> {
    MOCK_TASKS = MOCK_TASKS.map((t) => (t.title === task.title ? task : t));
    return of(MOCK_TASKS.map((t) => (t.title === task.title ? task : t)));
  }

  deleteTask(task: Task): Observable<Task[]> {
    MOCK_TASKS = MOCK_TASKS.filter(t => t.id !== task.id);
    return of(MOCK_TASKS);
  }
}
