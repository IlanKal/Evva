import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  standalone: true
})
export class DynamicInputComponent {
  @Input() inputType!: 'text' | 'radio' | 'checkbox' | 'select' | 'number' | 'date' | 'time';
  @Input() options: string[] = [];
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();

  onChange(value: any) {
    if (this.inputType === 'date' && value instanceof Date) {
      const iso = value.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      this.modelChange.emit(iso);
    } else {
      this.modelChange.emit(value);
    }
  }
  

  onCheckboxChange(option: string, event: any) {
    const updated = { ...(this.model || {}) };
    updated[option] = event.target.checked;
    this.modelChange.emit(updated);
  }
}
