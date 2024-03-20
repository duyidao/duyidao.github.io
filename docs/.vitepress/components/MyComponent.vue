<template>
    <div>
        <h1 @click="clickFn">click me</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        clickFn() {
           const arr = new Array(10000000).fill(0);
           console.log(arr)
           return arr;
        }
    },
};
</script>
