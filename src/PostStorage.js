import { web3 } from "./Web3"

class PostStorage {
    posts = [];
    subscribers = new Set();
    latestId = -1;

    async getPost(id) {
        //Contract Getter
        let post = await web3.shortsns.methods.posts(id).call();

        this.posts.push({
            //All date copy
            ...post,
            //Add id
            id: id
        })
    }

    constructor() {
        //http starting
        web3.http.eth.net.isListening().then(() => {
            (async () => {
                let id = await web3.shortsns.methods.getNumPosts();
                for(let i = id - 1; i >= 0 && i >= id -21; --i){
                    let post = await web3.shortsns.methods.posts(i);
                    this.posts.push({
                        ...post,
                        id: i
                    })
                }
                this.publish();
            })();
        });

        //wss starting
        web3.ws.eth.net.isListening().then(() => {
            web3.shortsns.events.AlertPost({ fromBlock: "latest"}, (err, result) => {
                if(err){
                    console.error(err);
                    return; 
                } 

                let id = parseInt(result.returnValues.id);
                let existing = this.posts.find((post) => {
                    return post.id === id;
                });

                if(existing) {
                    return;
                }

                (async () => {
                    await this.getPost(id);
                    this.publish();
                })();
            })
        });
    }

    subscribe(component, defer = false) {
        this.subscribers.add(component);
        if(!defer) {
            this.publish();
        }
    }

    unsubscribe(component) {
        this.subscribers.delete(component);
    }

    //Update
    publish() {
        for(let component of this.subscribers){
            component.setState( {posts: this.posts} );
        }
    }
}

let postStorage = new PostStorage();

export default postStorage;
