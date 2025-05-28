<template>
    <header class="header">
        <div @click="postsStore.fetchPosts" class="header__logo">
            <h2>DummyPosts</h2>
        </div> 
        <div class="header__nav">
            <el-button @click="postsStore.createEditPost(0)" plain>Add post</el-button>
            <el-button style="margin-left: 20px;" @click="postsStore.searchByText(searchInput)" plain>Search</el-button>
            <el-input v-model="searchInput"
            style="width: 240px; color: black" placeholder="Search on posts" :prefix-icon="Search" />
        </div>
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { usePostsStore } from '../stores/postsStore';

const postsStore = usePostsStore();
const searchInput = ref('');

</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as v;
@use '../styles/mixins.scss' as m;

.header {
    @include m.base-flex;
    justify-content: space-between;
    width: 100%;
    padding: 15px;

    &__logo {
        cursor: pointer;
        transition: 0.5s;

        &:hover {
            color: v.$main-blue-hover;
        }
    }

    &__nav {
        @include m.base-flex;
        gap: 8px;
    }
}

@media screen and (max-width: 768px) {
    .header {
        flex-direction: column;

        &__logo {
            margin-bottom: 10px;
        }

        &__nav {
            flex-wrap: wrap;
        }
    }
}
</style>