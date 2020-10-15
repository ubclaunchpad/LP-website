<template>
  <div class="search-bar-container" :style="{
    width: width || '100%'
  }">
    <SearchBox />
  </div>
</template>

<script>
import SearchBox from '@SearchBox'

export default {
  components: { SearchBox },
  props: ['width'],
}
</script>

<style lang="scss">
.search-bar-container {

  .search-box {
    width: 100%;

    input {
      width: 100%;
    }

    .suggestions {
      width: 100%;
      max-width: none;
      z-index: 999;
    }
  }
}
</style>
