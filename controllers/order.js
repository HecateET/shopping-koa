/**
 * 控制层（处理逻辑）
 * 订单处理
 */
const orderDAO = require("../model/orderDAO");

module.exports = {
    //获得用户订单t
    getOrderByState: async(ctx, next) =>{
        try{
            let {userId} = ctx.request.body
            let orderList = await orderDAO.getAllOrderInfo(userId)
            ctx.body = {"code":200,"message":"订单查询成功",data:orderList}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //下单,创建订单 订单状态 ：未支付，已支付，已发货，已完成，退款中，已取消，已退款。
    createOrder: async(ctx, next) =>{
        try{
            // let orderNo = orderDAO.randomNumber();
            let {orderNo,userId,productId,productName,productNum,orderStatus,addressId} = ctx.request.body
            if(userId,productId,addressId){
                await orderDAO.createOrder(orderNo,userId,productId,productName,productNum,orderStatus,addressId);
                let orderId = await orderDAO.getOrderIdByOrderNo(orderNo);
                console.log(orderId);
                ctx.body =  {"code":200,"message":"订单创建成功",data:orderId}
            }else{
                ctx.body = {"code":200,"message":"不能空",data:{resp:1}}
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
   

    //删除订单
    // deleteOrder: async(ctx, next) =>{
    //     try{

    //     }catch(e){
            
    //     }
    // },

    //确认收货
    confirmReceived: async(ctx, next) =>{
        try{
            let {orderId} = ctx.request.body
            let orderStatus = "已收货", hasSend = 1;
            await orderDAO.updateOrderStatus(orderStatus,orderId,hasSend)
            ctx.body = {"code":200,"message":"收货成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //确认付款
    pay: async(ctx, next) =>{
        try{
            let {orderId} = ctx.request.body
            let orderStatus = "已付款"
            await orderDAO.updateOrderStatus(orderStatus,orderId)
            ctx.body = {"code":200,"message":"订单查询成功",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //

}