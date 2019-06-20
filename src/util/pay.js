function jsApiCall(item)
{
    // let data = {item};
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', item,
        function(res){
            WeixinJSBridge.log(res.err_msg);
            //alert('err_code:'+res.err_code+'err_desc:'+res.err_desc+'err_msg:'+res.err_msg);
            //alert(res.err_code+res.err_desc+res.err_msg);
            alert(res.err_msg);
            if(res.err_msg == "get_brand_wcpay_request:ok"){
                alert("支付成功!");
                //window.location.href="http://m.blog.csdn.net/article/details?id=72765676";
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                alert("用户取消支付!");
            }else{
                alert("支付失败!");
            }
        }
    );
}

function callpay()
{
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    }else{
        jsApiCall();
    }
}