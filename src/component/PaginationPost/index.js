import React,{Component} from "react";
import { w, d, fled, h,  jc, flew, } from "../../styles/themes"
import {css, StyleSheet} from "aphrodite";
import Postitem from "../Postitem";
import Pagination from "../Pagination";
import { connect } from "react-redux";
import {loadPagePost, setNOPosts} from "../../store/actions/post";
import { images} from "../../assets/images";
import { server, api } from "../../assets/constant";
import axios from "axios";
class PaginationPost extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        var {type, loc} = this.props
        this.mapList(type, loc)
    }

    mapList= (type, loc)=>{
        if( type =="home"){
            var url = server.url + api.getNOPost
            axios.get(url)
            .then(res => {
                const noPosts = res.data.data;
                this.props.setNOPosts({
                    noPosts: noPosts
                })
            })
            .catch(error => console.log(error));
        }
        else if(type =="location"){
            var url = server.url + api.getNOLocationType(loc)
            axios.get(url)
            .then(res => {
                const noPosts = res.data.data;
                this.props.setNOPosts({
                    noPosts: noPosts
                })
            })
            .catch(error => console.log(error));
        }
        else if(type =="feature"){
            var url = server.url + api.getNOPostsFeatureType(loc)
            axios.get(url)
            .then(res => {
                const noPosts = res.data.data;
                this.props.setNOPosts({
                    noPosts: noPosts
                })
            })
            .catch(error => console.log(error));
        }
        else if(type =="feature"){
            var url = server.url + api.getNOPostsFeatureType(loc)
            axios.get(url)
            .then(res => {
                const noPosts = res.data.data;
                this.props.setNOPosts({
                    noPosts: noPosts
                })
            })
            .catch(error => console.log(error));
        }
        else if(type =="search"){
            var url = this.props.query.replace("searchPosts","getNoSearchPosts")
            console.log("num "+ url)
            axios.get(url)
            .then(res => {
                const noPosts = res.data.data;
                this.props.setNOPosts({
                    noPosts: noPosts
                })
                console.log("num "+ noPosts)
            })
            .catch(error => console.log(error));
        }
    }

    render() {
        const {pagePosts, level, noPosts, type, loc} = this.props
        return (
                <div className={css(d.flex,fled.c)} 
                    ref={(el)=>this.fragment = el}
                >
                    <div className={css(d.flex, fled.r, flew.w, jc.fs, )} >
                                {
                                    pagePosts.map((item,index)=>{
                                        const src = item._source;
                                        return (
                                            <Postitem 
                                            item = {item}
                                            level = {level}
                                            // images={src.images && src.images.length?src.images[0]:images.post_img} 
                                            key={index}/>
                                        )
                                    })
                                }
                    </div>
                    <div className={css(d.flex)}>
                        <Pagination noPosts={noPosts} parentFragement={this.fragment} type={type} loc={loc}></Pagination>
                    </div>
                </div>
        )
    }
}
const mapStateToProps = state =>({
    pagePosts: state.pagePost.pagePosts,
    noPosts : state.pagePost.noPosts,
    query: state.searchBar.query
})

const mapDispatchToProps = (dispatch) => {
    return {
        loadPagePosts: (payload)=>{
            dispatch(loadPagePost(payload))
        },
        setNOPosts: (payload)=>{
            dispatch(setNOPosts(payload))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PaginationPost)

