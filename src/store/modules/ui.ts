import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import router from '../../router'
import { MessageInterface, ConfirmModalInterface} from './interfaces';

@Module
export default class UiModule extends VuexModule {
    messages: MessageInterface[] = [];
    showConfirm = false;
    addCityModalOpened = false;
    confirmModal: ConfirmModalInterface = {
        title: '',
        content: '',
        redirectTo: '',
        redirectLink: ''
    }

    @Action
    addMessage(message: MessageInterface) {
        const idDate = new Date();
        const idNumber = idDate.valueOf();

        const newMessage = {
            id: idNumber,
            title: message.title,
            content: message.content,
            type: message.type
        }

        this.messages.unshift(newMessage);

        setTimeout(() => {
           const index = this.messages.findIndex( item => item.id === newMessage.id);
           this.messages.splice(index, 1); 
        }, 2500);
    }

    @Action
    async displayConfirmModal(modalInfos: ConfirmModalInterface) {
        this.context.commit('showConfirmModal');
        
        this.confirmModal.title = modalInfos.title;
        this.confirmModal.content = modalInfos.content;
        this.confirmModal.redirectTo = modalInfos.redirectTo;
        this.confirmModal.redirectLink = modalInfos.redirectLink;

        await this.context.dispatch('redirectTo');

        router.push(modalInfos.redirectLink);
        
        this.context.commit('hideConfirmModal');
    }

    @Action
    redirectTo() {
        return new Promise( resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2500);    
        })
    }

    @Mutation
    showConfirmModal() { this.showConfirm = true; }

    @Mutation
    hideConfirmModal() { this.showConfirm = false; }

    @Mutation
    addCityModalToggle() { this.addCityModalOpened = !this.addCityModalOpened; }
}