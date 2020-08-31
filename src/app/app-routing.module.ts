import { IntroComponent } from './intro/intro.component';
import { PostViewComponent } from './posts/post-view/post-view.component';
import { PostHomeComponent } from './posts/post-home/post-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: IntroComponent },
    { path: 'app', component: PostHomeComponent, canActivate: [AuthGuard] },
    { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: 'view/:postId', component: PostViewComponent, canActivate: [AuthGuard] },
    { path: 'list', component: PostListComponent, canActivate: [AuthGuard] },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
