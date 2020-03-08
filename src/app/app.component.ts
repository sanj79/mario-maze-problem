import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'maze-problem';

  public boardWidth: number;
  public boardHeight: number;
  public displayBoard: boolean = false;
  public boardArray: any = [];
  public stepsCount: number = 0;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.displayBoard) {
      this.navigateMario(event.keyCode);
    }
  }

  constructor() { }

  ngOnInit() {
  }

  // Generate board based on the given dimension
  public generateBoard() {
    if (!this.boardWidth || !this.boardHeight) {
      window.alert("Please input a valid number");
    } else {
      this.displayBoard = true;
      this.boardArray = [];
      const boardArray = [];
      for (let i = 0; i < this.boardWidth * this.boardHeight; i++) {
        boardArray.push('blank');
      }
      this.boardArray = boardArray;
      this.generateSprites();
      this.placeMarioOnBoard();
    }
  }

  // Place Mario approximately on the middle of the board
  public placeMarioOnBoard() {
    this.boardArray[Math.floor(this.boardArray.length / 2)] = 'mario';
  }

  // Place sprites randomly
  public generateSprites() {
    let sprites = [];
    while (sprites.length < this.boardHeight) {
      let sprite = Math.floor(Math.random() * this.boardArray.length);
      if (sprites.indexOf(sprite) === -1 && (sprite !== Math.floor(this.boardArray.length / 2))) {
        sprites.push(sprite);
      }
    }
    sprites.forEach((sprite) => {
      this.boardArray[sprite] = 'sprite';
    })
  }

  // Navigate Mario
  public navigateMario(key: number) {
    let marioIndex = 0;
    marioIndex = this.boardArray.indexOf("mario");
    if ((key === 37) && ((marioIndex - 1) >= 0)) {
      this.boardArray[marioIndex] = 'blank';
      this.boardArray[marioIndex-1] = 'mario';
      this.stepsCount = this.stepsCount + 1;
    } else if ((key === 38) && ((marioIndex - this.boardHeight) >= 0)) {
      this.boardArray[marioIndex] = 'blank';
      this.boardArray[marioIndex-this.boardHeight] = 'mario';
      this.stepsCount = this.stepsCount + 1;
    } else if ((key === 39) && ((marioIndex + 1) <= (this.boardArray.length-1))) {
      this.boardArray[marioIndex] = 'blank';
      this.boardArray[marioIndex + 1] = 'mario';
      this.stepsCount = this.stepsCount + 1;
    } else if ((key === 40) && ((marioIndex + this.boardHeight) <= this.boardArray.length-1)) {
      this.boardArray[marioIndex] = 'blank';
      this.boardArray[marioIndex + this.boardHeight] = 'mario';
      this.stepsCount = this.stepsCount + 1;
    }
    this.checkSpriteCount();
  }

  public checkSpriteCount() {
    const sprites = this.boardArray.filter(entry => entry === 'sprite');
    if (sprites.length === 0) {
      window.alert("Game over! You saved the princess in " + this.stepsCount + " moves");
      this.boardHeight = null;
      this.boardWidth = null;
      this.displayBoard = false;
    }
  }
}

