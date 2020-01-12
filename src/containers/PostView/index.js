import React,{ Component } from "react";
import {connect} from "react-redux";
import {css} from "aphrodite";
import { d, w, h, fled, fle,pad, bc, ff, fw, lets, clr, text, fs, m, texd, hov, linh, b, flew, jc, ai, pos, zi, lst} from "../../styles/themes";
import {image} from "../../assets/images";
import SideContent from "../../component/SideContent";
import {Link} from "react-router-dom";
import axios from "axios";
import {server, api} from "../../assets/constant";
import {viewPost} from "../../store/actions/post";
import LoadView from "../LoadView";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon} from "react-share";
class PostView extends Component{
    getPost = (id)=>{
        var url = server.url + api.getPostById(id)
        axios.get(url).then(res=>{
            var post = res.data.data
            this.props.viewPost({
                post: post
            })
            this.fragment.scrollIntoView({behavior:"smooth"})
        }).catch(error => console.log(error));
    }
    componentDidMount(){
        const {id} =this.props.match.params
        this.getPost(id)
        let e = this.fragment
    }
    componentDidUpdate(prevProps, prevState){
        const {id} =this.props.match.params
        if( id !== prevProps.match.params.id){
            this.getPost(id)
        }
    }

    render() {
        const {level, post} = this.props
        var isRend = Object.keys(post).length> 0 ? true : false;
        if(isRend){
            const {no_view, _id} = post
            const {url,processor_category_classify, title, published_date, content, images, summary, processor_talent_info, processor_ner_loc, source} = post._source
            var locArr = [...processor_ner_loc.cities, ...processor_ner_loc.provinces, ...processor_ner_loc.nations]
            var tlInfoArr = [...processor_talent_info.Salary, ...processor_talent_info.Environment, ...processor_talent_info.Regime]
            var locArr = locArr.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            })
            var tlInfoArr = tlInfoArr.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            })
            var page_source = ""
            if(typeof source === 'undefined'){
                page_source = url
            }
            else{
                page_source = source
            }
            return (
                <div className={css(d.flex, w.w_100)} 
                ref ={(el)=> this.fragment = el}
                >
                    <div className={css(d.flex, w.w_100, fled.r,)}>
                        <div className={css(d.flex, fled.c, fle.flex_2,  pad.lg, bc.white_smoke)}>
                            <div className={css(d.flex, bc.white, fled.c,)}>
                                <img 
                                    src={images && images.length? images[0]: image.post_img} 
                                    className={css(w.w_100,)} 
                                    style={{objectFit:"fill"}}
                                />
                                <div className={css(d.flex, pad.lg, fled.c)} >
                                    <Link
                                        to={"/category/" + processor_category_classify}
                                        className={css(ff.Roboto, fw.w500, lets._esm, clr.dodger_blue, text.u, fs.sm, m.mg_t_sm, texd.none, hov.dis_underline)}
                                    >
                                        {processor_category_classify}
                                    </Link>
                                    <div className={css(ff.IBM, fs.md, fw.w700, lets._esm, linh.h1_25, clr.black, m.mg_t_sm, texd.none)}>
                                        {title}
                                    </div>
                                    <div className={css(d.flex, fled.r)}>
                                    {
                    typeof published_date !== "undefined" ?
                ( <div className={css(ff.Roboto, fs.esm, fw.w400, linh.h1_5, clr.dim_gray,  m.mg_t_sm)}>
                {published_date.replace("T"," ").replace("Z","").slice(0,16)}
            </div>): (<div></div>)
                }
                                       
                                        <div className={css(m.mg_l_md)}>
                                            <EqualizerIcon style={{width: 30, height:30, color: "#696969"}}></EqualizerIcon>
                                        </div>
                                        <div className={css(ff.Roboto, fs.esm, fw.w400, linh.h1_5, clr.dim_gray,  m.mg_t_sm,)}> 
                                            {no_view} views
                                        </div>
                                    </div>
                                    {
                                        typeof summary == "undefined" || summary.replace(" ","") ==""?(<div></div>):(<div className={css(ff.Roboto, fs.sm, fw.w400, linh.h1_5, clr.dim_gray,  m.mg_t_sm, bc.white_smoke, pad.md, m.mg_t_md)}>
                                            {summary}
                                        </div>)
                                    }
                                    <div className={css(ff.Roboto, fs.sm, fw.w400, linh.h1_5, clr.black,  m.mg_t_lg)}>
                                        {content}
                                    </div>
                                </div>
                            </div>
                            <div className={css(d.flex, bc.white, fled.r, m.mg_t_lg, b.b_b_l)}>
                                <div className={css(d.flex, fled.c, pad.md, fle.flex_1, b.b_r_l,)}>
                                    <div className={css( ff.IBM, fw.w700, fs.md, linh.h1_5, )}>
                                        Tags:
                                    </div>
                                    {
                                        (locArr.length>0)?(
                                        <div className={css(d.flex, fled.r)}>
                                            <div className={css(ff.IBM, fw.w500, fs.sm, linh.h1_5,jc.c, ai.c)}>Location:</div>
                                            <div className={css(d.flex, w.w_100, flew.w)}> 
                                                {
                                                    locArr.map((item, index)=>{
                                                        return(
                                                            <div className={css(bc.light_gray, b.br_45, pad.sm, ff.IBM, fw.w500, fs.sm, linh.h1_5, m.mg_l_md, m.mg_b_sm)} key={index}>
                                                                {item}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        ): null
                                    }
                                    {
                                        (tlInfoArr.length>0)?(
                                        <div className={css(d.flex, fled.r, m.mg_t_md)}>
                                            <div className={css(ff.IBM, fw.w500, fs.sm, linh.h1_5,jc.c, ai.c)}>Feature:</div>
                                            <div className={css(d.flex, w.w_100, flew.w)}> 
                                                {
                                                    tlInfoArr.map((item, index)=>{
                                                        return(
                                                            <div className={css(bc.light_gray, b.br_45, pad.sm, ff.IBM, fw.w500, fs.sm, linh.h1_5, m.mg_l_md, m.mg_b_sm)} key={index}>
                                                                {item}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>):null
                                    }   
                                </div>

                                <div className={css(d.flex, fled.c, pad.md, fle.flex_1, m.mg_l_md,)}>
                                    <div className={css( ff.IBM, fw.w700, fs.md, linh.h1_5, )}>
                                        Source:
                                    </div>
                                    <a href={page_source} className={css(texd.none, clr.black, hov.trans_color_dgray)}>
                                        {page_source}
                                    </a>
                                </div>
                            </div>
                            <div className={css(d.flex, bc.white, ai.c, pad.md, jc.fe,)}>
                                <div className={css(fle.flex_1)}></div>
                                <div className={css(fle.flex_1, d.flex, fled.r)}>
                                    <div className={css( fw.w600, fs.md, pad.p_lr_sm, m.mg_l_sm)}>
                                        Share:
                                    </div>
                                    <li className={css(lst.none, d.inline, pad.p_lr_sm, d.flex)}>
                                        <FacebookShareButton url={"http://talentvietnam.netlify.com" + "/view_post/"+ _id}>
                                            <FacebookIcon size={32} borderRadius={20}/>
                                        </FacebookShareButton>
                                    </li>
                                    <li className={css(lst.none, d.inline, pad.p_lr_sm, d.flex)}>
                                        <TwitterShareButton url={"http://talentvietnam.netlify.com" + "/view_post/"+ _id}>
                                            <TwitterIcon size={32} borderRadius={20}></TwitterIcon>
                                        </TwitterShareButton>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className={css(d.flex, fled.c, fle.flex_1, bc.white_smoke, pad.lg,)}>
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
    post: state.viewPost.post,
})


const mapDispatchToProps = (dispatch) => {
    return {
        viewPost: (payload)=>{
            dispatch(viewPost(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)