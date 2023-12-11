import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;
  localUrl:string;
  imgUrl:string;
  name:string;


  constructor() { }

  ngOnInit() {
    // Update localUrl, imgUrl, name of resource
    this.localUrl = 
      this.resource.category === "artist" 
      ? `artist/${this.resource.id}` 
      : `album/${this.resource.id}`;
    this.imgUrl = this.resource.imageURL;
    this.name = this.resource.name;
  }

}
