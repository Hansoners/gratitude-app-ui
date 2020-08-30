import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PrimeNgModule } from '../primeng.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        PrimeNgModule,
        CommonModule,
        RouterModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
