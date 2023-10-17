import { Component, OnDestroy, ViewChild, ComponentFactoryResolver, Injector } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import Swal from "sweetalert2";
import { AlertComponent } from "../alert/alert.component";
import { PlaceholderDirective } from "../shared/Placeholder/placeholder.directive";
import { AuthService, AuthResponseData } from "./auth.service";



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnDestroy {

  isLoginMode = false;
  isLoading = false;
  error : string = null;
  @ViewChild(PlaceholderDirective,{static:false}) alertHolder: PlaceholderDirective;
  cloesSub : Subscription;
  

  constructor(private authService : AuthService,
    private router : Router,
    private cmpFacRes : ComponentFactoryResolver,
    private injector: Injector){}
  ngOnDestroy() {
    if(this.cloesSub){
      this.cloesSub.unsubscribe();
    }
  }

  showErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.error,
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs : Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObs = this.authService.logIn(email,password);
    }else{
      
      authObs = this.authService.signUp(email,password);
    }

    authObs.subscribe(respData => {
      console.log(respData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMsg => {
      console.log(errorMsg);
      this.error = errorMsg;
      this.showErrorAlertProgeamitacily(errorMsg);
      //this.showErrorAlert();
      this.isLoading = false;
    }
    );

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }


  showErrorAlertProgeamitacily(message : string){
    const alertCmp =  this.cmpFacRes.resolveComponentFactory(AlertComponent);

    const alertPlaceholder = this.alertHolder.viewContainerRef;

    alertPlaceholder.clear();

    const componentRef = alertPlaceholder.createComponent(alertCmp);

    componentRef.instance.message = message;

    this.cloesSub = componentRef.instance.close.subscribe(() => {
      this.cloesSub.unsubscribe();
      alertPlaceholder.clear();
    });
    
    // const alertFactory = this.cmpFacRes.resolveComponentFactory(AlertComponent);

    // // Create an instance of the component with the injector
    // const alertComponentRef = alertFactory.create(this.injector);
    // this.alertHolder.viewContainerRef.insert(alertComponentRef.hostView);

  }

}
