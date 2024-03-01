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

  public addItem(item: IItem): Observable<IItem> {
    return this.httpClient.post<IItem>(this.url, item);
  }

  public deleteItem(itemId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${itemId}`);
  }
  
  public updateItem(item: IItem): Observable<IItem> {
    return this.httpClient.put<IItem>(`${this.url}/${item.item_id}`, item);
  }
}
