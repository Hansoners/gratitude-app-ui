import { MessageService, ConfirmationService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web/build/player/lottie_svg';
import { AuthInterceptor } from './auth/auth-interceptor';
import { PrimeNgModule } from './primeng.module';
import { PostsModule } from './posts/posts.module';
import { IntroComponent } from './intro/intro.component';

export function playerFactory() {
    return player;
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        IntroComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LottieModule.forRoot({ player: playerFactory, useCache: true }),
        AppRoutingModule,
        PrimeNgModule,
        PostsModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
