
interface Ajax<T> {
    // 请求类型
    type: string;
    // 提交的 url 
    url: string;
    //  提交的数据对象
    data?: T;
    //  请求超时时间
    timeout?: number;
    //  需要设置的请求头
    headers?: any;
    //  请求成功回调
    success?: Function;
    //   请求失败回调
    error?: Function;
}


interface Ajax_Options {
    headers: any;
    timeout: number;
}