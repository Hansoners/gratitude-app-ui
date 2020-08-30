import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  isLoading = false;
  postId: string;
  post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get('postId');
      this.isLoading = true;
      this.postsService.getPost(this.postId).subscribe(res => {
        this.post = { id: res._id, title: res.title, content: res.content, creator: res.creator, date: res.date };
        this.isLoading = false;
      });
    });
  }

  onDelete() {
    this.postsService.deletePost(this.postId);
    this.router.navigate(['/list']);
  }

}
