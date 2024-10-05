import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, NgIf, MatDialogActions, MatDialogContent],  // Import necessary Angular Material modules
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,  // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: any  // Inject data passed to the dialog
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);  // Close the dialog and return 'true' on confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false);  // Close the dialog and return 'false' on cancel
  }
}
