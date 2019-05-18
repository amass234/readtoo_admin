import { action, observable } from 'mobx'

class CommonStore {
    @observable appName = 'Readtoo'
}

export default new CommonStore()