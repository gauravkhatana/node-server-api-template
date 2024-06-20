const express = require('express')
const router = express.Router();

router.get('/',(req,resp,next)=>{
    resp.status(200).json({
        message : "Student fetched successfully"
    })
})

router.post('/',(req,resp,next)=>{
    resp.status(201).json({
        message : "Student created successfully"
    })
})

router.get('/:orderId',(req,resp,next)=>{
    const orderId = req.params.orderId;
    resp.status(201).json({
        message : `Student with id : ${orderId} fetched successfully`
    })
})

router.put('/:orderId',(req,resp,next)=>{
    const orderId = req.params.orderId;
    resp.status(201).json({
        message : `Student with id : ${orderId} updated successfully`
    })
})

router.delete('/:orderId',(req,resp,next)=>{
    const orderId = req.params.orderId;
    resp.status(201).json({
        message : `Student with id : ${orderId} deleted successfully`
    })
})

module.exports = router