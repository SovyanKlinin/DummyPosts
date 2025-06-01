import { defineStore } from "pinia";
import router from "../router";
import api from "../services/api";
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router';

const route = useRoute();

interface Posts {
    id: number,
    userid: number,
    title: string,
    body: string,
    tags: string[],
    views: number,
    reactions: {
        dislikes: number,
        likes: number
    }
}

interface Post {
    id: number,
    title: string,
    body: string,
    tags: string[],
}

export const usePostsStore = defineStore('posts', {

    state: () => ({

        posts: [] as Posts[],
        post: {} as Post,
        totalIn: 0,
        totalNow: 0,
        skip: 1,
        limit: 10,
        currentPage: 1,
    }),

    actions: {

        async fetchPosts() {
            this.skip = (this.currentPage - 1) * this.limit;

            const res = await api.fetch(this.limit, this.skip);
            const data = res.data.posts;
            this.totalIn = res.data.total;
            this.totalNow = res.data.total;
            this.posts = data;

            router.push({
                name: 'Main'
            });
        },

        async searchByTags(tag: string) {
            const res = await api.tagSearch(tag);
            const data = res.data.posts;
            this.totalNow = res.data.total;
            this.posts = data;

            router.push({
                query: {
                    tag,
                }
            })
        },

        async searchByText(text: string) {

            if (text) {
                const res = await api.textSearch(text);
                const data = res.data.posts;
                this.totalNow = res.data.total;
                this.posts = data;

                router.push({
                    query: {
                        search: text,
                    }
                })
            }
        },

        async deletePost(id: number) {

            try {

                api.delete(id)
                this.fetchPosts();

                ElNotification({
                    title: 'Delete Post',
                    message: 'This post successfully deleted',
                    type: 'success',
                });

            } catch {

                ElNotification({
                    title: 'Error',
                    message: "Error deleting post",
                    type: 'error',
                });

            }

        },

        async createEditPost() {

            console.log(route)
            const id = Number(route.params.id);

            if (id) {

                const res = await api.idSearch(id);
                const data = res.data;
                this.post = data;

            } else {

                this.post = {
                    id: 0,
                    title: '',
                    body: '',
                    tags: []
                };

                router.push({
                    name: 'CreatePost'
                });
            }
        },

        async addNewPost(title: string, tags: string, body: string) {

            try {

                api.add(title, tags, body);

                ElNotification({
                    title: 'Create Post',
                    message: 'Post created successfully',
                    type: 'success',
                });

            } catch {

                ElNotification({
                    title: 'Error',
                    message: "Error creating post",
                    type: 'error',
                });
            }
        },

        async updatePost(id: number, title: string, body: string, tags: string) {

            try {

                api.update(id, title, tags, body);

                ElNotification({
                    title: 'Update Post',
                    message: 'This post successfully updating',
                    type: 'success',
                });

            } catch {

                ElNotification({
                    title: 'Error',
                    message: "Error updating post",
                    type: 'error',
                });

            }
        }
    }
})