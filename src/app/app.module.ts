import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AlertComponent } from "./alert/alert.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { AuthInterceptorInterceptor } from "./auth/auth-interceptor.interceptor";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header/header.component";
import { RecipeService } from "./recipes/recipe.service";
import { RecipesModule } from "./recipes/recipes.module";
import { PlaceholderDirective } from "./shared/Placeholder/placeholder.directive";
import { DropDownDirective } from "./shared/drop-down.directive";
import { SpinnerLoaderComponent } from "./shared/spinner-loader/spinner-loader.component";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShoppingListModule,
    SharedModule,
    CoreModule 
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
