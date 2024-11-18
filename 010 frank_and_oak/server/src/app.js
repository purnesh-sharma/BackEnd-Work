const express = require('express');
const {
     adminPanelRouter, 
     websiteRouter, 
     appRouter 
    } = require('./routes/routs');

const allRoutes = express.Router();

allRoutes.use('/admin-panel',adminPanelRouter);
allRoutes.use('/websiter',websiteRouter); 
allRoutes.use('/app',appRouter);

module.exports = allRoutes;