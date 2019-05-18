import { action, observable } from 'mobx'
import Firebase from '../config/Firebase';
import { message } from 'antd';
import Swal from 'sweetalert2'

class UserStore {
    @observable userList = []
    @observable loading = false
    @observable word = ''

    @action getUserAll() {
        this.loading = true
        let list = []
        const userdb = Firebase.firestore().collection('users')
        userdb.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                list.push({
                    ...doc.data()
                })
                this.userList = [...new Map(list.map(o => [o.id, o])).values()]
                this.loading = false
            })
        })
    }

    @action deleteUser(id) {
        const userdb = Firebase.firestore().collection('users')
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                userdb.doc(id).delete()
                    .then(
                        Swal.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                        )
                    )
            }
        })
    }

    @action updateCredit(id, credit) {
        const userdb = Firebase.firestore().collection('users')
        userdb.doc(id).update({
            readtoo_credit: credit
        }).then(() => {
            message.success("update success")
        }).catch((err) => console.log(err.message))
    }

    @action searchingFor() {
        return x => {
            return x.username.toLowerCase().includes(this.word.toLowerCase()) || !this.word;
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

export default new UserStore()