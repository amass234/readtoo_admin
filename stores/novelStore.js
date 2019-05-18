import { action, observable } from 'mobx'
import Firebase from '../config/Firebase';
import Swal from 'sweetalert2'

class NovelStore {

    @observable novelList = []
    @observable loading = false
    @observable word = ''

    @action getNovelAll() {
        let list = []
        this.loading = true
        const noveldb = Firebase.firestore().collection('novels')
        noveldb.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                list.push({
                    id: doc.id,
                    ...doc.data()
                })
                this.loading = false
                this.novelList = [...new Map(list.map(o => [o.id, o])).values()]
            })
        })
    }

    @action deleteNovel(id) {
        const novelList = Firebase.firestore().collection('novels');
        const pageCounts = Firebase.firestore().collection('pageCounts');
        const commentdb = Firebase.firestore().collection('comments');
        const reviewdb = Firebase.firestore().collection('reviews');
        MySwal.fire({
            title: 'Are you sure?',
            html: <div style={{ textAlign: 'center' }}>
                <p>{`Delete ${title}`}</p>
                <p>You won't be able to reverse this!</p>
            </div>,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.value) {
                await pageCounts.doc(id).delete()
                await novelList.doc(id).delete()
                await commentdb.where('idNovel', '==', id)
                    .get().then(snap => {
                        snap.forEach(doc => {
                            commentdb.doc(doc.id).delete()
                        })
                    })
                await reviewdb.where('novel_id', '==', id)
                    .get().then(snap => {
                        snap.forEach(doc => {
                            reviewdb.doc(doc.id).delete()
                        })
                    }).then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }).catch((err) => {
                        Swal.fire(
                            'Warning',
                            `${err.message}`,
                            'warning'
                        )
                    })
            }
        })

    }

    @action searchingForId() {
        return x => {
            return x.id.toLowerCase().includes(this.word.toLowerCase()) || !this.word;
        }
    }


    @action searchingFor() {
        return x => {
            return x.title.toLowerCase().includes(this.word.toLowerCase()) || !this.word;
        }
    }

    @action searching(word) {
        this.word = word
    }

}

export default new NovelStore()