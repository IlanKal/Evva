import { Routes } from '@angular/router';
import { ChatComponent } from './modules/chat/components/chat/chat.component';
import { LoginComponent } from './modules/login/components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent }
];
