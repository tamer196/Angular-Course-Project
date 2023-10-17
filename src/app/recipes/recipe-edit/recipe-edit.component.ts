import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number;
  editMode  = false;
  recipeForm : FormGroup;

  constructor(private route : ActivatedRoute,
    private recipeService : RecipeService,
    private router : Router) {}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        //console.log(this.editMode);
      }
    );
  }

  initForm() {
    const recipe = this.editMode ? this.recipeService.getRecipe(this.id) : null;
  
    const recipeName = recipe ? recipe.name : '';
    const imagePath = recipe ? recipe.imagePath : '';
    const description = recipe ? recipe.description : '';
  
    const recipeIngredients = new FormArray([]);
  
    if (recipe && recipe.ingredients) {
      for (const ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount,[
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
          })
        );
      }
    }
  
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imgPath': new FormControl(imagePath,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': recipeIngredients,
    });
  }
  

  onSubmit(){
    debugger;
    const recip = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imgPath'],
      this.recipeForm.value['ingredients'],
    );
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,recip);
    }else{
      this.recipeService.addRecipe(recip);
    }
    this.onCancel();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo : this.route});
  }

  onDeleteRecipe(index : number){
    (<FormArray>this.recipeForm.get(['ingredients'])).removeAt(index);
  }

}
