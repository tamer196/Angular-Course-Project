import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeService : RecipeService,
    private authService : AuthService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();

    return this.http.put('https://ng-course-recripes-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://ng-course-recripes-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map(recipes => {
          return {...recipes,ingredients : recipes.ingredients ? recipes.ingredients : [] }
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

}
