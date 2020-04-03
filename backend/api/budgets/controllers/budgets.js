const { sanitizeEntity } = require('strapi-utils');
const { omit } = require('lodash')
'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

 const cloneTasks = (tasks) => {
   return Promise.all(tasks.map(async task => {
     const created = await strapi.services.task.create(task);
     return sanitizeEntity(created, { model: strapi.models.task });
   }))
 }

module.exports = {
  async clone(ctx) {
    let entity = await strapi.services.budgets.findOne(ctx.params);
    entity = sanitizeEntity(entity, { model: strapi.models.budgets })
    entity.tasks = await cloneTasks(entity.tasks)
    entity.status = 'initial'
    let created = await strapi.services.budgets.create(entity);
    return sanitizeEntity(created, { model: strapi.models.budgets });
  }
};
