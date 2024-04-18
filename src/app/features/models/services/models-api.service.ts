import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelsListItemDto } from '../models/models-list-item-dto';

@Injectable({
  providedIn: 'root',
})
export class ModelsApiService {
  constructor(private http: HttpClient) {}

  getList(): Observable<ModelsListItemDto[]> {
    return this.http.get<ModelsListItemDto[]>('http://localhost:3000/models');
  }
}
