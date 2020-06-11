/**
 * 控制层（处理逻辑）
 * 后台系统订单处理
 */
const orderDAO = require("../model/orderDAO");

module.exports = {
    //获得所有订单
    getAllOrders: async(ctx, next) =>{
        try{
            let orderLists = await orderDAO.getAllOrderList() 
            ctx.body = {"code":200,"message":"订单列表查询成功",data:orderLists}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //获得某一个订单
    getOrder: async(ctx, next) =>{
        try{   
            let {orderNo,orderId} = ctx.request.body;
            if(!orderNo&& !orderId){
                ctx.body={"code":'900',"message":"请输入订单号或订单ID再查询",data:[]}
            }else{
                let orderInfo = await orderDAO.getOrderInfoByOrderNoOrOrderId(orderId,orderNo)
                ctx.body = {"code":"200","message":"订单详情查询成功",data:orderInfo}
            }
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //修改订单
    changeOrder: async(ctx, next) =>{
        try{    
            let {orderId,orderStatus,hasSend} = ctx.request.body
            await orderDAO.updateOrderStatus(orderStatus,orderId,hasSend)
            ctx.body = {"code":200,"message":"订单状态修改成功",data:1}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        
        }
    },

    //删除订单
    deleteOrder: async(ctx,next) =>{
        try{
            let {orderId} = ctx.request.body;
            await orderDAO

        }catch(e){
            
        }
    },
    
}