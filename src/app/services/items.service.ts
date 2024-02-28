import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { IItem } from '../models/IItem.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly url = `${environment.apiUrl}items`;

  constructor(private httpClient: HttpClient) {}

  public getItemsData(): Observable<IItem[]> {
    return this.httpClient.get<IItem[]>(this.url);
  }
}
