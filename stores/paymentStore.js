import { action, observable } from 'mobx'
import Firebase from '../config/Firebase';

class PaymentStore {

    @observable paymentList = []
    @observable loading_admin = false
    @observable word = ''

    @action getPayment() {
        this.loading_admin = true
        let list = []
        const depositdb = Firebase.firestore().collection('deposit').orderBy('created_at', 'desc')
        depositdb.onSnapshot(snap => {
            snap.forEach(doc => {
                list.push({
                    id: doc.id,
                    ...doc.data()
                })
                this.paymentList = [...new Map(list.map(o => [o.id, o])).values()]
                this.loading_admin = false
            })
        })
    }

    
    @action searchingFor() {
        return x => {
            return x.title.toLowerCase().includes(this.word.toLowerCase()) || !this.word;
        }
    }

    @action searchingForId() {
        return x => {
            return x.id.toLowerCase().includes(this.word.toLowerCase()) || !this.word;
        }
    }

    @action searching(word) {
        this.word = word
    }

}

export default new PaymentStore()