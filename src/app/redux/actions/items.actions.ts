import { createActionGroup, props } from '@ngrx/store';

import { IItem } from '../../models/IItem.model';

export const ItemsActions = createActionGroup({
  source: 'ItemsState',
  events: {
    'Load ItemsData': props<{ itemsData: IItem[] }>(),
    'Add Item': props<{ item: IItem }>(),
    'Delete Item': props<{ itemId: number }>(),
  }
});
