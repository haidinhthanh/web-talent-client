export const server = {
    url: " https://fae558a9.ngrok.io/"
}


export const api = {
    getAllPost : "api/newspaper/getall",
    getNOPost: "api/newspaper/getNOPosts",
    getRecentPost: "api/newspaper/getRecentPosts",
    getPostById: (id)=>  "api/newspaper/getPost/" + id,
    getPopularPosts: (no_post, from)=> "api/newspaper/getPopularPosts/"+ no_post+"/"+ from //  /api/newspaper/getPopularPosts/:no_post/:from
}