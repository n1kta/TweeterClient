import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweets: Tweet[];

  @Input() userProfileId: number;

  constructor(private tweetService: TweetService) { }

  async ngOnInit() {
    this.tweets = await this.tweetService.getTweetsFollowers(this.userProfileId) as Tweet[];
  }

}
