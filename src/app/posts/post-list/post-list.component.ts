import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts;
  isLoading = false;
  userId: string;
  isUserAuth = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  private animationItem: AnimationItem;

  options: AnimationOptions = {
    path: '/assets/empty.json',
  };

  constructor(public postsService: PostsService, private authService: AuthService) {
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isUserAuth = isAuth;
      this.userId = this.authService.getUserId();
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
