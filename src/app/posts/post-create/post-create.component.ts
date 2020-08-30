import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  providers: [MessageService]
})
export class PostCreateComponent implements OnInit {

  myDate: number;
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;

  constructor(public postsService: PostsService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.myDate = Date.now();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(res => {
          this.post = { id: res._id, title: res.title, content: res.content, creator: res.creator, date: res.date };
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Your entry is invalid.' });
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content, this.myDate);
    } else if (this.mode === 'edit') {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content, this.post.date);
    }
    this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your entry has been saved.' });
    form.resetForm();
    this.isLoading = false;
  }
}
