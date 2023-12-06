<script lang="ts">

import Document from "$lib/components/general/Document.svelte";
	import FullPage from "$lib/components/layouts/FullPage.svelte";
export let data: any;
console.log(data);
</script>

<FullPage>
    <div slot="main" class="page">
        <Document area={data.area} slug={data.slug} />

    </div>
</FullPage>


<style lang="scss">
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>