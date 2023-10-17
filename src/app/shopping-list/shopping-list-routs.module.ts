import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const routs : Routes = [
    {path : '', component : ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routs)],
    exports: [RouterModule]
})

export class ShoppingListRoutsModule {}