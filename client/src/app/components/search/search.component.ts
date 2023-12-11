import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string = '';
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  isEmpty:boolean;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    // Detect empty searchString
    this.isEmpty = this.searchString.trim().length === 0 ? true : false;
    this.resources = [];
    
    // Call search function and parse reponse
    if (this.isEmpty === false) {
      this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
        this.resources = data;
      });
    }
    
    
  }
}
