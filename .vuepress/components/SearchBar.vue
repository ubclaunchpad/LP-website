<template>
  <div class="search-bar-container" :style="{
    width: width || '100%'
  }">
    <SearchBox ref="searchbox" />
  </div>
</template>

<script>
/**
 * @SearchBox is an alias for the Vuepress search box. For docs.ubclaunchpad.com, it
 * is the search box provided by our search plugin:
 * https://github.com/ubclaunchpad/vuepress-plugin-fulltext-search/blob/master/components/SearchBox.vue
 * 
 * It can be used directly in markdown, like so:
 * 
 *     <SearchBar width="50%" />
 * 
 * You can add additional customizations in the styling of this component, and override
 * the styles provided by the search plugin as desired.
 */
import SearchBox from '@SearchBox'

export default {
  components: { SearchBox },
  props: ['width', 'permafocus'],
  mounted() {
    if (this.permafocus) {
      // always keep input in focus
      const searchRef = this.$refs.searchbox.$refs.input;
      searchRef.focus();
      searchRef.onblur = () => searchRef.focus();
    }
  }
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
