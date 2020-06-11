const router = require('koa-router')()
const productController = require('../controllers/product')
const productAdminController = require('../controllers/productAdmin')

router.prefix('/product')

//查询商品分类
router.post("/getProductTypeList",async(ctx,next)=>{
    await productAdminController.getType(ctx,next)
})

//查询商品，根据类型分类查询商品list
router.post("/getGoodsListByType",async(ctx,next)=>{
    await productAdminController.getGoodsByType(ctx,next)
})

//根据商品Id 查询商品详情
router.post("/getGoodsInfo",async(ctx,next)=>{
    await productAdminController.getProductDetails(ctx,next)
})

//根据关键词搜索商品
router.post("/searchProductByKey",async(ctx,next)=>{
    await productController.searchPsearchProductByKeyroductByKey(ctx,next);
})

//加入购物车
router.post("/addShoppingCarts",async(ctx,next)=>{
    await productController.addShoppingCarts(ctx,next)
})

//购物车结算
router.post("/settleAccounts",async(ctx,next)=>{
    await productController.settleAccounts(ctx,next)
})

//关键词搜索商品
router.post("/searchGoodsBykey",async(ctx,next)=>{
    await productController.searchGoodsBykey(ctx,next)
})



module.exports = router
