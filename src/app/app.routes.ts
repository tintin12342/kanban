import { Routes } from '@angular/router';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: KanbanBoardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: '',
    component: KanbanBoardComponent,
  },
];
