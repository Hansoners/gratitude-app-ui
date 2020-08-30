import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.css']
})
export class PostHomeComponent implements OnInit {

  constructor() { }

  options: AnimationOptions = {
    path: '/assets/thinking.json',
  };

  ngOnInit(): void {
  }

}
