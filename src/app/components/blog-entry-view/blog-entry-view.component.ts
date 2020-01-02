import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Blog } from '../../models/blog';
import { BlogEntry } from '../../models/blogEntry';
import { Comment } from '../../models/comment';

import { BlogService } from '../../services/blog-service/blog.service';
import { BlogEntryService } from '../../services/blog-entry-service/blog-entry.service';
import { CommentService } from '../../services/comment-service/comment.service';

@Component({
  selector: 'app-blog-entry-view',
  templateUrl: './blog-entry-view.component.html',
  styleUrls: ['./blog-entry-view.component.css']
})
export class BlogEntryViewComponent implements OnInit {
  blog: Blog;
  entry: BlogEntry;
  comments: Comment[];
// create a form for comment that just has a single
// input field. that form populates an object upon
// submission, and fills it out with a timestamp,
// username, userId, blogEntryId and whatever else it needs
// then send that to springboot where it can generate an id and store it
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private entryService: BlogEntryService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.getBlog();
    this.getBlogEntry();
    this.getComments();
  }

  getBlog(): void {
    const id = +this.route.snapshot.paramMap.get('blogId');
    this.blogService.getBlog(id).subscribe(blog => this.blog = blog);
  }

  getBlogEntry(): void {
    const entryId = +this.route.snapshot.paramMap.get('entryId');
    this.entryService.getBlogEntry(entryId).subscribe(entry => this.entry = entry);
  }

  getComments(): void {
    const entryId = +this.route.snapshot.paramMap.get('entryId');
    this.commentService.getCommentsByEntryId(entryId).subscribe(comments => this.comments = comments);
  }

}
