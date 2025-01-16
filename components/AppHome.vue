<template>
  <section class="home section" id="home">
    <div class="home__container container grid">
      <div class="home__content grid">
        <div class="home__social ">
          <a v-for="social in socialLinks" :key="social.platform" :href="social.url" target="_blank">
            <i :class="social.iconClass"></i>
          </a>
        </div>

        <div class="home__three" id="home__three">
          <MyOfficeScene></MyOfficeScene>
        </div>

        <div class="home__data">
          <h1 class="home__title">
            {{ titleTextArr.join('') }}<span class="home__columeline">|</span>
          </h1>
          <h3 class="home__subtitle">
            {{ subtitle }}
          </h3>
          <p class="home__description">
            {{ description }}
          </p>
          <a href="#contact" class="button button-flex">
            <span>{{ contactButtonText }}</span>
            <i class="alicon alicon-zhixiangyou button__icon"></i>
          </a>
        </div>
      </div>
      <div class="home__scroll">
        <a href="#about" class="button--flex">
          <span>{{ scrollText }}</span>
          <i class="alicon alicon-arrow-down home__arrow"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import MyOfficeScene from '@/components/MyOfficeScene.vue';
import { ref, onMounted } from 'vue';

const socialLinks = [
  {
    platform: 'gitee',
    url: 'https://gitee.com/asdfasdaad',
    iconClass: 'alicon alicon-gitee home__icon'
  },
  {
    platform: 'github',
    url: 'https://github.com/sounfury',
    iconClass: 'alicon alicon-github home__icon'
  }
];

const titleText = 'Hi, I\'m sounfury.';
const subtitle = '21岁，事学生';
const description = ''; // Add your description here
const contactButtonText = '联系我';
const scrollText = '往下滑';


const titleTextArr = ref([]);
const writeText = (text, type) => {
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      if (type === 'write') {
        titleTextArr.value.push(text[i]);
      } else {
        titleTextArr.value.pop();
      }

      // When last character is processed
      if (i === text.length - 1) {
        setTimeout(() => {
          writeText(text, type === 'write' ? 'wipe' : 'write');
        }, 2000);
      }
    }, i * 500);
  }
};

onMounted(() => {
  writeText(titleText, 'write');
});
</script>

<style lang="scss" scoped>
.home {
  &__container {
    gap: 1rem;
  }

  &__content {
    margin-bottom: var(--mb-3);
    grid-template-columns: 0.5fr 3fr;
    align-items: center;

    @include min-screen(768px) {
      padding-top: 5.5rem;
      column-gap: 2rem;
      padding-top: 3.5rem;
    }

    @include min-screen(350px) {
      grid-template-columns: 0.25fr 3fr;
    }

    @include min-screen(568px) {
      grid-template-columns: max-content 1fr 2fr;
    }
  }

  &__social {
    display: grid;
    grid-template-columns: max-content;
    row-gap: 1rem;
  }

  &__icon {
    font-size: 1.3rem;
    color: var(--first-color);

    &:hover {
      color: var(--first-color-alt);
    }
  }

  &__blob {
    width: 200px;
    fill: var(--first-color);
  }

  &__three {
    width: 100%;
    height: 240px;

    @include min-screen(568px) {
      order: 1;
      height: 340px;
    }
  }

  &__data {
    max-width: 425px;
    grid-column: 1/3;

    @include min-screen(568px) {
      grid-column: initial;
    }
  }

  &__columeline {
    animation: mydeamon 2s infinite;
  }

  @keyframes mydeamon {
    0% {
      transform: scale(3); //scale代表闪烁的体型变化，其他倾斜等样式自行搜索
      opacity: 1; //透明程度
    }

    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  &__title {
    font-size: var(--big-font-size);
    margin: 0.4rem 0;
  }

  &__subtitle {
    font-size: var(--h3-font-size);
    color: var(--text-color);
    font-weight: var(--font-medium);
    margin-bottom: var(--mb-0-75);
  }

  &__description {
    margin-bottom: var(--mb-2);
  }

  &__scroll {
    text-align: center;

    a {
      flex-direction: column;
    }

    color: var(--first-color);
    transition: 0.3s;

    span {
      font-size: var(--small-font-size);
      color: var(--title-color);
      font-weight: var(--font-medium);
    }

    &:hover {
      transform: translateY(0.25rem);
    }
  }

  &__arrow {
    font-size: 2rem;
    font-weight: 1000;
  }
}
</style>
