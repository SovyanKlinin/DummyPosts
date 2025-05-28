import axios from "axios";

const apiUrl = import.meta.env.VITE_DUMMY_POSTS_API_URL;

export default {

    fetch(limit: number, skip: number) {
        return axios.get(`${apiUrl}/posts?limit=${limit}&skip=${skip}`);
    },

    add(title: string, tags: string, body: string) {

        const tagsArr = tags.split(/\s+/);

        return axios(`${apiUrl}/posts/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                title,
                tagsArr,
                body,
            })
        });
    },

    update(id: number, title: string, body: string, tags: string) {

        const tagsArr = tags.split(/\s+/);

        axios(`${apiUrl}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                title,
                body,
                tagsArr
            })
        })

    },

    idSearch(id: number) {
        return axios(`${apiUrl}/posts/${id}`);
    },

    tagSearch(tag: string) {
        return axios(`${apiUrl}/posts/tag/${tag}`);
    },

    textSearch(text: string) {
        return axios(`${apiUrl}/posts/search?q=${text}`);
    },

    delete(id: number) {
        return axios.delete(`${apiUrl}/posts/${id}`);
    }

}