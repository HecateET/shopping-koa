/**
 * 控制层（处理逻辑）
 * 商品处理
 */
const productDAO = require("../model/productDAO");
const shoppingCartDAO = require("../model/shoppingCartDAO")

module.exports = {
    //得到不同种类的商品，按照类型查询
    // getGoodsByType: async(ctx, next) =>{
    //     try{

    //     }catch(e){
            
    //     }
    // },

    //查新商品详情
    // getGoodsInfo: async(ctx, next) =>{
    //     try{

    //     }catch(e){
            
    //     }
    // },

    //搜索商品
    searchProductByKey: async(ctx,next) =>{
        try {
            let {key} = ctx.request.body
            console.log(key)
            let productInfo = await productDAO.searchProductByKey(key)
            console.log(key,productInfo)
            ctx.body = {"code":200,"message":"搜索商品成功",data:productInfo}
        } catch (error) {
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //加入购物车
    addShoppingCarts: async(ctx, next) =>{
        try{
            let {productId,userId,cartNum} = ctx.request.body
            await shoppingCartDAO.addShopCart(productId,userId,cartNum)
            ctx.body = {"code":200,"message":"商品已添加购物车",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //购物车结算
    settleAccounts: async(ctx, next) =>{
        try{
            ctx.body = {"code":200,"message":"商品已添加购物车",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },

    //关键词搜索商品
    searchGoodsBykey: async(ctx, next) =>{
        try{
            ctx.body = {"code":200,"message":"商品已添加购物车",data:[]}
        }catch(e){
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
}