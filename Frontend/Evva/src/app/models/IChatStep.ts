export interface IChatStep {
  message: string;
  inputType: 'text' | 'radio' | 'checkbox' | 'select' | 'end';
  options?: string[];
}
