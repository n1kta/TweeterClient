import { Component, Input, OnInit } from '@angular/core';
import { ResultModel } from 'src/app/helpers/models/result.model';
import { Comment } from 'src/app/models/comment.model';
import { Like } from 'src/app/models/like.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  @Input() comments: Comment[];

  @Input() userProfileId: number;

  model: Like = {
    userProfileId: null,
    destinationId: null
  }

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.model.userProfileId = this.userProfileId;
  }

  async like(comment: Comment) {
    this.model.destinationId = comment.id;

    try {
      const response = await this.commentService.toggleLike(this.model) as ResultModel;
      if (response.succeeded) {
        comment.isLiked = !comment.isLiked;
        comment.likes = comment.isLiked ? ++comment.likes: --comment.likes;
      }
    }
    catch (e) {
      console.error(e);
    }
  }
}
