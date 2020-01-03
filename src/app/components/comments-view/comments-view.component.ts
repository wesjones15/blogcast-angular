import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment-service/comment.service';

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css']
})
export class CommentsViewComponent implements OnInit {
  comments: Comment[] = [
    {
      body: 'hello',
      authorName: 'wes',
      blogEntryId: 1,
      id: 1,
      createdOn: null,
      authorId: 1
    },
    {
      body: 'hello world',
      authorName: 'welsy',
      blogEntryId: 1,
      id: 1,
      createdOn: null,
      authorId: 1
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.getComments();
  }

  getComments(): void {
    const entryId = +this.route.snapshot.paramMap.get('entryId');
    this.commentService.getCommentsByEntryId(entryId).subscribe(comments => this.comments = comments);
  }
}
