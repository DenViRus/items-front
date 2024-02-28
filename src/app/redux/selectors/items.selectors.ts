import { createFeatureSelector, createSelector } from '@ngrx/store';

import { itemsFeatureKey,ItemsState } from '../reducers/items.reducer';

export const selectItemsState = createFeatureSelector<ItemsState>(itemsFeatureKey);

export const selectItemsData = createSelector(
  selectItemsState,
  (state: ItemsState) => state.itemsData
);
