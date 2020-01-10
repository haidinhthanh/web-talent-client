export const server = {
    // url: "https://54.68.196.78:8080"
    url: "https://localhost:8080",
}


export const api = {
    getAllPost : "/api/newspaper/getall",
    getNOPost: "/api/newspaper/getNOPosts",
    getRecentPost: "/api/newspaper/getRecentPosts",
    getPostById: (id)=>  "/api/newspaper/getPost/" + id,
    getPostByTypeLocation: (type, from, no) => "/api/newspaper/getPostByTypeLocation/" + type + "/" + no +"/" + from,
    getPopularPosts: (no_post, from)=> "/api/newspaper/getPopularPosts/"+ no_post+"/"+ from,
    getNOLocationType:(loc) => "/api/newspaper/getNOPostsLocationType/" + loc,
    getPostsByTypeFeature:(type, from, no)=> "/api/newspaper/getPostsByTypeFeature/" + type + "/" + no +"/" + from,
    getNOPostsFeatureType:(type)=> "/api/newspaper/getNOPostsFeatureType/" + type,
    searchPosts:(query,startDate, endDate, loc, cate, tag, from, no)=> {
        if(query == ""){
            query = "empty"
        }
        if(loc == ""){
            loc = "empty"
        }
        if(cate == ""){
            cate = "empty"
        }
        if(tag == ""){
            tag = "empty"
        }
        return "/api/newspaper/searchPosts/"+query+"/"+startDate+"/"+endDate+"/"+loc+"/"+cate+"/"+tag+"/"+from+"/"+no
    },
    getAllCategory:()=>"/api/statistical/getAllCategory",
    getAllTag:()=> "/api/statistical/getAllTag",
    getAllLocation:()=> "/api/statistical/getAllLocation",
    getPostByCategory: (cate, from, no)=> "/api/newspaper/getPostByCategory/" + cate + "/" +from +"/" +no,
    getNOPostCategory:(cate)=> "/api/newspaper/getNoCategoryPost/" + cate
}