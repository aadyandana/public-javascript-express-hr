class BaseResponse {
    status;
    message;
    data;

    constructor(param) {
        this.status = param?.status == false ? false : true;
        this.message = param?.message || 'Success';
        this.data = param?.data;
    }
}

module.exports = BaseResponse;
