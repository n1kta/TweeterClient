import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultModel } from 'src/app/helpers/models/result.model';
import { Comment } from 'src/app/models/comment.model';
import { CreateComment } from 'src/app/models/createComment.model';
import { CommentService } from 'src/app/services/comment.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  model: CreateComment = {
    description: null,
    userProfileId: null,
    tweetId: null
  };

  @Input() tweetId: number;

  @Input() userProfileId: number;

  @Input() comments: Comment[];

  @Output() onAddComment = new EventEmitter<any>();

  constructor(private tweetService: TweetService,
              private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.model.tweetId = this.tweetId;
    this.model.userProfileId = this.userProfileId;
  }

  async addComment(event) {
    if (event.keyCode === 13 && this.model.description) {
      try {
        const response = await this.commentService.addComment(this.model) as ResultModel;
        if (response.isSuccess) {
          this.model.description = null;
          this.onAddComment.emit(true);
        }
      }
      catch (e) {
        console.error(e);
      }
    }
  }
}
