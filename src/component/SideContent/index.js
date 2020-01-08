import React, {Component} from "react";
import { w, d, fled, h, zi, pad, bc, m, ff, fw, ai, jc, fs, linh, b, } from "../../styles/themes"
import {css, StyleSheet} from "aphrodite";
import RecentPost from "../../component/RecentPost";
import {FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon} from "react-share";
class SideContent extends Component{
    render() {
        return (
            <div className={css(d.flex,fled.c, bc.white_smoke)}>
                <div className={css(d.flex, fled.c, bc.white, pad.md)}>
                    <div className={css(ff.IBM, fw.w700, linh.h1_25, fs.emd, m.md,)}>Social Link</div>
                    <div className={css(d.flex, fled.r,)}>
                        <div className={css(d.flex,bc.white_smoke, h.md, w.md, b.br50, ai.c, jc.c, m.sm)}>
                            <FacebookShareButton url={"https://stackoverflow.com/questions/56724789/react-facebook-share-button-does-not-work"}>
                                <FacebookIcon size={32} borderRadius={20}/>
                            </FacebookShareButton>
                        </div>
                        <a className={css(d.flex,bc.white_smoke, h.md, w.md, b.br50, ai.c, jc.c, m.sm)}>
                            <TwitterShareButton url={"https://stackoverflow.com/questions/56724789/react-facebook-share-button-does-not-work"}>
                                <TwitterIcon size={32} borderRadius={20}></TwitterIcon>
                            </TwitterShareButton>
                        </a>
                    </div>
                </div>
                <div className={css(d.flex, fled.c, bc.white, pad.md, m.mg_t_lg)}>
                    <div className={css(ff.IBM, fw.w700, linh.h1_25, fs.emd, m.sm)}>Recent Posts</div>
                    <div className={css(d.flex, fled.c,)}>
                        <RecentPost  noPost={10} type="content"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideContent;