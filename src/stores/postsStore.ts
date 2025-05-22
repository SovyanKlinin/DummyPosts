import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

interface Posts {
    id: number,
    userid: number,
    title: string,
    body: string,
    tags: [],
    views: number,
    reactions: {
        dislikes: number,
        likes: number
    }
}

export const usePostsStore = defineStore('posts', {

    state: () => ({

        posts: [] as Posts[],
        totalIn: 0,
        totalNow: 0,
        skip: 1,
        limit: 10,
        currentPage: 1,
    }),

    actions: {

        async fetchPosts() {
            this.skip = (this.currentPage - 1) * this.limit;

            const res = await axios(`https://dummyjson.com/posts?limit=10&skip=${this.skip}`);
            const data = await res.data.posts;
            this.totalIn = await res.data.total;
            this.totalNow = await res.data.total;
            this.posts = data;

            router.push({
                name: 'Main'
            });
        },

        async searchByTags(tag: string) {
            const res = await axios(`https://dummyjson.com/posts/tag/${tag}`);
            const data = await res.data.posts;
            this.totalNow = await res.data.total;
            this.posts = data;

            router.push({
                query: {
                    tag: tag,
                }
            })
        },

        async searchByText(text: string) {
            const res = await axios(`https://dummyjson.com/posts/search?q=${text}`);
            const data = await res.data.posts;
            this.totalNow = await res.data.total;
            this.posts = data;

            router.push({
                query: {
                    search: text,
                }
            })
        },

        async deletePost(id: number) {
            fetch(`https://dummyjson.com/posts/${id}`, {
                method: 'DELETE',
            })
            this.fetchPosts();
        },

        async createEditPost(id: number) {

            if (id) {
                router.push({
                    name: 'EditPost',
                    query: {
                        id: id
                    }
                });

                const res = await axios(`https://dummyjson.com/posts/${id}`)
                const data = await res.data.posts;
                this.totalNow = await res.data.total;
                this.posts = data;

            } else if (!id) {
                router.push({
                    name: 'CreatePost'
                });
            }
        },

        async addNewPost(title: string, tags: string, body: string) {

            const userId = 99;
            const id = this.totalIn + 1;
            const likes = 0;
            const dislikes = 0;
            const views = 0;
            const tagsArr = tags.split(/\s+/);

            fetch('https://dummyjson.com/posts/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    id: id,
                    likes: likes,
                    dislikes: dislikes,
                    views: views,
                    tags: tagsArr,
                    body: body,
                })
            })
                .then(res => res.json())
                .then(console.log);
        }
    }
})