import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/inventory">
            <mat-icon>inventory_2</mat-icon>
            <span>Inventory</span>
          </a>
          <a mat-list-item routerLink="/parties">
            <mat-icon>people</mat-icon>
            <span>Parties</span>
          </a>
          <a mat-list-item routerLink="/transactions">
            <mat-icon>receipt</mat-icon>
            <span>Transactions</span>
          </a>
          <a mat-list-item routerLink="/banking">
            <mat-icon>account_balance</mat-icon>
            <span>Banking</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Business Management System</span>
          <span class="spacer"></span>
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      padding: 20px;
    }
    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  `]
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}