import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  loadUserInfo() {
    // Call aboutMe to update "about me" information
    this.spotifyService.aboutMe().then((data) => {
      this.name = data.name;
      this.profile_pic = data.imageURL;
      this.profile_link = data.spotifyProfile;
    });
  }
}
