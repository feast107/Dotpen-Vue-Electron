import axios from "axios";
/*创建axios 实例*/
const Request = axios.create({
    /*api的baseURL*/
    baseURL:
        process.env.NODE_ENV === "production"
            ? process.env.VUE_APP_REQUEST_URL
            : "https://localhost:7201",
    /*请求超时时间*/
    timeout: 60000,
});
/*request 拦截器*/
Request.interceptors.request.use(
    (config) => {
        let url = config.url;
        //配置密匙

        return config;
    },
    (error) => {
        /*处理请求出错*/
        return Promise.reject(error);
    }
);
/*response拦截器*/
Request.interceptors.response.use(
    (res) => {
        if (res.status === 401) {
            return res;
        }
        return res;
    },
    (error) => {
        /*处理response出错逻辑*/
        return Promise.reject(error);
    }
);
Request.form = (data) => {
    let ret = new FormData();
    Object.keys(data).forEach((x) => {
        if (data[x] instanceof File) {
            let n = data[x].name.split(".");
            ret.append(x, data[x], `file.${n[n.length - 1]}`);
        } else if (data[x] instanceof Array) {
            data[x].forEach((f) => {
                let n = f.name.split(".");
                ret.append(x, f, `file.${n[n.length - 1]}`);
            });
        } else {
            ret.append(x, data[x]);
        }
    });
    return ret;
};
Request.blob = (raw) => {
    return new Promise((res, rej) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(raw);
        reader.onload = (e) => {
            if (typeof e.target.result === "object") {
                res(new Blob([e.target.result]));
            } else {
                res(e.target.result);
            }
        };
    });
};
export default Request;
