/**
 * 商品信息操作
 */
const DAO = require("../model/DAO")

class DB {
    //添加商品
    addGoods(type,goodName,describe,picture,price,managerId,stock){
        return DAO('INSERT INTO product(productType,productName,productDescribe,productPicture,dateTime,unitCost,author,productStock) VALUES(?,?,?,?,NOW(),?,?,?)',[type,goodName,describe,picture,price,managerId,stock])
    }

    //查询所有商品
    getAllGoods(){
        return DAO('SELECT productId,productType,productName,productDescribe,productPicture,unitCost,author,productStock,dateTime FROM product')
    }

    //查询所有商品信息，及发布者名称
    getAllGoodsManger(){
        return DAO('SELECT author,managerName, productId,productType,productName,productDescribe,productPicture,unitCost,productStock,dateTime FROM product p LEFT JOIN manager m ON p.author=m.managerId')
    }

    //查询某位管理员发布的商品信息
    getGoodsByMangerId(managerId){
        return DAO('SELECT * FROM (SELECT author,managerName, productId,productType,productName,productDescribe,productPicture,unitCost,productStock,dateTime FROM product p LEFT JOIN manager m ON p.author=m.managerId) AS alldate WHERE author = ?',[managerId])
    }

    //根据产品分类查询商品
    getGoodsByType(type){
        return DAO('SELECT author, productId,productType,productName,productDescribe,productPicture,unitCost,productStock,dateTime  FROM product WHERE productType = ?',[type])
    }

    //查询所有商品分类
    getAllGoodsType(){
        return DAO('SELECT DISTINCT productType FROM product')
    }

    //根据商品ID查询商品信息
    getGoodsInfoByID(productId){
        return DAO('SELECT author, productId,productType,productName,productDescribe,productPicture,unitCost,productStock,dateTime FROM product WHERE productId =?',[productId])
    }

    //修改商品价格
    updateCost(productId,unitCost){
        return DAO('UPDATE product SET unitCost = ? WHERE productId = ?',[unitCost,productId])
    }

    //减少商品库存
    subSomeStock(subNum,productId){
        return DAO('UPDATE product SET productStock = productStock - ? WHERE productId = ?',[subNum,productId])
    }

    //增加一定商品库存
    addSomeStock(addNum,productId){
        return DAO('UPDATE product SET productStock = productStock + ? WHERE productId = ?',[addNum,productId])
    }
    //设置外键约束
    setForeginKeyCheck(){
        return DAO('set foreign_key_checks=1')
    }
    setForeginKeyUnCheck(){
        return DAO('set foreign_key_checks=0')
    }

    //修改商品信息
    updateGoodsInfo(productName,productDescribe,productPicture,unitCost,productStock,productId){
        return DAO('UPDATE product SET productName = ?,productDescribe = ?,productPicture = ?,unitCost = ?, productStock = ? WHERE productId= ?',[productName,productDescribe,productPicture,unitCost,productStock,productId])
    }

    //删除某个商品
    deleteGoodsById(productId){
        return DAO('DELETE FROM product WHERE productId = ?',[productId])
    }

    //搜索商品
    searchProductByKey(key){
        return DAO('SELECT productId, productType, productName, productDescribe,productPicture,unitCost,author,productStock from product WHERE productName LIKE "%?%" OR productType LIKE "%?%" OR productDescribe LIKE "%?%"',[key,key,key])
    }

    //得到所有商品类目
    getType(){
        return DAO('SELECT * FROM producttype')
    }

    //查询类目是否存在
    //查询手机号中是否被注册过
    getTypeExist(typeName){
        return DAO('SELECT COUNT(1) sum FROM producttype WHERE typeName = ? ',[typeName])
    }

    //增加类目
    addType(typeName){
        return DAO('INSERT INTO producttype(typeName) VALUES(?)',[typeName])
    }
}

module.exports = new DB();