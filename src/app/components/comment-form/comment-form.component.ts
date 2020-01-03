import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment-service/comment.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  comment: Comment;
  user: User = {
    id: 1,
    username: 'wes',
    createdOn: null
  };

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) { }

  ngOnInit() {
  }

  addComment(body: string): void {
    const comment: Comment = {
      id: null,
      body,
      createdOn: new Date(),
      authorId: this.user.id,
      authorName: this.user.username,
      blogEntryId: +this.route.snapshot.paramMap.get('entryId')
    };
    this.commentService.addComment(comment).subscribe();  // refactor?
  }
}
