import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandsListItemDto } from '../models/brands-list-item-dto';

@Injectable({
  providedIn: 'root',
})
export class BrandsApiService {
  constructor(private http: HttpClient) {}

  getList(): Observable<BrandsListItemDto[]> {
    return this.http.get<BrandsListItemDto[]>('http://localhost:3000/brands');
  }
}
