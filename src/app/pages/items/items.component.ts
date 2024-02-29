import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import { IItem } from '../../models/IItem.model';
import { ItemsActions } from '../../redux/actions/items.actions';
import { selectItemsData } from '../../redux/selectors/items.selectors';
import { AddItemComponent } from '../../shared/add-item/add-item.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [AddItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ItemsComponent implements OnInit, OnDestroy {
  public itemsData: IItem[] = [];
  private itemsDataSubscription!: Subscription;

  public isAddItemModalOpen = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ItemsActions.loadItemsData({ itemsData: [] }));
    this.itemsDataSubscription = this.store
      .select(selectItemsData)
      .pipe(tap((itemsData) => (this.itemsData = itemsData)))
      .subscribe();
  }

  openAddItemModal() {
    this.isAddItemModalOpen = true;
  }

  closeAddItemModal() {
    this.isAddItemModalOpen = false;
  }

  addItem(item: IItem) {
    this.store.dispatch(ItemsActions.addItem({ item }));
  }

  deleteItem(itemId: number) {
    this.store.dispatch(ItemsActions.deleteItem({ itemId }));
  }

  ngOnDestroy(): void {
    this.itemsDataSubscription.unsubscribe();
  }
}
