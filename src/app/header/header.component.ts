import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit,OnDestroy {

    isAuthinticated = false;
    subscription : Subscription;

    constructor(private dataStorage : DataStorageService,
        private authService : AuthService ){}

    onSaveRecipes(){
        this.dataStorage.storeRecipes();
    }

    onFetchRecipe(){
        this.dataStorage.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnInit() {
        this.subscription = this.authService.user.subscribe(user => {
            this.isAuthinticated = !!user;
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}