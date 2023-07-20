const express = require('express');

const router = express.Router();

// http://localhost:3002/admin3/abcd/efg
router.get('/:p3?/:p4?', (req, res)=>{
    res.json({
        url: req.url,  // router 裡的路徑
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        params: req.params
    });
});

module.exports = router;