import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { asyncScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  // Return Promise from express given endpoint
  private sendRequestToExpress(endpoint:string):Promise<any> {
    const spotifyPromise = async (endpoint) => {
      const response = await fetch(`${this.expressBaseUrl}${endpoint}`);
      const result = await response.json();
      return result;
    }
    return spotifyPromise(endpoint);
  }

  // Return ProfileData from profile express endpoint
  aboutMe():Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then((data) => {
    	return new ProfileData(data);
    });
  }

  // Return array of ResourceData search category express endpoint
  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    return this.sendRequestToExpress(`/search/${category}/${encodeURIComponent(resource)}`).then((data) => {
      let resourceArray = 
        category === 'artist'
        ? data.artists.items.map((artist) => new ArtistData(artist))
        : category === 'track'
        ? data.tracks.items.map((track) => new TrackData(track))
        : data.albums.items.map((album) => new AlbumData(album))
      return resourceArray;
    });
  }

  // Return ArtistData from artist express endpoint
  getArtist(artistId:string):Promise<ArtistData> {
    return this.sendRequestToExpress(`/artist/${encodeURIComponent(artistId)}`).then((data) => {
      return new ArtistData(data);
    });
  }

  // Return array of ArtistData from related artist express endpoint
  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    return this.sendRequestToExpress(`/artist-related-artists/${encodeURIComponent(artistId)}`).then((data) => {
      return data.artists.map((artist) => {
        return new ArtistData(artist);
      })
    });
  }

  // Return array of TrackData from top tracks express endpoint
  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-top-tracks/${encodeURIComponent(artistId)}`).then((data) => {
      return data.tracks.map((track) => {
        return new TrackData(track);
      })
    });
  }

  // Return list of AlbumData from artist express endpoint
  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    return this.sendRequestToExpress(`/artist-albums/${encodeURIComponent(artistId)}`).then((data) => {
      return data.items.map((album) => {
        return new AlbumData(album);
      })
    });
  }

  // Return AlbumData from album express endpoint
  getAlbum(albumId:string):Promise<AlbumData> {
    return this.sendRequestToExpress(`/album/${albumId}`).then((data) => {
      return new AlbumData(data);
    });
  }

  // Return list of TrackData from album tracks express endpoint
  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress(`/album-tracks/${albumId}`).then((data) => {
      return data.items.map((track) => {
        return new TrackData(track);
      });
    });
  }

  // Get TrackData from track express endpoint
  getTrack(trackId:string):Promise<TrackData> {
    return this.sendRequestToExpress(`/track/${encodeURIComponent(trackId)}`).then((data) => {
      return new TrackData(data);
    });
  }

  // Get list of TrackFeature from track-audio-features express endpoint by looping
  // through static FeatureTypes array
  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    return this.sendRequestToExpress(`/track-audio-features/${trackId}`).then((data) => {
      return TrackFeature.FeatureTypes.map((feature) => {
        return new TrackFeature(feature, data[feature])
      })
    })
  }
}
