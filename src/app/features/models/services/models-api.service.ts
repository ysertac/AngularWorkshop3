import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelsListItemDto } from '../models/models-list-item-dto';
import { PostModelRequest } from '../models/post-model-request';
import { PostModelResponse } from '../models/post-model-response';

@Injectable({
  providedIn: 'root',
})
export class ModelsApiService {
  constructor(private http: HttpClient) {}

  getList(brandId: number | null = null): Observable<ModelsListItemDto[]> {
    const requestQueryParams: any = {};
    if (brandId != null) requestQueryParams.brandId = brandId;

    return this.http.get<ModelsListItemDto[]>('http://localhost:3000/models', {
      params: requestQueryParams,
    });
  }

  postModel(model: PostModelRequest): Observable<PostModelResponse> {
    return this.http.post<PostModelResponse>(
      'http://localhost:3000/models',
      model
    );
  }
}
