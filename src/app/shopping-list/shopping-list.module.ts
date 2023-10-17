import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { AppRoutingModule } from "../app-routing/app-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingListRoutsModule } from "./shopping-list-routs.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [SharedModule,FormsModule,ShoppingListRoutsModule],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ]
})

export class ShoppingListModule {}