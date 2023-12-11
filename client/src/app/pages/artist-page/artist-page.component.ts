import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');

    // Call getArtist() to parse artist
    this.spotifyService.getArtist(this.artistId).then((data) => {
      this.artist = data;
    })

    // Call getRelatedArtist() to parse related artist
    this.spotifyService.getRelatedArtists(this.artistId).then((data) => {
      this.relatedArtists = data;
    })

    // Call getTopTracksForArtist() to parse top tracks
    this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
      this.topTracks = data;
    })

    // Call getAlbumsForArtist() to parse albums
    this.spotifyService.getAlbumsForArtist(this.artistId).then((data) => {
      this.albums = data;
    })
  }

}