/**
 * 收获地址操作
 */
const DAO = require("../model/DAO")

class DB {
    //新增收获地址
    addAddressByUserId(userId,userName,userPhone,userAddress,isDefualt=-1){
        return DAO('INSERT INTO address(userId,userName,userPhone,userAddress,isDefualt,createTime) VALUES(?,?,?,?,?,NOW())',[userId,userName,userPhone,userAddress,isDefualt])
    }

    //根据用户ID查询所有收货地址
    getAllAddressByUserId(userId){
        return DAO('SELECT addressId,userId,userName,userPhone,userAddress,isDefualt,dateFlag FROM address WHERE userId = ?',[userId])
    }    

    //修改用户收货地址
    updateAddress(name,phone,address,isDefualt,addressId){
        return DAO('UPDATE address SET userName = ?, userPhone = ?, userAddress = ?, isDefualt = ? WHERE addressId = ?',[name,phone,address,isDefualt,addressId])
    }

    //删除某个地址
    deleteAddressById(addressId){
        return DAO('DELETE FROM address WHERE addressId = ?',[addressId])
    }

}

module.exports = new DB();