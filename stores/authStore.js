import { action, observable } from 'mobx'
import Firebase from '../config/Firebase';
import { message } from 'antd';
import Router from 'next/router'

class AuthStore {
    
    @observable username = ''
    @observable password = ''
    @observable loading = false
    @observable displayName = ''
    @observable email = ''
    @observable user = null

    @action setUsername(username) {
        this.username = username
    }

    @action setPassword(password) {
        this.password = password
    }

    @action async getUser() {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user
                this.displayName = user.displayName
                this.email = user.email
            }
        })
    }

    @action async logOut() {
        await Firebase.auth().signOut()
            .then(async () => {
                await window.location.reload()
                await message.success('Log out')
            })
            .catch((err) => message.success(err.message))
    }

    @action login() {
        this.loading = true
        return Firebase.auth()
            .signInWithEmailAndPassword(this.username, this.password)
            .then(async () => {
                await this.getUser()
                await Router.replace('/?id=users')
                await message.success('Login')
            })
            .catch((err) => message.error(err.message))
            .finally(action(() => { this.loading = false; }))
    }

}

export default new AuthStore()