const router = require('koa-router')()
const userAdminController = require('../controllers/userAdmin')
const productAdminController = require('../controllers/productAdmin')
const orderAdminController = require('../controllers/orderAdmin')


router.prefix('/manager')

//管理员登录
router.post("/doLogin",async(ctx,next)=>{
    await userAdminController.login(ctx,next)
})

//查询管理员信息
router.post("/getMangerInfo",async(ctx,next)=>{
    await userAdminController.getMangerInfo(ctx,next)
})

//管理员修改密码
router.post("/updatePwd",async(ctx,next)=>{
    await userAdminController.changePwd(ctx,next)
})

//--用户管理 start --
//管理员查询所有用户
router.post("/getAllUsers",async(ctx,next)=>{
    await userAdminController.getAllUser(ctx,next)
})

//查询指定用户详情
router.post("/searchUser",async(ctx,next)=>{
    await userAdminController.searchUser(ctx,next)
})
//--用户管理 end --

//--商品管理 start --
//新增商品类目
router.post("/addType",async(ctx,next)=>{
    await productAdminController.addType(ctx,next);
})
//查询商品分类
router.post("/getProductTypeList",async(ctx,next)=>{
    await productAdminController.getType(ctx,next)
})

//得到所有商品未分类
router.post("/getGoodsList",async(ctx,next)=>{
    await productAdminController.getGoodsList(ctx,next)
})

//更具商品类型得到商品列表
router.post("/getGoodsListByType",async(ctx,next)=>{
    await productAdminController.getGoodsByType(ctx,next)
})

//查询某个管理员发布的商品列表
router.post("/myPublish",async(ctx,next)=>{
    await productAdminController.getGoodsByManagerId(ctx,next)
})

//得到商品详情，通过商品id
router.post("/getGoodDetails",async(ctx,next)=>{
    await productAdminController.getProductDetails(ctx,next)
})

//增加商品
router.post("/addGoods",async(ctx,next)=>{
    await productAdminController.addGoods(ctx,next)
})

//减少商品一定数量的商品库存
router.post("/deleteSpec",async(ctx,next)=>{
    await productAdminController.deleteSpec(ctx,next)
})

//增加商品一定数量的商品库存
router.post("/addSpec",async(ctx,next)=>{
    await productAdminController.deleteSpec(ctx,next)
})

//更新商品信息
router.post("/updateGoods",async(ctx,next)=>{
    await productAdminController.updateGoods(ctx,next)
})

//删除商品
router.post("/deleteGoods",async(ctx,next)=>{
    await productAdminController.deleteGoods(ctx,next)
})
//--商品管理 end --

//--订单管理 start --
//获取所有订单列表
router.post("/getAllOrdersList",async(ctx,next)=>{
    await orderAdminController.getAllOrders(ctx,next)
})

//获取某一个订单的详情
router.post("/getOneOrder",async(ctx,next)=>{
    await orderAdminController.getOrder(ctx,next)
})

//修改订单
router.post("/changeOrder",async(ctx,next)=>{
    await orderAdminController.changeOrder(ctx,next)
})

//删除订单
router.post("/deleteOrder",async(ctx,next)=>{
    await orderAdminController.deleteOrder(ctx,next)
})
//--订单管理 end --

//-- 用户管理 start --
//查询所有用户列表
router.post("/getAllUserList",async(ctx,next)=>{
    await userAdminController.getAllUser(ctx,next)
})

//根据手机号或用户名来查询用户
router.post("/searchUser",async(ctx,next)=>{
    await userAdminController.searchUser(ctx,next)
})

//-- 用户管理 end --

module.exports = router
