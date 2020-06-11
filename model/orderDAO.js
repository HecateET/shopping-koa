/**
 * 订单操作
 */
const DAO = require("../model/DAO")

class DB {
  
    //新建一个订单
    createOrder(orderNo,userId,productId,productName,productNum,orderStatus,addressId){
        return DAO('INSERT INTO orderinfo(orderNo,customerId,productId,productName,productNum,orderStatus,orderDate,addressId) VALUES(?,?,?,?,?,?,NOW(),?)'
            ,[orderNo,userId,productId,productName,productNum,orderStatus,addressId])
    }

    //查询所有订单列表
    getAllOrderList(){
        return DAO(`
        SELECT
            * 
        FROM
            (
        SELECT
            orderId,
            orderNo,
            productId,
            customerId,
            productNum,
            hasSend,
            orderStatus,
            a.addressId,
            a.userName,
            a.userPhone,
            a.userAddress,
            productName,
            productType,
            productDescribe,
            productPicture,
            unitCost 
        FROM
            address AS a
            LEFT JOIN (
        SELECT
            o.orderId,
            o.orderNo,
            o.productId,
            o.customerId,
            o.productNum,
            o.hasSend,
            o.orderStatus,
            o.addressId,
            p.productName,
            p.productType,
            p.productDescribe,
            p.productPicture,
            p.unitCost 
        FROM
            orderinfo AS o
            LEFT JOIN product AS p ON o.productId = p.productId 
            ) AS OD ON a.addressId = OD.addressId 
            ) AS last 
        `)
    }

    //查询用户的订单
    getOrderByUserId(userId){
        return DAO('SELECT orderId,orderNo,productId,addressId,productName,orderStatus,orderDate,hasSend FROM orderinfo WHERE customerId = ?',[userId])
    }

    //根据用户Id，查询用户订单及商品信息+ 配送地址
    getAllOrderInfo(userId){
        return DAO(`
        SELECT
            * 
        FROM
            (
        SELECT
            orderId,
            orderNo,
            productId,
            customerId,
            productNum,
            orderDate,
            hasSend,
            orderStatus,
            a.addressId,
            a.userName,
            a.userPhone,
            a.userAddress,
            productName,
            productType,
            productDescribe,
            productPicture,
            unitCost 
        FROM
            address AS a
            LEFT JOIN (
        SELECT
            o.orderId,
            o.orderNo,
            o.productId,
            o.customerId,
            o.productNum,
            o.hasSend,
            o.orderStatus,
            o.orderDate,
            o.addressId,
            p.productName,
            p.productType,
            p.productDescribe,
            p.productPicture,
            p.unitCost 
        FROM
            orderinfo AS o
            LEFT JOIN product AS p ON o.productId = p.productId 
            ) AS OD ON a.addressId = OD.addressId 
            ) AS last 
        WHERE
            customerId = ?`
        ,[userId])
    }

    //根据订单号，或订单Id查询
    //根据用户Id，查询用户订单及商品信息+ 配送地址
    getOrderInfoByOrderNoOrOrderId(orderId,orderNo){
        return DAO(`
            SELECT
                * 
            FROM
                (
            SELECT
                orderId,
                productId,
                customerId,
                orderNo,
                orderDate,
                productNum,
                hasSend,
                orderStatus,
                a.addressId,
                a.userName,
                a.userPhone,
                a.userAddress,
                productName,
                productType,
                productDescribe,
                productPicture,
                unitCost 
            FROM
                address AS a
                LEFT JOIN (
            SELECT
                o.orderId,
                o.productId,
                o.customerId,
                o.orderNo,
                o.productNum,
                o.hasSend,
                o.orderDate,
                o.orderStatus,
                o.addressId,
                p.productName,
                p.productType,
                p.productDescribe,
                p.productPicture,
                p.unitCost 
            FROM
                orderinfo AS o
                LEFT JOIN product AS p ON o.productId = p.productId 
                ) AS OD ON a.addressId = OD.addressId 
                ) AS last 
            WHERE
                orderNo = ? OR orderId =?` 
        ,[orderNo,orderId])
    }

    //根据订单号查询订单Id
    getOrderIdByOrderNo(orderNo){
        return DAO('SELECT orderId FROM orderinfo WHERE orderNo = ?;',[orderNo])
    }
    //修改订单状态，
    updateOrderStatus(orderStatus,orderId,hasSend = 0){
        return DAO('UPDATE orderinfo SET orderStatus = ? WHERE orderId = ?',[orderStatus,orderId])
    }
    
}

module.exports = new DB();