import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

  ingredientChanged = new Subject<Ingredients []> ();
  startedEditting = new Subject<number>();

  private ingredients: Ingredients[] = [
    new Ingredients("Apple",5),
    new Ingredients("tomato",10),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index : number){
    return this.ingredients[index];
  }

  addIngredients(ingredient : Ingredients){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients);
  }

  addIngredientsRecipe(ingredients : Ingredients[]){
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateItem(index : number , newIngred : Ingredients){
    this.ingredients[index] = newIngred;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteItem(index : number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
