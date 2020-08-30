import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import player from 'lottie-web/build/player/lottie_svg';
import { LottieModule } from 'ngx-lottie';
import { PostHomeComponent } from './post-home/post-home.component';
import { PostViewComponent } from './post-view/post-view.component';

export function playerFactory() {
    return player;
}

@NgModule({
    declarations: [
        PostCreateComponent,
        PostListComponent,
        PostHomeComponent,
        PostViewComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PrimeNgModule,
        RouterModule,
        FormsModule,
        LottieModule.forRoot({ player: playerFactory, useCache: true }),
    ]
})
export class PostsModule { }
