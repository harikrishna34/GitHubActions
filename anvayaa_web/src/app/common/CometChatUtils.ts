import { CometChatUIKit } from '@cometchat/chat-uikit-angular';

export const checkCometChatUserLogIn = (): boolean => {
  //Login user
  CometChatUIKit.getLoggedinUser()?.then(
    (user: CometChat.User) => {
      return user.getUid ?? false;
    },
    (error) => {
      console.log('checkUserLogIn failed', { error });
      return false;
    }
  );
  return false;
};

export const checkCometChatUserLogout = (): boolean => {
  CometChatUIKit.logout().then(
    (user) => {
      console.log('Logout successfull:');
      return true;
    },
    (error) => {
      console.log('Logout failed', { error });
      return false;
    }
  );
  return false;
};

//   export const logout = () => {
//     CometChatUIKit.logout().then(
//       (user) => {
//         console.log('Logout successfull:');
//         this.router.navigate(['/login']);
//       },
//       (error) => {
//         console.log('Logout failed', { error });
//       }
//     );
//   };
