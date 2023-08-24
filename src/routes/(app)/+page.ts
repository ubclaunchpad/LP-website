import type {PageLoad} from "../../../.svelte-kit/types/src/routes/(app)/$types";
import {error} from "@sveltejs/kit";

const path = '/src/docs';
export const load: PageLoad = async () => {
	try {
		// const { title, date } = post.metadata;
		return {
		};
	} catch (e) {
		console.log(e);

	}
};


export const prerender = true;
