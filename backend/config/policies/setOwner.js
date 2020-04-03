'use strict';

/**
 * `setOwner` policy.
 */

module.exports = async (ctx, next) => {
  console.log("Set Owner");
  const { id } = ctx.state.user;
  const { body } = ctx.request;

  body.owner = id.toString();

  return await next();
};