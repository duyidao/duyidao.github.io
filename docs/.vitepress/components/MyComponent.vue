<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'Hello, VuePress',
            description: 'This is a Vue component in VitePress.'
        };
    }
};
</script>
