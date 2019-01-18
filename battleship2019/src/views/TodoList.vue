<template>
    <div id="app-7">
        <ol>
            <TodoItem
                v-for="item in groceryList"
                v-bind:todo="item"
                v-bind:key="item.id"
            ></TodoItem>
        </ol>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodoItem from '@/components/TodoItem.vue'; // @ is an alias to /src
import { TodoItemModel } from '@/models/TodoItemModel.ts'; // @ is an alias to /src

@Component({
  components: {
    TodoItem,
  },
})

export default class TodoList extends Vue {
    @Prop() private groceryList!: Array<TodoItemModel>;
    constructor() {
        super();
        this.groceryList = new Array<TodoItemModel>();
        var Vegetables = new TodoItemModel(0,'Vegetables');
        var Cheese = new TodoItemModel(1,'Cheese');
        var Others = new TodoItemModel(2,'Whatever else humans are supposed to eat');

        this.groceryList.push(Vegetables);
        this.groceryList.push(Cheese);
        this.groceryList.push(Others);
    }
}
</script>
