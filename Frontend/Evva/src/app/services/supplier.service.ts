// services/supplier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISupplier } from '../models/ISupplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = 'http://localhost:3000/api/suppliers';

  constructor(private http: HttpClient) {}

  async getSupplierById(supplierId: number): Promise<ISupplier> {
  const response = await this.http.get<ISupplier>(`http://localhost:3000/api/suppliers/${supplierId}`).toPromise();
  
  if (!response) {
    throw new Error(`Supplier with ID ${supplierId} not found`);
  }

  return response;
}
}
