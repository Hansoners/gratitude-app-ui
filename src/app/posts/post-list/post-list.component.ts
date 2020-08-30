import { MessageService } from 'primeng/api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [MessageService]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts;
  addedPost = false;
  isLoading = false;
  userId: string;
  isUserAuth = false;
  private postsSub: Subscription;

  options: AnimationOptions = {
    path: '/assets/empty.json',
  };

  constructor(public postsService: PostsService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.posts = this.postsService.getPostsByUserId(this.userId);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
