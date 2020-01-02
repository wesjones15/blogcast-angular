import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '../../services/blog-service/blog.service';
import { BlogEntryService } from '../../services/blog-entry-service/blog-entry.service';
import { Blog } from '../../models/blog';
import { BlogEntry } from '../../models/blogEntry';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: Blog;
  entries: BlogEntry[];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private blogEntryService: BlogEntryService
  ) { }

  ngOnInit(): void {
    this.getBlog();
    this.getBlogEntries();
  }

  getBlog(): void {
    const id = +this.route.snapshot.paramMap.get('blogId');
    this.blogService.getBlog(id).subscribe(blog => this.blog = blog);
  }

  getBlogEntries(): void {
    const blogId = +this.route.snapshot.paramMap.get('blogId');
    this.blogEntryService.getBlogEntriesByBlogId(blogId).subscribe(entries => this.entries = entries);
  }
}
