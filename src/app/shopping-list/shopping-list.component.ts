import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[] = [];
  private igChangeSubscription : Subscription

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSubscription = this.slService.ingredientChanged.subscribe(
      (ings : Ingredients[]) => {
        this.ingredients = ings;
      }
    );
  }

  ngOnDestroy() {
    this.igChangeSubscription.unsubscribe();
  }

  onEditItem(id : number){
    this.slService.startedEditting.next(id);
  }

}
