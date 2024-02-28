import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';

import { IItem } from '../../models/IItem.model';
import { ItemsService } from '../../services/items.service';
import { ItemsActions } from '../actions/items.actions';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private itemsService: ItemsService) {}

  loadItemsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItemsActions.loadItemsData),
      exhaustMap(() => {
        return this.itemsService.getItemsData().pipe(
          map((itemsData: IItem[]) => {
            return ItemsActions.loadItemsData({ itemsData });
          })
        );
      })
    );
  });
}
