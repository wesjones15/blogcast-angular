import { Component, OnInit } from '@angular/core';

import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog-service/blog.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs);
  }
}
