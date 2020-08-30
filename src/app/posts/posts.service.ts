import { MessageService, ConfirmationService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    getPosts() {
        // this.http
        //     .get<{ message: string; posts: any }>(
        //         BACKEND_URL
        //     )
        //     .pipe(map((postData) => {
        //         return postData.posts.map(post => {
        //             return {
        //                 title: post.title,
        //                 content: post.content,
        //                 id: post._id,
        //                 creator: post.creator,
        //                 date: post.date
        //             };
        //         });
        //     }))
        //     .subscribe(transformedPosts => {
        //         this.posts = transformedPosts;
        //         this.postsUpdated.next([...this.posts]);
        //     });
    }

    getPostsByUserId(userId: string) {
        this.http
            .get<{ message: string; posts: any }>(
                BACKEND_URL + 'user/' + userId
            )
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        creator: post.creator,
                        date: post.date
                    };
                });
            }))
            .subscribe(transformedPosts => {
                this.posts = transformedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPost(id: string) {
        return this.http.get<{ _id: string, title: string, content: string, creator: string, date: number }>
            (BACKEND_URL + id);
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string, date: number) {
        const post: Post = { id: null, title: title, content: content, creator: null, date: date };
        this.http
            .post<{ message: string, postId: string }>(BACKEND_URL, post)
            .subscribe(res => {
                post.id = res.postId;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/list'], { queryParams: { success: true } });
                this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your entry has been added!' });
            }, error => {
                this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Your entry has not been added.' });
            });
    }

    updatePost(id: string, title: string, content: string, date: number) {
        const post: Post = { id: id, title: title, content: content, creator: null, date: date };
        this.http.put(BACKEND_URL + id, post).subscribe(res => {
            const updatedPosts = [...this.posts];
            const oldPostIdx = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIdx] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/list']);
            this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your entry has updated.' });
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Your entry has not been updated.' });
        });
    }

    deletePost(postId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this entry?',
            accept: () => {
                this.http.delete(BACKEND_URL + postId)
                    .subscribe(() => {
                        const updatedPosts = this.posts.filter(post => post.id !== postId);
                        this.posts = updatedPosts;
                        this.postsUpdated.next([...this.posts]);
                        this.router.navigate(['/list']);
                        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your entry has been deleted.' });
                    }, error => {
                        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Your entry has not been deleted.' });
                    });
            }
        });

    }
}
