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
  toggleEdit: Boolean = false;
  // These objects are placeholders while Spring is down
  blog: Blog = {
    id: 1,
    title: 'my blog',
    description: 'i blog about stuff',
    ownerId: 1,
    ownerName: 'wes',
    createdOn: new Date()
  };
  entry: BlogEntry = {
    id: 1,
    title: 'entry 1',
    body: 'blah blah blah',
    authorName: 'wes',
    authorId: 1,
    blogId: 1,
    createdOn: new Date(Date.now())
  };

  // timestamp: string = this.entry.createdOn.toLocaleString();


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
    console.log(this.blog.createdOn.toString());
  }

  getBlogEntry(): void {
    const entryId = +this.route.snapshot.paramMap.get('entryId');
    this.entryService.getBlogEntry(entryId).subscribe(entry => this.entry = entry);
  }

  deleteBlogEntry(entryId: number): void {
    this.entryService.deleteBlogEntry(entryId).subscribe();
  }

  editBlogEntry(entry: BlogEntry, title: string, body: string): void {
    entry.title = title;
    entry.body = body;
    this.entryService.editBlogEntry(entry).subscribe(_ => this.flipToggleEdit());
  }

  goBack() {
    this.location.go(`/blog/${+this.route.snapshot.paramMap.get('blogId')}`);
  }

  flipToggleEdit() {
    this.toggleEdit = !this.toggleEdit;
  }
}
