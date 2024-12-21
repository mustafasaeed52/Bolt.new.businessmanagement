import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../../../core/services/inventory.service';
import { Product } from '../../../core/models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  template: `
    <div class="inventory-container">
      <div class="header">
        <h1>Inventory Management</h1>
        <button mat-raised-button color="primary" (click)="openAddDialog()">
          Add Product
        </button>
      </div>

      <mat-table [dataSource]="products">
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
          <mat-cell *matCellDef="let product"> {{product.name}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="sku">
          <mat-header-cell *matHeaderCellDef> SKU </mat-header-cell>
          <mat-cell *matCellDef="let product"> {{product.sku}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="quantity">
          <mat-header-cell *matHeaderCellDef> Quantity </mat-header-cell>
          <mat-cell *matCellDef="let product"> {{product.quantity}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="unitPrice">
          <mat-header-cell *matHeaderCellDef> Unit Price </mat-header-cell>
          <mat-cell *matCellDef="let product"> {{product.unitPrice | currency}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef> Actions </mat-header-cell>
          <mat-cell *matCellDef="let product">
            <button mat-icon-button (click)="openEditDialog(product)">
              <mat-icon>edit</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
    </div>
  `,
  styles: [`
    .inventory-container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  `]
})
export class InventoryListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['name', 'sku', 'quantity', 'unitPrice', 'actions'];

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  private async loadProducts() {
    try {
      this.products = await this.inventoryService.getProducts();
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  }

  openAddDialog() {
    // Implement add dialog
  }

  openEditDialog(product: Product) {
    // Implement edit dialog
  }
}