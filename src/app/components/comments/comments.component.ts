import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultModel } from 'src/app/helpers/models/result.model';
import { Comment } from 'src/app/models/comment.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  model: Comment = {
    description: null,
    userProfile: {
      id: null,
      fullName: null,
      bio: null,
      photo: null,
      phone: null
    },
    tweet: {
      id: null,
      description: null,
      photo: null,
      userName: null,
      userProfile: null,
      likes: null,
      isLiked: null,
      comment: null,
      addedDate: null
    },
    addedDate: null
  };

  @Input() tweetId: number;

  @Input() userProfileId: number;

  @Input() comments: Comment[];

  @Output() onAddComment = new EventEmitter<any>();

  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.model.tweet.id = this.tweetId;
    this.model.userProfile.id = this.userProfileId;
  }

  async addComment(event) {
    if (event.keyCode === 13 && this.model.description) {
      try {
        const response = await this.tweetService.addComment(this.model) as ResultModel;
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
