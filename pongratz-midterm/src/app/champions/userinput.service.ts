import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { UserInput } from "./userinput.model";
import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl + "/userinput/";

@Injectable({ providedIn: "root" })
export class UserInputService {
  constructor(private http: HttpClient, private router: Router) {}

  getUserinput(champName: string) {
    const queryParams = `?champName=${champName}`;
    return this.http
      .get<{ message: string; inputs: any }>
      (
        BACKEND_URL + "/comments" + queryParams
      )
      .pipe(
        tap(response => console.log(response))
      );
  }

  deleteInput(userInput: UserInput) {
    this.http.post(BACKEND_URL + "/delete", userInput)
      .subscribe(response => {
        console.log(response);
      });
  }

  postInput(rating: number, comment: string, championName: string) {
    const userInput: UserInput = { rating: rating, comment: comment, championName: championName, username: "" };

    this.http.post(BACKEND_URL + "/create", userInput)
      .subscribe(response => {
        console.log(response);
      });
  }
}
