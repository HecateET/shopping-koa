/**
 * 购物车操作
 */
const DAO = require("../model/DAO")

class DB {
    //添加至购物车
    addShopCart(productId,userId,cartNum){
        return DAO('INSERT INTO shoppingcart(productId,userId,cartNum) VALUES(?,?,?)',[productId,userId,cartNum])
    }

    //查询用户购物车内容
    getUserShopCartInfo(userId){
        return DAO(`SELECT
                cardId,
                productId,
                userId,
                cartNum,
                isCheck,
                unitCost,
                productType,
                productName,
                productDescribe,
                productPicture 
            FROM
                (
            SELECT
                s.cardId,
                s.productId,
                s.userId,
                s.cartNum,
                s.isCheck,
                p.productType,
                p.productName,
                p.productDescribe,
                p.productPicture,
                p.unitCost 
            FROM
                shoppingcart AS s
                LEFT JOIN product AS p ON s.productId = p.productId 
                ) AS shoppingDes 
            WHERE
                userId = ?`,[userId])
    }

    //修改购物车内商品数量
    setCartGoodsNum(cartNum,cartId){
        return DAO('UPDATE shoppingcart SET cartNum = ? WHERE cardId = ?',[cartNum,cartId])
    }

    //购物车内商品+1
    plusCartNum(cartId){
        return DAO('UPDATE shoppingcart SET cartNum = cartNum+1 WHERE cardId = ?',[cartId])
    }

    //购物车内商品-1
    subCartNum(cartId){
        return DAO('UPDATE shoppingcart SET cartNum = cartNum-1 WHERE cardId = ?',[cartId])
    }

    //修改购物车中的商品选中状态
    updateCheck(cartId){
        return DAO('UPDATE shoppingcart SET isCheck = -isCheck WHERE cardId = ?',[cartId])
    }

    //清空某个用户的购物车
    deleteAllCartByUserId(userId){
        return DAO('DELETE FROM shoppingcart WHERE userId = ?',[userId])
    }

    //删除购物车中的某个商品
    deleteCartByCartId(cartId){
        return DAO('DELETE FROM shoppingcart WHERE cardId = ?',[cartId])
    }
}

module.exports = new DB();