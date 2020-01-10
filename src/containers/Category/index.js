import React,{Component} from "react";
import { clr, d, h, w, fle, fled, bc, ai, jc, ff, fw, linh, fs, opa, pos, flew, zi, fil, pad } from "../../styles/themes";
import { css } from "aphrodite";
import {image} from "../../assets/images";
import {connect} from "react-redux";
import SideContent from "../../component/SideContent";
import PaginationPost from "../../component/PaginationPost";
import {loadPagePost, changeWebStas} from "../../store/actions/post";
import { server, api } from "../../assets/constant";
import LoadView from "../LoadView";
import axios from "axios";
class Category extends Component{
    constructor(props){
        super(props)
        this.state= {
            isRend: false
        }
    }
    componentDidMount() {
        const {category} =this.props.match.params
        const {loadPagePosts} = this.props
        var url = server.url + api.getPostByCategory(category, 0, 10)
        axios.get(url)
        .then(res => {
            const pagePosts = res.data.data;
            loadPagePosts({
                pagePosts: pagePosts
            })
            this.setState({isRend: true})
        })
        .catch(error => console.log(error));
    }
    render() {
        const {category} =this.props.match.params
        const {pagePost} = this.props
        const {isRend} = this.state
        if (isRend){
            return (
                <div className={css(d.flex,w.w_100, fled.c, flew.w, pos.relative,) } >
                    <div className={css(d.flex,h.lg, w.w_100, h.elg, ai.c, jc.c)}>
                        <img src={image.image_big_post} className={css(pos.absolute, w.w_100, h.elg, zi.zi1, fil.b50)} style={{objectFit:"cover"}}></img>
                        <div className={css(d.flex, ff.IBM, fw.w700, linh.h1_25, clr.white, fs.lg,zi.zi3)}>
                            Category:{category}
                        </div>
                    </div>
                    <div className={css(d.flex, w.w_100, fled.r)}>
                        <div className={css(d.flex, fled.c, fle.flex_2,  pad.lg, bc.white_smoke)}>
                            <PaginationPost posts={pagePost} level={2} type="category" loc={category}/>
                        </div>
                        <div className={css(d.flex, fled.c, fle.flex_1, bc.white_smoke, pad.lg)}>
                            <SideContent/>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className={css(d.flex, w.w_100,h.h_100, pad.elg, pos.absolute, zi.zi3, bc.white)}>
                    <LoadView size={200}></LoadView>
                </div>
                )
        }
    }
}
const mapStateToProps = state =>({
    pagePost: state.pagePost.pagePosts
})

const mapDispatchToProps = (dispatch) => {
    return {
        loadPagePosts: (payload)=>{
            dispatch(loadPagePost(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);