import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { CometChat } from "@cometchat-pro/chat";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { COMETCHAT_CONSTANTS } from './app/common/CONSTS';
if (environment.production) {
  enableProdMode();
}

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();
CometChatUIKit.init(uiKitSettings)?.then(
  () => {
    console.log('-------------Initialization completed successfully');
    // You can now call login function.
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  },
  (error) => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  }
);
