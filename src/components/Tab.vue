<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'tab',
    props: {
        name: { required: true },
        description: { required: true},
        selected: { default: false }
    },

    data() {
        return {
            isActive: false,
        }
    },

    created() {
        this.isActive = this.selected
    }
}
</script>