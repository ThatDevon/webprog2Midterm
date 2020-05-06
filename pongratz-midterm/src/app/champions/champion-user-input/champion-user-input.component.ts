import { Component, OnInit } from '@angular/core';
import { Champion } from '../champion.model';
import { ChampionsService } from '../champions.service';
import { ActivatedRoute } from '@angular/router';
import { UserInput } from '../userinput.model';
import { UserInputService } from '../userinput.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-champion-user-input',
  templateUrl: './champion-user-input.component.html',
  styleUrls: ['./champion-user-input.component.css']
})
export class ChampionUserInputComponent implements OnInit {
  champion: Champion;
  champions: Champion[];
  uInputs: UserInput[] = [];
  uInput: UserInput;
  postingComment: boolean;
  myForm: FormGroup;
  currentUser: User;
  userIsAuthed: boolean;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private championService: ChampionsService,
    private userinputService: UserInputService,
    private fb:FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.onCancel();
    this.getChampion();

    setTimeout(() => {
      this.getUserinputs();
      console.log(this.uInputs)
    }, 400);

    this.userIsAuthed = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    console.log(this.userId);
  }

  onCancel() {
    this.postingComment = false;
    this.myForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(10)
      ]]
    });
  }

  onDelete(input: UserInput) {
    this.userinputService.deleteInput(input);
    this.refreshComments();
  }

  refreshComments() {
    setTimeout(() => {
      this.getUserinputs();
    }, 400);
  }

  postComment(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    this.userinputService.postInput(form.value.rating, form.value.comment, this.champion.name);
    this.refreshComments();

    this.onCancel();
  }

  get comment() {
    return this.myForm.get('comment');
  }

  get rating() {
    return this.myForm.get('rating');
  }

  onPost() {
    this.postingComment = true;
  }

  getUserinputs() {
    let observableInputs = this.userinputService.getUserinput(this.champion.name);

    observableInputs.toPromise().then(result => {
      this.uInputs = result.inputs;
    }).catch(err => {
      console.log(err);
    });
  }

  getChampion() {
    const id = +this.route.snapshot.paramMap.get('id');
    let observableChampions = this.championService.getChampion(id.toString());

    observableChampions.toPromise().then(result => {
      this.champions = result.champions;
    }).catch(err => {
      console.log(err);
    });

    // Special mention: Took a few hours of frustration to come to reach this solution.
    // HTTPClient will do what it wants when its good and ready, so I have a timeout so the champions value is correct.
    // Shoutout to https://stackoverflow.com/questions/54092337/angular-httpclient-get-service-returning-too-early for helping with search functionality.
    setTimeout(() => {
      this.champion = this.champions[0];
      if (this.champion == null) {
        setTimeout(() => {
          this.champion = this.champions[0];
        }, 1000);
      }
    }, 400);

    if (this.champion == null) {
      console.log("No champion found");
    }
  }
}
