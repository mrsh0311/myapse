
import ConfigViewService from "../ViewService/ConfigViewService";

const { hideLoading } = ConfigViewService();

export class ServerHandlerError extends Error {

    constructor(err) {

        super(err.message);
        hideLoading();
        
        if(err.response)
        {
            switch (err.response.status) {
                case 404:
                    this.message = "منبع مورد نظر پیدا نشد"
                    break;
                case 400:
                    this.message = "اطلاعات ارسالی صحیح نیست"
                    break;
                case 403:
                    this.message = "شما مجاز به انجام این عملیات نیستید"
                    break;
                case 401:
                    this.message = "حق دسترسی ندارید"
                    break;
                case 409:
                    this.message = "اطلاعات تکراری است"
                    break;
                case 500:
                    this.message = "خطا در سرور"
                    break;
                default:
                    break;
            }
        }
        else
        {
            this.message="خطا در برقراری ارتباط"
        }
      
    }
}


