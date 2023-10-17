import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f',{static : false}) slForm : NgForm
  subscription : Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredients;

  constructor(private slService : ShoppingListService) {}

  onAddedIngredientForm(form : NgForm){
    const ingred = new Ingredients(
      form.value.ingName,
      form.value.amount
    );
    if(this.editMode){
      this.slService.updateItem(this.editedItemIndex,ingred);
    }else{
      this.slService.addIngredients(ingred);
    }
    this.onClear();
  }

  ngOnInit() {
    debugger;
    this.subscription = this.slService.startedEditting
    .subscribe(
      (index : number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          ingName : this.editedItem.name,
          amount : this.editedItem.amount
        });
      }
    );
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.slService.deleteItem(this.editedItemIndex);
    this.onClear();
  }

}
