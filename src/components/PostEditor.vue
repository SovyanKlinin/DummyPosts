<template>

    <div class="post-editor">
        <h1>Post Editor</h1>
        <div class="post-editor__editor">
            <div class="post-editor__title">
                <span>Post Title</span>
                <el-input v-model="title" style="width: 100%" placeholder="Please enter title" />
            </div>
            <div class="post-editor__tags">
                <span>Post Tags</span>
                <el-input v-model="tags" :rows="2" type="textarea" placeholder="Please enter tags through space" />
            </div>
            <div class="post-editor__body">
                <span>Post Body</span>
                <el-input v-model="body" :rows="6" type="textarea" placeholder="Please enter body" />
            </div>
            <div class="post-editor__nav">
                <el-button @click="postsStore.fetchPosts" plain>Back to Main</el-button>
                <el-button v-show="routeId" @click="updatePost(id, title, body, tags)" plain>Edit Post</el-button>
                <el-button v-show="!routeId" @click="addNewPost(title, tags, body)" plain>Add Post</el-button>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { usePostsStore } from '../stores/postsStore'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const postsStore = usePostsStore();

const title = ref('');
const tags = ref('');
const body = ref('');
const id = postsStore.post.id;
const routeId = Number(route.query.id);

onMounted(async () => {

    if (routeId) {

        await postsStore.createEditPost(routeId)
        const tagsString = postsStore.post.tags.join(" ")
        title.value = postsStore.post.title;
        body.value = postsStore.post.body;
        tags.value = tagsString;
    } else if (!routeId) {
        title.value = '';
        body.value = '';
        tags.value = '';
    }
})

const updatePost = (id: number, title: string, body: string, tags: string) => {
    postsStore.updatePost(id, title, body, tags);
}

const addNewPost = (title: string, body: string, tags: string) => {

    if (title !== '' && body !== '' && tags !== '') {
        postsStore.addNewPost(title, body, tags);
    } else {
        ElNotification({
            title: 'Error',
            message: "Fields don't filled",
            type: 'error',
        });
    }
}

</script>

<style lang="scss" scoped>
@use '../styles/mixins.scss' as m;
@use '../styles/variables.scss' as v;

:deep(.el-textarea__inner) {
    width: 100%;
    resize: none;
}

.post-editor {
    @include m.base-flex;
    flex-direction: column;
    width: 100%;

    h1 {
        margin-bottom: 20px;
    }

    &__editor {
        @include m.base-flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 20px;
        width: 360px;

        .post-editor__title {
            @include m.base-flex;
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
            width: 100%;
        }

        .post-editor__tags {
            @include m.base-flex;
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
            width: 100%;
        }

        .post-editor__body {
            @include m.base-flex;
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
            width: 100%;
        }
    }
}

@media screen and (max-width: 425px) {
    .post-editor {
        &__editor {
            width: 100%;
            padding: 0 20px;
        }
    }
}
</style>