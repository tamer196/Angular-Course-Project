import { NgModule } from "@angular/core";
import { AlertComponent } from "../alert/alert.component";
import { SpinnerLoaderComponent } from "./spinner-loader/spinner-loader.component";
import { DropDownDirective } from "./drop-down.directive";
import { PlaceholderDirective } from "./Placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent,
        SpinnerLoaderComponent,
        DropDownDirective,
        PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        SpinnerLoaderComponent,
        DropDownDirective,
        PlaceholderDirective,
        CommonModule
    ]

})

export class SharedModule {}