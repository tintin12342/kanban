export enum Status {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum Priority {
  LOW = 'LOW',
  MED = 'MED',
  HIGH = 'HIGH',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  version: number;
}

export interface TaskApiResult {
  content: Task[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
