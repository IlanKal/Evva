export interface IChatStep {
  message: string;
  inputType: 'text' | 'radio' | 'checkbox' | 'select' | 'number' | 'date' | 'time' | 'end';
  options?: string[];
  id?: string;
}
