import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './components/sidebar/sidebar.component';
import { AdminHeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    AdminSidebarComponent,
    AdminHeaderComponent,
  ],
  template: `
    <div class="bg-gray-100 font-sans min-h-screen">
      <div class="flex h-screen">
        <!-- Sidebar Component -->
        <app-admin-sidebar></app-admin-sidebar>
        <!-- Main content -->
        <main class="flex-1 bg-gray-100 p-8 ml-64">
          <!-- Header Component -->
          <app-admin-header></app-admin-header>
          <!-- Page Content -->
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class AdminLayoutComponent {}
