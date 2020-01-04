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
  comments: Comment[] = [];

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

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe();
  }
}
