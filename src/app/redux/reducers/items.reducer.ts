import { createReducer, on } from '@ngrx/store';

import { IItem } from '../../models/IItem.model';
import { ItemsActions } from '../actions/items.actions';

export const itemsFeatureKey = 'itemsState';

export interface ItemsState {
  itemsData: IItem[];
}

export const initialState: ItemsState = {
  itemsData: [],
};

export const itemsReducer = createReducer(
  initialState,
  on(ItemsActions.loadItemsData,
    (state, { itemsData }): ItemsState => ({ ...state, itemsData }))
);
