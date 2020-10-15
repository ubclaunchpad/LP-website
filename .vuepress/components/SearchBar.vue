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
 */
import SearchBox from '@SearchBox'

/**
 * SearchBar is a standalone version of the search bar in the navigation bar provided by
 * our search plugin, `vuepress-plugin-fulltext-search`. It is intended to be used
 * embedded directly into Markdown files, like so:
 * 
 *     <ClientOnly>
 *       <SearchBar width="60%" />
 *     </ClientOnly>
 * 
 * You can add additional customizations in the styling of this component, and override
 * the styles provided by the search plugin as desired. When using this in a file, we
 * recommend adding frontmatter to disable the navigation bar search to avoid duplicate
 * search boxes:
 * 
 *     ---
 *     search: false # disable navbar search
 *     ---
 *
 * We wrap the component in `<ClientOnly>` because of some Vuepress complications - not
 * really sure why, but seems to be required for this compoonent to work consistently,
 * so just add it to be safe. You can read more about it here:
 * https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
 */
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
