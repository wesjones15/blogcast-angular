import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog-service/blog.service';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  blog: Blog;
  currentUser: User = {
    id: 1,
    username: 'wes',
    createdOn: null
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private blogService: BlogService,
    private $localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }
  addBlog(title: string, description: string) {
    const blogToAdd: Blog = {
      id: null,
      title,
      description,
      createdOn: new Date(),
      ownerId: this.currentUser.id,
      ownerName: this.$localStorage.retrieve('username')
    };
    this.blogService.addBlog(blogToAdd).subscribe();
  }
}
