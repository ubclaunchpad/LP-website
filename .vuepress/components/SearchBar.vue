<template>
  <div class="search-bar-container" :style="{
    width: width || '100%'
  }">
    <SearchBox ref="searchbox" class="no-collapse" />
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
  // always maximize width on small enough screens, regardless of provided width
  @media (max-width: 1024px) {
    width: 100% !important;
  }

  .search-box {
    // fill container
    width: 100%;
    margin-right: 0;

    input {
      // fill parent
      width: 100%;
      box-sizing: border-box;
      left: 0;
      // prevent border from being removed on small screens (plugin feature)
      [border-color="transparent"] {
        border-color: unset;
      }
    }

    .suggestions {
      // fill parent
      width: 100%;
      max-width: none;
      min-width: 100px;

      // make sure list is above everything else
      z-index: 999;
    }

    * {
      :hover {
        * {
          // override by vuepress theme (not needed in navbar)
          text-decoration: none !important;
        }
      }
    }
  }
}
</style>
