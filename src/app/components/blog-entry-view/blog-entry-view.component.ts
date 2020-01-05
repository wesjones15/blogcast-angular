import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Blog } from '../../models/blog';
import { BlogEntry } from '../../models/blogEntry';
import { BlogService } from '../../services/blog-service/blog.service';
import { BlogEntryService } from '../../services/blog-entry-service/blog-entry.service';

@Component({
  selector: 'app-blog-entry-view',
  templateUrl: './blog-entry-view.component.html',
  styleUrls: ['./blog-entry-view.component.css']
})
export class BlogEntryViewComponent implements OnInit {
  // These objects are placeholders while Spring is down
  blog: Blog = {
    id: 1,
    title: 'my blog',
    description: 'i blog about stuff',
    ownerId: 1,
    ownerName: 'wes',
    createdOn: null
  };
  entry: BlogEntry = {
    id: 1,
    title: 'entry 1',
    body: 'blah blah blah',
    authorName: 'wes',
    authorId: 1,
    blogId: 1,
    createdOn: null
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private blogService: BlogService,
    private entryService: BlogEntryService
  ) { }

  ngOnInit(): void {
    this.getBlog();
    this.getBlogEntry();
  }

  getBlog(): void {
    const id = +this.route.snapshot.paramMap.get('blogId');
    this.blogService.getBlog(id).subscribe(blog => this.blog = blog);
  }

  getBlogEntry(): void {
    const entryId = +this.route.snapshot.paramMap.get('entryId');
    this.entryService.getBlogEntry(entryId).subscribe(entry => this.entry = entry);
  }

  deleteBlogEntry(entryId: number): void {
    this.entryService.deleteBlogEntry(entryId).subscribe(entry => this.entry = entry);
  }

  goBack() {
    this.location.back();
  }
}
