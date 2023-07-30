import { Component, AfterContentInit } from '@angular/core';
import { Howl } from 'howler';
import KickerData from './KickerData';
import KickeeData from './KickeeData';
import NamedUrl from './NamedUrl';
import NamedUrls from './NamedUrls';
import Coordinate2D from './Coordinate2D';
import Coordinate2DList from './Coordinate2DList';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-drop-kick',
  templateUrl: './drop-kick.component.html',
  styleUrls: ['./drop-kick.component.css']
})
export class DropKickComponent implements AfterContentInit {
  public kickers: NamedUrls = [];
  public selectedKicker: null | NamedUrl = null;
  selectedKickerData: null | KickerData = null;
  kickerImage: HTMLImageElement | null = null;

  public kickees: NamedUrls = [];
  public selectedKickee: null | NamedUrl = null;
  selectedKickeeData: null | KickeeData = null;
  kickeeImage: HTMLImageElement | null = null;

  balls: Array<number> = [];
  canvas: HTMLCanvasElement | null = null;
  context : CanvasRenderingContext2D | null = null;
  kickingSound: Howl | null = null;
  lastDrawnTimeStamp: number = -1;

  $http: HttpClient;

  constructor(private http: HttpClient) {
    this.$http = http;
   }

   ngAfterContentInit() {

    this.kickerImage = document.createElement("img") as HTMLImageElement
    this.kickeeImage = document.createElement("img") as HTMLImageElement
    this.canvas = document.getElementById("movie") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.kickerImage.onload = this.drawKicker;
    
    this.$http.get<NamedUrls>('/assets/kickers.json').subscribe((data) => {
      this.kickers = data;
      this.selectedKicker = this.kickers[0];
      this.onChangeKicker({init:true});
    });

        
    this.$http.get<NamedUrls>('/assets/kickees.json').subscribe(( data ) => {
        this.kickees = data;
        this.selectedKickee = this.kickees[0];
        this.onChangeKickee({init:true});
      });
 
      window.requestAnimationFrame(this.onAnimationFrame.bind(this));
  };

  onChangeKicker ($event: object) {
    this.selectedKickerData = null;
    if(this.selectedKicker === null) return;
    this.$http.get<KickerData>(`/assets/${this.selectedKicker.url}`).subscribe((data) => {
        this.selectedKickerData = data;
        if(this.selectedKickerData === null) return;
        if(this.kickerImage === null) return;
        this.kickerImage.src = this.selectedKickerData.image.url;
    });
  };

  onChangeKickee ($event: Partial<{init: boolean}>) {
    this.selectedKickeeData = null;
    if(this.selectedKickee===null)return;
    this.$http.get<KickeeData>(`/assets/${this.selectedKickee.url}`).subscribe((data) => {
        this.selectedKickeeData = data;
        if(this.selectedKickeeData === null) return;
        if(this.kickeeImage === null) return;
        this.kickeeImage.src = this.selectedKickeeData.image.url;
        this.kickingSound = new Howl(this.selectedKickeeData.sound.file);
      });
  };

  onClickDropKick = ()=> {
      this.balls.push(0);
    }

inBetween = (num: number, o: {start: number, end: number}): boolean => {
  if(num < Math.min(o.start, o.end)) return false;
  if(num > Math.max(o.start, o.end)) return false;
  return true;
}
drawKicker = () => {
    if(this.selectedKicker === null) return;
    if(this.selectedKickerData === null) return;
    if(this.kickerImage === null) return;
    
    const { body, image: { width, height}} = this.selectedKickerData;
    const foot = body.kicker;
  
    this.drawClippedImage(this.kickerImage, 0, 0, width, height, body.outline);
  
    if(this.balls.filter((frame) => {
      if(this.selectedKickerData === null) return false;
      const kick = this.selectedKickerData.drop.kick;
      return this.inBetween(frame, kick);
      }).length === 0) {
      this.drawClippedImage(this.kickerImage, -1, -1, width, height, foot.outline);
    }
    else {
      if(this.context === null) return;
      const pivot = foot.pivot;
      this.context.translate(pivot.x, pivot.y)
      this.context.rotate(-pivot.rotate);
  
      this.drawClippedImage(this.kickerImage,
        pivot.width,
        pivot.height,
        width,
        height,
        foot.outline);
  
      this.context.rotate(pivot.rotate);
      this.context.translate(
        -pivot.x,
        -pivot.y);
    }

  }
  
  offset(pos: Coordinate2D, x: number, y: number): Coordinate2D {
    return {
      x: pos.x + x,
      y: pos.y + y
    };
  }
  
  drawClippedImage(image: HTMLImageElement, x: number, y:number, width:number, height:number, clipCoordinates: Coordinate2DList) {
    if(this.context === null) return;
    this.context.save();
    this.context.beginPath();
    for(let i = 0; i < clipCoordinates.length; i++) {
      const pos = this.offset(clipCoordinates[i], x, y);
      if(i == 0) this.context.moveTo(pos.x, pos.y);
      this.context.lineTo(pos.x, pos.y);
    }
    this.context.closePath();
    this.context.clip();
    this.context.drawImage(image, x, y, width, height);
    this.context.restore();
  }
    
  onAnimationFrame(timeStamp: number) {
    if(
      timeStamp - this.lastDrawnTimeStamp > 50 
      && this.context !== null 
      && this.canvas !== null
      && this.selectedKickerData !== null 
      && this.selectedKickeeData !== null
    ) {
      this.lastDrawnTimeStamp = timeStamp;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawKicker();
  
      if(this.kickingSound && this.balls.indexOf(this.selectedKickerData.drop.kick.start) != -1) {
        this.kickingSound.play();
      }
  
      for(let i = 0; i < this.balls.length; i++)
      {
        let frame = this.balls[i]++;
        this.drawKickee(frame);
        frame++;
        if(frame >= this.selectedKickerData.drop.path.length) {
          this.balls.splice(i--, 1);
        }
      }
    }
  
    window.requestAnimationFrame(this.onAnimationFrame.bind(this));
  }
  
  drawKickee(frame: number) {
    if(this.selectedKickerData == null) return;
    if(this.selectedKickeeData == null) return;
    if(this.kickeeImage == null) return;
    const {path} = this.selectedKickerData.drop;
    if(frame >= path.length) return;
    const pos = path[frame];
    const {outline, image: { height, width}} = this.selectedKickeeData;
    this.drawClippedImage(this.kickeeImage, pos.x, pos.y, width, height, outline);
  }
  
}
