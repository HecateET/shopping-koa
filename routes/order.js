const router = require('koa-router')()
const orderController = require('../controllers/order')
const orderAdminController = require('../controllers/orderAdmin')

router.prefix('/order')

//获取用户订单
router.post("/getOrderByState",async(ctx,next)=>{
    await orderController.getOrderByState(ctx,next)
})

//创建订单
router.post("/createOrder",async(ctx,next)=>{
    await orderController.createOrder(ctx,next)
})

//删除订单
router.post("/deleteOrder",async(ctx,next)=>{
    await orderController.deleteOrder(ctx,next)
})

//用户确认收货，修改订单状态
router.post("/confirmReceived",async(ctx,next)=>{
    await orderController.confirmReceived(ctx,next)
})

//确认付款,修改订单状态
router.post("/pay",async(ctx,next)=>{
    await orderController.pay(ctx,next)
})



module.exports = router
