<template>
    <div class="breadcrumb-container">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb my-0">
            <li v-if="breadcrumb" class="breadcrumb-item"><router-link :to="{name: 'home'}"><i class='bx bx-home-alt text-white' ></i></router-link></li>
            <li v-else class="breadcrumb-item"><font-awesome-icon class="text-white" :icon="['fas', 'house']"/><!----></li> 
            <template v-for="(value,key) in breadcrumb" v-bind:key="`breadcrumb-element-${key}`">
               {{ value.l }}
                <li v-if="isLast(key)" class="breadcrumb-item active text-white" aria-current="page">{{value.text}}</li>
                <li v-else class="breadcrumb-item"><router-link  class="text-white text-decoration-none" :to="value.link">{{value.text}}</router-link></li>
            </template>
        </ol>
        </nav>
    </div>
</template>
<script>
export default {
  name: 'breadcrumb',
  props: {
    breadcrumb: {
      type: Array
    },
  },
  methods: {
    isLast(index) {
      return index === this.breadcrumb.length - 1;
    }
  }
};
</script>