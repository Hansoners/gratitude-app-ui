import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OrderListModule } from 'primeng/orderlist';
import { ListboxModule } from 'primeng/listbox';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web/build/player/lottie_svg';

export function playerFactory() {
    return player;
  }

@NgModule({
    declarations: [
        AppComponent,
        PostCreateComponent,
        PostListComponent,
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        LottieModule.forRoot({ player: playerFactory, useCache: true }),
        InputTextModule,
        DialogModule,
        ButtonModule,
        CardModule,
        InputTextareaModule,
        AccordionModule,
        ToastModule,
        ToolbarModule,
        AppRoutingModule,
        ProgressSpinnerModule,
        OrderListModule,
        ListboxModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
