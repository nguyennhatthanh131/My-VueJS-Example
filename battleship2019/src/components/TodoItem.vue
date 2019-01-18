<template>
  <li>{{ todo.text }}</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TodoItem extends Vue {
  @Prop() private todo!: Object;
}
</script>
