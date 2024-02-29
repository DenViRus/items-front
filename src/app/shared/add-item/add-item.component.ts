import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IItem } from '../../models/IItem.model';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() addItemEvent = new EventEmitter<IItem>();

  addItem: FormGroup;
  addData!: IItem;

  constructor(private fb: FormBuilder, private itemsService: ItemsService) {
    this.addItem = this.fb.group({
      itemName: new FormControl('', [Validators.required]),
      itemCount: new FormControl('', [Validators.required, Validators.min(1)]),
      itemPrice: new FormControl('', [Validators.required, Validators.min(0)]),
      itemDesc: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.addItem.valid) {
      this.addData = {
        item_name: this.addItem.value.itemName,
        item_count: this.addItem.value.itemCount,
        item_price: this.addItem.value.itemPrice,
        item_desc: this.addItem.value.itemDesc,
      };
      this.addItemEvent.emit(this.addData);
      this.closeModal.emit();
      this.addItem.reset();
    } else {
      this.addItem.markAllAsTouched();
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
