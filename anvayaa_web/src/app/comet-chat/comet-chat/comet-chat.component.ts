import { Component } from '@angular/core';
import * as CometChat from '@cometchat/chat-sdk-javascript';
import {
  AvatarStyle,
  BadgeStyle,
  BaseStyle,
  ConfirmDialogStyle,
  ConversationsStyle,
  DateStyle,
  ListItemStyle,
  ReceiptStyle,
} from '@cometchat/chat-uikit-angular';

@Component({
  selector: 'app-comet-chat',
  templateUrl: './comet-chat.component.html',
  styleUrls: ['./comet-chat.component.css'],
})
export class CometChatComponent {
  constructor() {}
  ngOnInit() {
    let confirmDialogStyle: ConfirmDialogStyle = new ConfirmDialogStyle({
      confirmButtonBackground: '',
      cancelButtonBackground: '',
      confirmButtonTextColor: '',
      confirmButtonTextFont: '',
      cancelButtonTextColor: '',
      cancelButtonTextFont: '',
      titleFont: '',
      titleColor: '',
      messageTextFont: '',
      messageTextColor: '',
    });
    let backdropStyle: BaseStyle = new BaseStyle({
      height: '',
      width: '',
      background: '',
    });
    let badgeStyle: BadgeStyle = new BadgeStyle({
      width: '',
      height: '',
      background: '',
      textColor: '',
      textFont: '',
      borderRadius: '',
    });
    let dateStyle: DateStyle = new DateStyle({
      textFont: '',
      textColor: '',
    });
    let conversationsStyle: ConversationsStyle = new ConversationsStyle({
      width: '',
      height: '',
      border: '',
      borderRadius: '',
      titleTextFont: '',
      titleTextColor: '',
    });
    let listItemStyle: ListItemStyle = new ListItemStyle({
      activeBackground: '',
      borderRadius: '',
      titleFont: '',
      titleColor: '',
      border: '',
    });
    let avatarStyle: AvatarStyle = new AvatarStyle({
      nameTextColor: '',
      nameTextFont: '',
    });
    let receiptStyle: ReceiptStyle = new ReceiptStyle({
      waitIconTint: '',
      sentIconTint: '',
    });

    //creating request builder
    // conversationsRequestBuilder:CometChat.ConversationsRequestBuilder = new CometChat.ConversationsRequestBuilder()
    // .withTags(false)
    // .setLimit(30)
    // .build();
    //   }
    //passing the style properties to component
  }
}
