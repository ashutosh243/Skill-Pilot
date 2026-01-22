import { tavily } from "@tavily/core";
import config from "../../../config/config.js";
import { extract } from "@extractus/article-extractor";
import { htmlToText } from "html-to-text";
import { State } from "../types.js";


const oepnUrl = async (url: string): Promise<string | undefined> => {

    try {
        const article = await extract(url);
        return htmlToText(article?.content as string, {
            wordwrap: false,
            preserveNewlines: true,
            selectors: [
                { selector: "a", options: { ignoreHref: true } },
                { selector: "img", format: "skip" },
                { selector: "nav", format: "skip" },
                { selector: "footer", format: "skip" }
            ]
        });
    }
    catch (e) {
        const msg = e instanceof Error ? e.message : "Error during getContent";
        console.log(msg);
    }
}
export const search = async (state: State): Promise<Partial<State>> => {

    try {
        const tvly = tavily({ apiKey: config.tavily });
        const response = await tvly.search(state.searchQuery as string);
        const result = response.results;
        result.sort((a, b) => b.score - a.score);
        const trimresult = result.slice(0, 4);

        let content = "";
        for (const obj of trimresult) {
            const openurl = await oepnUrl(obj.url);
            if (openurl) {
                content += openurl;
            }
        }
        const trimcontent = content.slice(0, 1000);
        return {
            websearch: trimcontent
        }
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "unknown Error";
        console.log(msg);
        return { websearch: "failed to fetch websearch result" }
    }
}


