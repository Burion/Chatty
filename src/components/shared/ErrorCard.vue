<template>
    <div class="error-card">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .error-card {
    background-color: rgb(255, 183, 183);
    border-radius: 10px;
    color: rgb(59, 59, 59);
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    }
</style>