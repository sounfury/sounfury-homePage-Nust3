<template>
    <div class="card" @click="goToLink" style="cursor: pointer">
        <div class="icon">
            <i :class="icon" />
        </div>
        <p class="title">{{ title }}</p>
        <p class="text">{{ text }}</p>
    </div>

</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: 'Default Title'
    },
    text: {
        type: String,
        default: 'Default text'
    },
    link: {
        type: String,
        default: '#'
    },
    icon: {
        type: String,
        default: 'Default Icon'
    },
    enabled: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['click']);
const goToLink = () => {
    emit('click');
}
</script>

<style scoped>
/* From Uiverse.io by vk-uiux */
.card {
    width: 100%;
    max-width: 300px;
    min-width: 200px;
    height: 250px;
    margin: 10px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.089);
    font-size: 16px;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    background-color: var(--card_background_color);
    font-family: 'Poppins', sans-serif;
    backdrop-filter: blur(30px);
    box-shadow: var(--card-box-shadow);

}

.icon {
    margin: 0 auto;
    width: 100%;
    height: 80px;
    max-width: 80px;
    background: linear-gradient(90deg, #7eaaff 0%, #ff48fb 40%, rgba(0, 0, 0, 0.28) 60%);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.8s ease;
    background-position: 0px;
    background-size: 200px;
    font-size: 40px;
}

.icon svg {
    fill: white;
}

.card .title {
    width: 100%;
    margin: 0;
    text-align: center;
    margin-top: 30px;
    color: var(--title-color);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 4px;
}

.card .text {
    width: 80%;
    margin: 0 auto;
    font-size: 13px;
    text-align: center;
    margin-top: 20px;
    color: var(--text-color);
    font-weight: 200;
    letter-spacing: 2px;
    opacity: 0;
    max-height: 0;
    transition: all 0.3s ease;
}

.card:hover {
    height: 270px;
}

.card:hover .text {
    transition: all 0.3s ease;
    opacity: 1;
    max-height: 40px;
}

.card:hover .icon {
    background-position: -120px;
    transition: all 0.3s ease;
}

.card:hover .icon svg path {
    fill: url('#gradientColor');
    transition: all 0.3s ease;
}
</style>