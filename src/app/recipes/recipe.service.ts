import { Injectable } from '@angular/core';

import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes : Recipe[] = [
  //   new Recipe('First Recipe','This a test description','https://www.southernliving.com/thmb/jM1YjcVqzkt-Ej6pMp7qK--c_9Q=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Millionaire_Spaghetti_019-34e9c04b1ae8405088f53450a048e413.jpg',[
  //     new Ingredients('bread',1),
  //     new Ingredients('jucie',5)
  //   ]),
  //   new Recipe('Second Recipe','This a test description','https://hips.hearstapps.com/hmg-prod/images/comfort-food-recipes-chicken-pasta-salad-646670ff9c384.jpeg',[
  //     new Ingredients('tomato',10),
  //     new Ingredients('banana',15)
  //   ]),
  //   new Recipe('Third Recipe','This a test description','https://upload.wikimedia.org/wikipedia/commons/b/b0/Hamburger_%2812164386105%29.jpg',[
  //     new Ingredients('strawberry',20),
  //     new Ingredients('lemon',25)
  //   ])
  // ];
  
  private recipes : Recipe[] = []
  constructor(private slService : ShoppingListService){
  }

  setRecipes(resRecipes : Recipe[]){
    this.recipes = resRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index : number){
    return this.recipes[index];
  }

  addIngredients(ingredients : Ingredients[]){
    this.slService.addIngredientsRecipe(ingredients);
  }

  addRecipe(recip : Recipe){
    this.recipes.push(recip);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index : number,recip : Recipe){
    this.recipes[index] = recip;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
