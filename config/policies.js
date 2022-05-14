/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  PersonController: {
    create: 'isAdmin',
    adminPage : 'isAdmin',
    admin : 'isAdmin',
    search : 'isAdmin',
    event : 'isAdmin',
    delete : 'isAdmin',
    update : 'isAdmin',
    populate : 'isAdmin',

    studentPage : 'isStudent',
    studentSearch : 'isStudent',
    studentEvent : 'isStudent',
  },

  UserController: {
    add : 'isStudent',
    remove : 'isStudent',
    populate :'isStudent'
  }



};
