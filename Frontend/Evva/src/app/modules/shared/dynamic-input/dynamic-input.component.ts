import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule],
  standalone: true
})
export class DynamicInputComponent {
  @Input() inputType!: 'text' | 'radio' | 'checkbox' | 'select';
  @Input() options: string[] = [];
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();

  onChange(value: any) {
    this.modelChange.emit(value);
  }

  onCheckboxChange(option: string, event: any) {
    const updated = { ...(this.model || {}) };
    updated[option] = event.target.checked;
    this.modelChange.emit(updated);
  }
}
