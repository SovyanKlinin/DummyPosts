<template>
    <footer class="footer">
        <div class="footer__content">
            <div @click="postsStore.fetchPosts" class="footer__logo">
                <h2>DummyPosts</h2>
            </div>
            <ul class="footer__social">
                <li>
                    <a href="https://www.facebook.com/" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']"
                            size="xl" /></a>
                </li>
                <li>
                    <a href="https://x.com/" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']"
                            size="xl" /></a>
                </li>
                <li>
                    <a href="https://bsky.app/" target="_blank"><font-awesome-icon :icon="['fab', 'bluesky']"
                            size="xl" /></a>
                </li>
            </ul>
        </div>
        <div class="footer__copyright"><font-awesome-icon :icon="['fas', 'copyright']" /> 2025. All Rights Reserved.
            DummyPosts.</div>
    </footer>
</template>

<script lang="ts" setup>
import { usePostsStore } from '../stores/postsStore';

const postsStore = usePostsStore();

</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as v;
@use '../styles/mixins.scss' as m;

.footer {
    @include m.base-flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    padding: 20px;
    border-radius: 10px;
    background-color: v.$background-color-dark;

    &__logo {
        cursor: pointer;
        transition: 0.5s;

        &:hover {
            color: v.$main-blue-hover;
        }
    }

    &__content {
        @include m.base-flex;
        justify-content: space-around;
        width: 100%;

        .footer__social {
            @include m.base-flex;
            gap: 20px;

            & li {
                list-style: none;

                & a {
                    color: v.$text-color;
                    transition: 0.5s;

                    &:hover {
                        color: v.$main-blue-hover;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .footer {
        &__content {
            flex-direction: column;
            gap: 10px;
        }

        &__copyright {
            display: flex;
        }
    }
}

</style>