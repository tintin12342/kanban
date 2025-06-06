import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskApiResult } from '../models/task.model';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  #http = inject(HttpClient);
  #apiUrl = `${environment.apiUrl}/tasks`;

  getTasks(): Observable<TaskApiResult> {
    return this.#http.get<TaskApiResult>(this.#apiUrl);
  }

  getTask(id: string): Observable<TaskApiResult> {
    return this.#http.get<TaskApiResult>(`${this.#apiUrl}/${id}`);
  }

  createTask(task: Omit<Task, 'id'>): Observable<TaskApiResult> {
    return this.#http.post<TaskApiResult>(this.#apiUrl, task);
  }

  updateTask(id: string, task: Omit<Task, 'id'>): Observable<TaskApiResult> {
    return this.#http.put<TaskApiResult>(`${this.#apiUrl}/${id}`, task);
  }

  patchTask(id: string, updates: Task[]): Observable<TaskApiResult> {
    return this.#http.patch<TaskApiResult>(
      `${this.#apiUrl}/${id}`,
      updates,
      { headers: { 'Content-Type': 'application/json-patch+json' } }
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.#http.delete<void>(`${this.#apiUrl}/${id}`);
  }
}