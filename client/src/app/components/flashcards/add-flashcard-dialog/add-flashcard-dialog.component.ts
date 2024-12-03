import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { Flashcard } from '@models/flashcard';
import { FlashcardPageComponent } from '@components/index';

@Component({
  selector: 'app-add-flashcard-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-flashcard-dialog.component.html',
  styleUrl: './add-flashcard-dialog.component.css',
})
export class AddFlashcardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FlashcardPageComponent>);
  protected frontText = '';
  protected backText = '';

  public onOk(): Flashcard {
    return new Flashcard(this.frontText, this.backText);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
