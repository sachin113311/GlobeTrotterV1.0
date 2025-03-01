import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { CityTriviaService } from './city-trivia.service';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'globetrotter-frontend';
  city: any;
  selectedOption: string = "";
  score = 0;
  showResult = false;
  correct = false;
  answerRes: any;
  correctCity: any;
  username= "";
  usernameInput: string = "";
  invitedBy: string="";
  inviterScore: any;
  showInvite = false;
  showSadFace: boolean = false;

  constructor(private cityService: CityTriviaService, @Inject(PLATFORM_ID) private platformId: any) {}

  async ngOnInit() {

    this.username = "";
    if (isPlatformBrowser(this.platformId)) { 
    const urlParams = new URLSearchParams(window.location.search);
    const inviterUsername = urlParams.get("invitedBy");
  
    if (inviterUsername) {
      this.invitedBy = inviterUsername;
      const inviterData = await this.cityService.getUser(inviterUsername);
  
      if (inviterData) {
        this.inviterScore = inviterData.responseData.score; 
      }
    } 
  }
}
  
  async registerUser() {
    if (this.usernameInput.trim() !== "") {
      let checkUser = await this.cityService.getUser(this.usernameInput);
      if (checkUser.isSuccessful === true) {
        this.username = this.usernameInput;
        this.score = checkUser.responseData.score;
        this.loadNewCity();
        return;
      }else{
        this.username = this.usernameInput;
        this.score = 0;
        await this.cityService.registerUser(this.username);
        this.loadNewCity();
      }
    }
  }
  

  async loadNewCity() {
    this.city = await this.cityService.getRandomCity();
    this.selectedOption = "";
    this.correct = false;
    this.showResult = false;
    this.showSadFace = false;
  }

  async checkAnswer() {
    if (!this.selectedOption) return;
    this.answerRes= await this.cityService.sendAnswer({id: this.city.id, selectedAnswer: this.selectedOption});

    if(this.answerRes.data.correct){
      this.correctCity =this.answerRes.data.cityData;
      this.correct = true;
      this.showResult = true;
      this.selectedOption = "";
      this.triggerConfetti();
    } else {
      this.showSadFace = true; 
      setTimeout(() => {
        this.showSadFace = false; 
      }, 2000);
      this.showResult = true;
      this.correct = false;
    }
    if (this.correct) {
      this.score++;
      await this.cityService.updateUserScore(this.username, this.score);
      this.showInvite = this.score >= 1;
  }
  }
  challengeFriend() {
    if (!this.username) return;
    const inviteLink = `${window.location.origin}?invitedBy=${this.username}&inviterScore=${this.score}`;
    const whatsappMessage = `🌍 Join me in the Globetrotter Challenge! Try to beat my score of ${this.score}!\nPlay here: ${inviteLink}`;
    
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  
  }
  triggerConfetti() {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    });
  }
}
