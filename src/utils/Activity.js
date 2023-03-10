import { Effects } from "./Animation";
import { GUID } from "./Definition";
import Request from "./Request";
export class Activity {
    constructor(id) {
        this.id = id ?? "";
        this.title = "";
        this.titleColor = "#000";

        this.logo = null;
        this.background = null;
        this.pictures = [];

        this.logoUrl = "";
        this.backgroundUrl = "";
        this.pictureUrls = [];

        this.pictureSpeed = "1x";
        this.signSpeed = "1x";
        this.createTime = "";
        this.sharedLink = "";

        this.rollEffect = "";
        this.localSign = [];
    }
    getFileForm() {
        return Request.form({
            logo: this.logo,
            background: this.background,
            pictures: this.pictures,
            localSign: this.localSign
        });
    }
    getDataQuery() {
        return {
            title: this.title,
            titleColor: this.titleColor,
            pictureSpeed: this.pictureSpeed,
            signSpeed: this.signSpeed,
            rollEffect: this.rollEffect,
        };
    }
    static Default() {
        let ret = new Activity();
        ret.id = "123456789";
        ret.title = "南京孜博汇信息科技有限公司";
        ret.titleColor = "#faf";
        ret.createTime = new Date();
        ret.sharedLink = GUID.NewGuid();
        ret.rollEffect = Effects.FadeDown.value;
        let getUrl = (num) => `http://47.93.86.37:8686/taskFile/sign/${num}.JPG`
        ret.pictureUrls = [
            getUrl(1),
            getUrl(2),
            getUrl(3),
            getUrl(4),
            getUrl(5),
        ];
        ret.logoUrl = `http://47.93.86.37:8686/taskFile/sign/logo.png`;
        return ret;
    }
    static rules(){
        return {
            title: [
                {
                    required: true,
                    message: "请输入活动名称",
                    trigger: "blur",
                },
            ],
        }
    }
    get Copy(){ 
        var ret = new Activity();
        Object.keys(this).forEach(k=>ret[k]=this[k]);
        return ret;
    }
}
