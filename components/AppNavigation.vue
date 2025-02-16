<template>
    <div id="navigation">
        <h2>网站列表</h2>
        <div class="card-container">
            <navigationCard v-for="site in sites" :key="site.title" :title="site.title" :text="site.text"
                :link="site.link" :icon="site.icon" :enabled="site.enabled" @click="handleSiteClick(site)" />
        </div>

        <dialog id="model_tip" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">提示</h3>
                <p class="py-4">该网站暂未开放。请以后再试</p>
                <div class="modal-action">
                    <button class="btn" @click="closeModal">关闭</button>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import navigationCard from './base/navigationCard.vue';
import gsap from 'gsap';

const sites = ref([
    {
        title: '我的博客',
        text: '分享我的技术文章和生活感悟',
        link: 'https://blog.sounfury.top',
        icon: 'ri-article-line',
        enabled: true, // 功能开启
    },
    {
        title: '云盘',
        text: '存储和分享文件',
        link: 'https://alist.sounfury.top',
        icon: 'ri-cloud-line',
        enabled: true, 
    },
    {
        title: 'ai',
        text: 'ai工具',
        link: 'https://ai.sounfury.top',
        icon: 'ri-robot-2-line',
        enabled: true,
    },
    {
        title: '书库',
        text: '我的个人电子书库',
        link: 'https://yourbooks.com',
        icon: 'ri-book-line',
        enabled: false,
    },
    {
        title: '项目',
        text: '我的一些项目展示',
        link: 'https://yourproject.com',
        icon: 'ri-code-line',
        enabled: false,
    },
    {
        title: '音乐',
        text: '放松一下，听听音乐',
        link: 'https://yourmusic.com',
        icon: 'ri-music-line',
        enabled: false,
    }
]);

const modal = ref(null);

const handleSiteClick = (site) => {
    if (!site.enabled) {
        // 如果功能未开启，则显示模态框
        modal.value.showModal();
    } else {
        // 功能开启，直接跳转
        window.open(site.link, '_blank');
    }
};

const closeModal = () => {
    modal.value.close();
};

onMounted(() => {
    modal.value = document.getElementById('model_tip');
    gsap.fromTo('#navigation', {
        opacity: 0,
        y: 50,
    }, {
        opacity: 1,
        y: 0,
        stagger: 0.1, // 卡片出现间隔
        duration: 1,
        ease: 'power2.out',
    });
});
</script>
<style lang="scss" scoped>
#navigation {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--title-color);
    }

    .card-container {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); // 默认多列布局
        padding: 1.5rem;
        border-radius: 1.5rem;
        background-color: var(--container-color);
        box-shadow: 0 5px 15px 8px rgba(7, 17, 27, 0.05);
    }

    /* 手机端竖向排列 */
    @media screen and (max-width: 768px) {
        .card-container {
            grid-template-columns: 1fr;
            padding: 1rem;
        }
    }
}
</style>