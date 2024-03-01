import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  selector: 'app-update-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.scss',
})
export class UpdateItemComponent implements OnChanges {
  @Output() closeModal = new EventEmitter<void>();
  @Output() updateItemEvent = new EventEmitter<IItem>();
  @Input() updateData!: IItem;
  updateItem: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['updateData'] && changes['updateData'].currentValue) {
      this.updateItem.setValue({
        itemName: this.updateData.item_name,
        itemCount: this.updateData.item_count,
        itemPrice: this.updateData.item_price,
        itemDesc: this.updateData.item_desc,
      });
    }
  }

  constructor(private fb: FormBuilder, private itemsService: ItemsService) {
    this.updateItem = this.fb.group({
      itemName: new FormControl(``, [Validators.required]),
      itemCount: new FormControl('', [Validators.required, Validators.min(1)]),
      itemPrice: new FormControl('', [Validators.required, Validators.min(0)]),
      itemDesc: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.updateItem.valid) {
      this.updateData = {
        item_id: this.updateData.item_id,
        item_name: this.updateItem.value.itemName,
        item_count: this.updateItem.value.itemCount,
        item_price: this.updateItem.value.itemPrice,
        item_desc: this.updateItem.value.itemDesc,
      };
      this.updateItemEvent.emit(this.updateData);
      this.closeModal.emit();
      this.updateItem.reset();
    } else {
      this.updateItem.markAllAsTouched();
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  closeUpdateItemModal() {
    this.closeModal.emit();
  }
}
