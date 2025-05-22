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
                <el-input v-model="tags" :rows="2" type="textarea"
                    placeholder="Please enter tags through space" />
            </div>
            <div class="post-editor__body">
                <span>Post Body</span>
                <el-input v-model="body" :rows="6" type="textarea"
                    placeholder="Please enter body" />
            </div>
            <div class="post-editor__nav">
                <el-button @click="postsStore.fetchPosts" plain>Back to Main</el-button>
                <el-button @click="postsStore.addNewPost(title, tags, body)" plain>Add Post</el-button>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { usePostsStore } from '../stores/postsStore';

const postsStore = usePostsStore();

const title = ref('');
const tags = ref('');
const body = ref('');
</script>

<style lang="scss" scoped>
@use '../styles/mixins.scss' as m;
@use '../styles/variables.scss' as v;

:deep(.el-textarea__inner) {
    width: 100%;
    resize: none;
}

.post-editor {
    & h1 {
        margin-bottom: 20px;
    }

    & .post-editor__editor {
        @include m.base-flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 20px;
        width: 360px;

        & .post-editor__title {
            @include m.base-flex;
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
            width: 100%;
        }

        & .post-editor__tags {
            @include m.base-flex;
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
            width: 100%;
        }

        & .post-editor__body {
            @include m.base-flex;
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
            width: 100%;
        }
    }
}
</style>