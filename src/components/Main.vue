<template>

    <div class="posts">
        <h1>Posts</h1>
        <div v-for="post in postsStore.posts" key="post.id" class="posts__post">
            <h3 class="posts__post-title">{{ post.title }}</h3>
            <div class="posts__post-tags">
                <div v-for="tags in post.tags" @click="postsStore.searchByTags(tags)" class="posts__post-tag">{{ tags }}
                </div>
            </div>
            <div class="posts__post-body">{{ post.body }}</div>
            <div class="posts__post-nav">
                <el-button @click="createEditPost(post.id)" plain>Edit Post</el-button>
                <el-button @click="deletePost(post.id)" plain>Delete</el-button>
            </div>
            <div class="posts__post-reaction">
                <div class="posts__post-likes">
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" size="xl" class="posts__post-icon" />
                    {{ post.reactions.likes }}
                </div>
                <div class="posts__post-dislikes">
                    <font-awesome-icon :icon="['fas', 'thumbs-down']" size="xl" class="posts__post-icon" />
                    {{ post.reactions.dislikes }}
                </div>
                <div class="posts__post-views">
                    <font-awesome-icon :icon="['fas', 'eye']" size="xl" style="color: #B197FC;" />
                    {{ post.views }}
                </div>
            </div>
        </div>
        <div class="posts__post-pagination">
            <el-pagination background layout="prev, pager, next" @current-change="postsStore.fetchPosts"
                v-model:current-page="postsStore.currentPage" :pager-count="4" :total="postsStore.totalNow" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePostsStore } from '../stores/postsStore';
import router from "../router";

const postsStore = usePostsStore();

onMounted(() => {
    postsStore.fetchPosts();
})

const deletePost = (id: number) => {
    postsStore.deletePost(id);
}

const createEditPost = (id: number) => {

    router.push({
        name: 'PostCreateEdit',
        query: {
            id
        }
    });

    postsStore.createEditPost()
}

</script>

<style lang="scss" scoped>
@use '../styles/mixins.scss' as m;
@use '../styles/variables.scss' as v;

.posts {
    padding: 20px;

    h1 {
        margin-bottom: 30px;
    }

    &__post {
        @include m.base-flex;
        align-items: flex-start;
        flex-direction: column;
        border: 1px solid white;
        border-radius: 10px;
        margin-bottom: 20px;
        padding: 20px;

        &-title {
            margin-bottom: 20px;
        }

        &-tags {
            @include m.base-flex;
            gap: 7px;
            margin-bottom: 7px;

            .posts__post-tag {
                cursor: pointer;
                color: v.$main-blue;
                text-decoration: underline;
                transition: 0.5s;

                &:hover {
                    color: v.$main-blue-hover;
                }
            }
        }

        &-body {
            margin-bottom: 20px;
        }

        &-nav {
            @include m.base-flex;
            margin-bottom: 10px;
        }

        &-reaction {
            @include m.base-flex;
            gap: 15px;

            .posts__post-likes {
                @include m.base-flex;
                gap: 10px;
            }

            .posts__post-dislikes {
                @include m.base-flex;
                gap: 10px;
            }


            .posts__post-views {
                @include m.base-flex;
                gap: 10px;
            }


            .posts__post-icon {
                cursor: pointer;
                color: v.$main-blue;
                transition: 0.5s;

                &:hover {
                    color: v.$main-blue-hover;
                }
            }
        }
    }

    &-pagination {
        @include m.base-flex;
        width: 100%;
    }
}
</style>