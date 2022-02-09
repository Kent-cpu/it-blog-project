import categoryPost from "./categoryPost";

export const convertLangCategoryPost = (category) => {
    return Object.keys(categoryPost).find(key => categoryPost[key] === category);
}