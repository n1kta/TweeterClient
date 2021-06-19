import { Component, Input, OnInit } from '@angular/core';
import { ResultModel } from 'src/app/helpers/models/result.model';
import { Like } from 'src/app/models/like.model';
import { Tweet } from 'src/app/models/tweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweets: Tweet[];
  
  like: Like = {
    userProfileId: null,
    destinationId: null
  };

  @Input() userProfileId: number;

  constructor(private tweetService: TweetService) { }

  async ngOnInit() {
    this.tweets = await this.getTweets();
  }

  async getTweets() {
    return await this.tweetService.getTweetsFollowers(this.userProfileId) as Tweet[];
  }

  async toggleLike(tweet: Tweet) {
    this.like.userProfileId = this.userProfileId;
    this.like.destinationId = tweet.id;

    try {
      const response = await this.tweetService.toggleLike(this.like) as ResultModel;

      if (response.isSuccess) {
        // this.tweets = await this.getTweets();
        tweet.isLiked = !tweet.isLiked;
        tweet.likes = tweet.isLiked ? ++tweet.likes: --tweet.likes;
      }
    }
    catch (e) {
      console.error(e);
    }
  }
}
