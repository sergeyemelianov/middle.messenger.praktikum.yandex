import './chatboard-page.scss';
import Block, { Props } from '../../core/Block';
import Button from '../../components/button/button-component';
import ChatboardTemplate from './chatboard-page.hbs?raw';
import Input from '../../components/input/input-component';
import { Chat, ChatList, ChatListItem } from '../../components';
import { messages } from '../../data-chat/messages';
import { firstUtil } from '../../shared/utils/first.util';
import { lastUtil } from '../../shared/utils/last.util';
import { navigate, pagesList } from '../../index';
import { Form } from '../../components/form/form-component';

type ChatboardProps = Props & {};

export class Chatboard extends Block {
  constructor(props: ChatboardProps) {
    super({
      ...props,
      buttonProfile: new Button({
        view: 'secondary',
        label: 'Profile',
        page: 'profile',
        iconName: 'arrow-right',
        iconSize: 'small',
        events: {
          click: () => {
            navigate(pagesList.profileDetails);
          },
        },
      }),
      searchbar: new Input({
        type: 'search',
        selector: 'search',
        placeholder: 'Search',
      }),
      chatList: new ChatList({
        messages: messages.map(
          (el) =>
            new ChatListItem({
              id: el.chatId,
              conversation: lastUtil(el.conversation) ?? {},
              unreadMessages: el.conversation.filter(
                (elem: Record<string, any>) => !elem.message.isRead,
              ).length,
            }),
        ),
      }),
    });
  }

  render(): string {
    return ChatboardTemplate;
  }
}

export const ChatboardPage = new Chatboard({
  chat: new Form({ form: new Chat({ message: firstUtil(messages) ?? {} }) }),
});
