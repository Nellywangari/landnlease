
import { ChatProvider } from './../../providers/chat/chat';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatroomPage } from './chat-room';



@NgModule({
  declarations: [
    ChatroomPage,
    
  ],
  imports: [
    IonicPageModule.forChild(ChatroomPage),
    PipesModule
  ],
})
export class ChatroomPageModule {}
