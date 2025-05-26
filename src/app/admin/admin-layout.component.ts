// src/app/admin/admin-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminDashboardComponent],
  template: `
    <div class="admin-wrapper">
      <app-admin-dashboard></app-admin-dashboard>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AdminLayoutComponent {}
