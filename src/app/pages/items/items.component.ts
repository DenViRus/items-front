import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import { IItem } from '../../models/IItem.model';
import { ItemsActions } from '../../redux/actions/items.actions';
import { selectItemsData } from '../../redux/selectors/items.selectors';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent implements OnInit, OnDestroy {
  public itemsData: IItem[] = [];
  private itemsDataSubscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ItemsActions.loadItemsData({ itemsData: [] }));
    this.itemsDataSubscription = this.store
      .select(selectItemsData)
      .pipe(tap((itemsData) => (this.itemsData = itemsData)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.itemsDataSubscription.unsubscribe();
  }
}
