import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
const { SplashScreen, StatusBar } = Plugins;

import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
    SplashScreen.hide().catch((err) => {
      console.warn(err);
    });

    StatusBar.hide().catch((err) => {
      console.warn(err);
    });

  }

}
