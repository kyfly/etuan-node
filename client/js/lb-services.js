(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.OrganizationUser
 * @header lbServices.OrganizationUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `OrganizationUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "OrganizationUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/OrganizationUsers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__findById__accessTokens
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/OrganizationUsers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__destroyById__accessTokens
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/OrganizationUsers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__updateById__accessTokens
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/OrganizationUsers/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use OrganizationUser.forms.findById() instead.
        "prototype$__findById__forms": {
          url: urlBase + "/OrganizationUsers/:id/forms/:fk",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.forms.destroyById() instead.
        "prototype$__destroyById__forms": {
          url: urlBase + "/OrganizationUsers/:id/forms/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.forms.updateById() instead.
        "prototype$__updateById__forms": {
          url: urlBase + "/OrganizationUsers/:id/forms/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__findById__departments
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Find a related item by id for departments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for departments
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$__findById__departments": {
          url: urlBase + "/OrganizationUsers/:id/departments/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__destroyById__departments
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Delete a related item by id for departments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for departments
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__departments": {
          url: urlBase + "/OrganizationUsers/:id/departments/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__updateById__departments
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Update a related item by id for departments.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for departments
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$__updateById__departments": {
          url: urlBase + "/OrganizationUsers/:id/departments/:fk",
          method: "PUT"
        },

        // INTERNAL. Use OrganizationUser.votes.findById() instead.
        "prototype$__findById__votes": {
          url: urlBase + "/OrganizationUsers/:id/votes/:fk",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.votes.destroyById() instead.
        "prototype$__destroyById__votes": {
          url: urlBase + "/OrganizationUsers/:id/votes/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.votes.updateById() instead.
        "prototype$__updateById__votes": {
          url: urlBase + "/OrganizationUsers/:id/votes/:fk",
          method: "PUT"
        },

        // INTERNAL. Use OrganizationUser.seckills.findById() instead.
        "prototype$__findById__seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills/:fk",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.seckills.destroyById() instead.
        "prototype$__destroyById__seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.seckills.updateById() instead.
        "prototype$__updateById__seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills/:fk",
          method: "PUT"
        },

        // INTERNAL. Use OrganizationUser.activities.findById() instead.
        "prototype$__findById__activities": {
          url: urlBase + "/OrganizationUsers/:id/activities/:fk",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.activities.destroyById() instead.
        "prototype$__destroyById__activities": {
          url: urlBase + "/OrganizationUsers/:id/activities/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.activities.updateById() instead.
        "prototype$__updateById__activities": {
          url: urlBase + "/OrganizationUsers/:id/activities/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__get__accessTokens
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Queries accessTokens of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__create__accessTokens
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/OrganizationUsers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__delete__accessTokens
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/OrganizationUsers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__count__accessTokens
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Counts accessTokens of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/OrganizationUsers/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.forms() instead.
        "prototype$__get__forms": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/forms",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.forms.create() instead.
        "prototype$__create__forms": {
          url: urlBase + "/OrganizationUsers/:id/forms",
          method: "POST"
        },

        // INTERNAL. Use OrganizationUser.forms.destroyAll() instead.
        "prototype$__delete__forms": {
          url: urlBase + "/OrganizationUsers/:id/forms",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.forms.count() instead.
        "prototype$__count__forms": {
          url: urlBase + "/OrganizationUsers/:id/forms/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__get__departments
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Queries departments of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$__get__departments": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/departments",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__create__departments
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Creates a new instance in departments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$__create__departments": {
          url: urlBase + "/OrganizationUsers/:id/departments",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__delete__departments
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Deletes all departments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__departments": {
          url: urlBase + "/OrganizationUsers/:id/departments",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$__count__departments
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Counts departments of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__departments": {
          url: urlBase + "/OrganizationUsers/:id/departments/count",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.votes() instead.
        "prototype$__get__votes": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/votes",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.votes.create() instead.
        "prototype$__create__votes": {
          url: urlBase + "/OrganizationUsers/:id/votes",
          method: "POST"
        },

        // INTERNAL. Use OrganizationUser.votes.destroyAll() instead.
        "prototype$__delete__votes": {
          url: urlBase + "/OrganizationUsers/:id/votes",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.votes.count() instead.
        "prototype$__count__votes": {
          url: urlBase + "/OrganizationUsers/:id/votes/count",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.seckills() instead.
        "prototype$__get__seckills": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/seckills",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.seckills.create() instead.
        "prototype$__create__seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills",
          method: "POST"
        },

        // INTERNAL. Use OrganizationUser.seckills.destroyAll() instead.
        "prototype$__delete__seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.seckills.count() instead.
        "prototype$__count__seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills/count",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.activities() instead.
        "prototype$__get__activities": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/activities",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.activities.create() instead.
        "prototype$__create__activities": {
          url: urlBase + "/OrganizationUsers/:id/activities",
          method: "POST"
        },

        // INTERNAL. Use OrganizationUser.activities.destroyAll() instead.
        "prototype$__delete__activities": {
          url: urlBase + "/OrganizationUsers/:id/activities",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.activities.count() instead.
        "prototype$__count__activities": {
          url: urlBase + "/OrganizationUsers/:id/activities/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#create
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/OrganizationUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#upsert
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/OrganizationUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#exists
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/OrganizationUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#findById
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/OrganizationUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#find
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/OrganizationUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#findOne
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/OrganizationUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#updateAll
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/OrganizationUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#deleteById
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/OrganizationUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#count
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/OrganizationUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#prototype$updateAttributes
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/OrganizationUsers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#login
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/OrganizationUsers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#logout
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/OrganizationUsers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#confirm
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/OrganizationUsers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#resetPassword
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/OrganizationUsers/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#getactivities
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `list` – `{object=}` - 
         */
        "getactivities": {
          url: urlBase + "/OrganizationUsers/:id/getactivities",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#confirmCode
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `email` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `code` – `{string=}` - 
         */
        "confirmCode": {
          url: urlBase + "/OrganizationUsers/confirmcode",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#getvotes
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `list` – `{object=}` - 
         */
        "getvotes": {
          url: urlBase + "/OrganizationUsers/:id/getvotes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#getforms
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `list` – `{object=}` - 
         */
        "getforms": {
          url: urlBase + "/OrganizationUsers/:id/getforms",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#getseckills
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `list` – `{object=}` - 
         */
        "getseckills": {
          url: urlBase + "/OrganizationUsers/:id/getseckills",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#actCount
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `access_token` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `actCount` – `{string=}` - 
         */
        "actCount": {
          url: urlBase + "/OrganizationUsers/actCount",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#viewCount
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `access_token` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `viewCount` – `{string=}` - 
         */
        "viewCount": {
          url: urlBase + "/OrganizationUsers/viewCount",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#parCount
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `access_token` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `parCount` – `{string=}` - 
         */
        "parCount": {
          url: urlBase + "/OrganizationUsers/parCount",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#list
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `orgs` – `{string=}` - 
         */
        "list": {
          url: urlBase + "/OrganizationUsers/list",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#detail
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `org` – `{string=}` - 
         */
        "detail": {
          url: urlBase + "/OrganizationUsers/detail/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#emailExist
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `email` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exist` – `{boolean=}` - 
         */
        "emailExist": {
          url: urlBase + "/OrganizationUsers/email/exist",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#nameExist
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `name` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exist` – `{boolean=}` - 
         */
        "nameExist": {
          url: urlBase + "/OrganizationUsers/name/exist",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#resetpwd
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `email` – `{string=}` - 
         *
         *  - `oldpwd` – `{string=}` - 
         *
         *  - `newpwd` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `status` – `{string=}` - 
         */
        "resetpwd": {
          url: urlBase + "/OrganizationUsers/resetpwd",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#rePwd
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `email` – `{string=}` - 
         *
         *  - `newpwd` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `status` – `{string=}` - 
         */
        "rePwd": {
          url: urlBase + "/OrganizationUsers/rePwd",
          method: "POST"
        },

        // INTERNAL. Use Form.organization() instead.
        "::get::Form::organization": {
          url: urlBase + "/Forms/:id/organization",
          method: "GET"
        },

        // INTERNAL. Use Vote.organization() instead.
        "::get::Vote::organization": {
          url: urlBase + "/Votes/:id/organization",
          method: "GET"
        },

        // INTERNAL. Use Seckill.organization() instead.
        "::get::Seckill::organization": {
          url: urlBase + "/Seckills/:id/organization",
          method: "GET"
        },

        // INTERNAL. Use Activity.organization() instead.
        "::get::Activity::organization": {
          url: urlBase + "/Activities/:id/organization",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#getCurrent
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/OrganizationUsers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#updateOrCreate
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#update
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#destroyById
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#removeById
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#getCachedCurrent
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.OrganizationUser#login} or
         * {@link lbServices.OrganizationUser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A OrganizationUser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#isAuthenticated
         * @methodOf lbServices.OrganizationUser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#getCurrentId
         * @methodOf lbServices.OrganizationUser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.OrganizationUser#modelName
    * @propertyOf lbServices.OrganizationUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `OrganizationUser`.
    */
    R.modelName = "OrganizationUser";

    /**
     * @ngdoc object
     * @name lbServices.OrganizationUser.forms
     * @header lbServices.OrganizationUser.forms
     * @object
     * @description
     *
     * The object `OrganizationUser.forms` groups methods
     * manipulating `Form` instances related to `OrganizationUser`.
     *
     * Call {@link lbServices.OrganizationUser#forms OrganizationUser.forms()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#forms
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Queries forms of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        R.forms = function() {
          var TargetResource = $injector.get("Form");
          var action = TargetResource["::get::OrganizationUser::forms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.forms#count
         * @methodOf lbServices.OrganizationUser.forms
         *
         * @description
         *
         * Counts forms of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.forms.count = function() {
          var TargetResource = $injector.get("Form");
          var action = TargetResource["::count::OrganizationUser::forms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.forms#create
         * @methodOf lbServices.OrganizationUser.forms
         *
         * @description
         *
         * Creates a new instance in forms of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        R.forms.create = function() {
          var TargetResource = $injector.get("Form");
          var action = TargetResource["::create::OrganizationUser::forms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.forms#destroyAll
         * @methodOf lbServices.OrganizationUser.forms
         *
         * @description
         *
         * Deletes all forms of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.forms.destroyAll = function() {
          var TargetResource = $injector.get("Form");
          var action = TargetResource["::delete::OrganizationUser::forms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.forms#destroyById
         * @methodOf lbServices.OrganizationUser.forms
         *
         * @description
         *
         * Delete a related item by id for forms.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for forms
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.forms.destroyById = function() {
          var TargetResource = $injector.get("Form");
          var action = TargetResource["::destroyById::OrganizationUser::forms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.forms#findById
         * @methodOf lbServices.OrganizationUser.forms
         *
         * @description
         *
         * Find a related item by id for forms.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for forms
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        R.forms.findById = function() {
          var TargetResource = $injector.get("Form");
          var action = TargetResource["::findById::OrganizationUser::forms"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.forms#updateById
         * @methodOf lbServices.OrganizationUser.forms
         *
         * @description
         *
         * Update a related item by id for forms.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for forms
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        R.forms.updateById = function() {
          var TargetResource = $injector.get("Form");
          var action = TargetResource["::updateById::OrganizationUser::forms"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.OrganizationUser.votes
     * @header lbServices.OrganizationUser.votes
     * @object
     * @description
     *
     * The object `OrganizationUser.votes` groups methods
     * manipulating `Vote` instances related to `OrganizationUser`.
     *
     * Call {@link lbServices.OrganizationUser#votes OrganizationUser.votes()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#votes
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Queries votes of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        R.votes = function() {
          var TargetResource = $injector.get("Vote");
          var action = TargetResource["::get::OrganizationUser::votes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.votes#count
         * @methodOf lbServices.OrganizationUser.votes
         *
         * @description
         *
         * Counts votes of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.votes.count = function() {
          var TargetResource = $injector.get("Vote");
          var action = TargetResource["::count::OrganizationUser::votes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.votes#create
         * @methodOf lbServices.OrganizationUser.votes
         *
         * @description
         *
         * Creates a new instance in votes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        R.votes.create = function() {
          var TargetResource = $injector.get("Vote");
          var action = TargetResource["::create::OrganizationUser::votes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.votes#destroyAll
         * @methodOf lbServices.OrganizationUser.votes
         *
         * @description
         *
         * Deletes all votes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.votes.destroyAll = function() {
          var TargetResource = $injector.get("Vote");
          var action = TargetResource["::delete::OrganizationUser::votes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.votes#destroyById
         * @methodOf lbServices.OrganizationUser.votes
         *
         * @description
         *
         * Delete a related item by id for votes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for votes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.votes.destroyById = function() {
          var TargetResource = $injector.get("Vote");
          var action = TargetResource["::destroyById::OrganizationUser::votes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.votes#findById
         * @methodOf lbServices.OrganizationUser.votes
         *
         * @description
         *
         * Find a related item by id for votes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for votes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        R.votes.findById = function() {
          var TargetResource = $injector.get("Vote");
          var action = TargetResource["::findById::OrganizationUser::votes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.votes#updateById
         * @methodOf lbServices.OrganizationUser.votes
         *
         * @description
         *
         * Update a related item by id for votes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for votes
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        R.votes.updateById = function() {
          var TargetResource = $injector.get("Vote");
          var action = TargetResource["::updateById::OrganizationUser::votes"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.OrganizationUser.seckills
     * @header lbServices.OrganizationUser.seckills
     * @object
     * @description
     *
     * The object `OrganizationUser.seckills` groups methods
     * manipulating `Seckill` instances related to `OrganizationUser`.
     *
     * Call {@link lbServices.OrganizationUser#seckills OrganizationUser.seckills()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#seckills
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Queries seckills of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        R.seckills = function() {
          var TargetResource = $injector.get("Seckill");
          var action = TargetResource["::get::OrganizationUser::seckills"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.seckills#count
         * @methodOf lbServices.OrganizationUser.seckills
         *
         * @description
         *
         * Counts seckills of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.seckills.count = function() {
          var TargetResource = $injector.get("Seckill");
          var action = TargetResource["::count::OrganizationUser::seckills"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.seckills#create
         * @methodOf lbServices.OrganizationUser.seckills
         *
         * @description
         *
         * Creates a new instance in seckills of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        R.seckills.create = function() {
          var TargetResource = $injector.get("Seckill");
          var action = TargetResource["::create::OrganizationUser::seckills"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.seckills#destroyAll
         * @methodOf lbServices.OrganizationUser.seckills
         *
         * @description
         *
         * Deletes all seckills of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.seckills.destroyAll = function() {
          var TargetResource = $injector.get("Seckill");
          var action = TargetResource["::delete::OrganizationUser::seckills"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.seckills#destroyById
         * @methodOf lbServices.OrganizationUser.seckills
         *
         * @description
         *
         * Delete a related item by id for seckills.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for seckills
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.seckills.destroyById = function() {
          var TargetResource = $injector.get("Seckill");
          var action = TargetResource["::destroyById::OrganizationUser::seckills"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.seckills#findById
         * @methodOf lbServices.OrganizationUser.seckills
         *
         * @description
         *
         * Find a related item by id for seckills.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for seckills
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        R.seckills.findById = function() {
          var TargetResource = $injector.get("Seckill");
          var action = TargetResource["::findById::OrganizationUser::seckills"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.seckills#updateById
         * @methodOf lbServices.OrganizationUser.seckills
         *
         * @description
         *
         * Update a related item by id for seckills.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for seckills
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        R.seckills.updateById = function() {
          var TargetResource = $injector.get("Seckill");
          var action = TargetResource["::updateById::OrganizationUser::seckills"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.OrganizationUser.activities
     * @header lbServices.OrganizationUser.activities
     * @object
     * @description
     *
     * The object `OrganizationUser.activities` groups methods
     * manipulating `Activity` instances related to `OrganizationUser`.
     *
     * Call {@link lbServices.OrganizationUser#activities OrganizationUser.activities()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser#activities
         * @methodOf lbServices.OrganizationUser
         *
         * @description
         *
         * Queries activities of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        R.activities = function() {
          var TargetResource = $injector.get("Activity");
          var action = TargetResource["::get::OrganizationUser::activities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.activities#count
         * @methodOf lbServices.OrganizationUser.activities
         *
         * @description
         *
         * Counts activities of OrganizationUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.activities.count = function() {
          var TargetResource = $injector.get("Activity");
          var action = TargetResource["::count::OrganizationUser::activities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.activities#create
         * @methodOf lbServices.OrganizationUser.activities
         *
         * @description
         *
         * Creates a new instance in activities of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        R.activities.create = function() {
          var TargetResource = $injector.get("Activity");
          var action = TargetResource["::create::OrganizationUser::activities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.activities#destroyAll
         * @methodOf lbServices.OrganizationUser.activities
         *
         * @description
         *
         * Deletes all activities of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.activities.destroyAll = function() {
          var TargetResource = $injector.get("Activity");
          var action = TargetResource["::delete::OrganizationUser::activities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.activities#destroyById
         * @methodOf lbServices.OrganizationUser.activities
         *
         * @description
         *
         * Delete a related item by id for activities.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for activities
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.activities.destroyById = function() {
          var TargetResource = $injector.get("Activity");
          var action = TargetResource["::destroyById::OrganizationUser::activities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.activities#findById
         * @methodOf lbServices.OrganizationUser.activities
         *
         * @description
         *
         * Find a related item by id for activities.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for activities
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        R.activities.findById = function() {
          var TargetResource = $injector.get("Activity");
          var action = TargetResource["::findById::OrganizationUser::activities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.OrganizationUser.activities#updateById
         * @methodOf lbServices.OrganizationUser.activities
         *
         * @description
         *
         * Update a related item by id for activities.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for activities
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        R.activities.updateById = function() {
          var TargetResource = $injector.get("Activity");
          var action = TargetResource["::updateById::OrganizationUser::activities"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.WeChatUser
 * @header lbServices.WeChatUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `WeChatUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "WeChatUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/WeChatUsers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__findById__accessTokens
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/WeChatUsers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__destroyById__accessTokens
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/WeChatUsers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__updateById__accessTokens
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/WeChatUsers/:id/accessTokens/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__findById__formResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Find a related item by id for formResults.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for formResults
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__findById__formResults": {
          url: urlBase + "/WeChatUsers/:id/formResults/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__destroyById__formResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Delete a related item by id for formResults.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for formResults
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__formResults": {
          url: urlBase + "/WeChatUsers/:id/formResults/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__updateById__formResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update a related item by id for formResults.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for formResults
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__updateById__formResults": {
          url: urlBase + "/WeChatUsers/:id/formResults/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__findById__histories
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Find a related item by id for histories.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for histories
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__findById__histories": {
          url: urlBase + "/WeChatUsers/:id/histories/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__destroyById__histories
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Delete a related item by id for histories.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for histories
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__histories": {
          url: urlBase + "/WeChatUsers/:id/histories/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__updateById__histories
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update a related item by id for histories.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for histories
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__updateById__histories": {
          url: urlBase + "/WeChatUsers/:id/histories/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__findById__voteResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Find a related item by id for voteResults.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for voteResults
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__findById__voteResults": {
          url: urlBase + "/WeChatUsers/:id/voteResults/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__destroyById__voteResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Delete a related item by id for voteResults.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for voteResults
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__voteResults": {
          url: urlBase + "/WeChatUsers/:id/voteResults/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__updateById__voteResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update a related item by id for voteResults.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for voteResults
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__updateById__voteResults": {
          url: urlBase + "/WeChatUsers/:id/voteResults/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__get__accessTokens
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Queries accessTokens of WeChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/WeChatUsers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__create__accessTokens
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/WeChatUsers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__delete__accessTokens
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/WeChatUsers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__count__accessTokens
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Counts accessTokens of WeChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/WeChatUsers/:id/accessTokens/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__get__formResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Queries formResults of WeChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__get__formResults": {
          isArray: true,
          url: urlBase + "/WeChatUsers/:id/formResults",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__create__formResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Creates a new instance in formResults of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__create__formResults": {
          url: urlBase + "/WeChatUsers/:id/formResults",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__delete__formResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Deletes all formResults of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__formResults": {
          url: urlBase + "/WeChatUsers/:id/formResults",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__count__formResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Counts formResults of WeChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__formResults": {
          url: urlBase + "/WeChatUsers/:id/formResults/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__get__histories
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Queries histories of WeChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__get__histories": {
          isArray: true,
          url: urlBase + "/WeChatUsers/:id/histories",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__create__histories
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Creates a new instance in histories of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__create__histories": {
          url: urlBase + "/WeChatUsers/:id/histories",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__delete__histories
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Deletes all histories of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__histories": {
          url: urlBase + "/WeChatUsers/:id/histories",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__count__histories
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Counts histories of WeChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__histories": {
          url: urlBase + "/WeChatUsers/:id/histories/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__get__voteResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Queries voteResults of WeChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__get__voteResults": {
          isArray: true,
          url: urlBase + "/WeChatUsers/:id/voteResults",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__create__voteResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Creates a new instance in voteResults of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$__create__voteResults": {
          url: urlBase + "/WeChatUsers/:id/voteResults",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__delete__voteResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Deletes all voteResults of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__voteResults": {
          url: urlBase + "/WeChatUsers/:id/voteResults",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$__count__voteResults
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Counts voteResults of WeChatUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__voteResults": {
          url: urlBase + "/WeChatUsers/:id/voteResults/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#create
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/WeChatUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#upsert
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/WeChatUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#exists
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/WeChatUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#findById
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/WeChatUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#find
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/WeChatUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#findOne
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/WeChatUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#updateAll
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/WeChatUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#deleteById
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/WeChatUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#count
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/WeChatUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#prototype$updateAttributes
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/WeChatUsers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#login
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/WeChatUsers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#logout
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/WeChatUsers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#confirm
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/WeChatUsers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#resetPassword
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/WeChatUsers/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#fromPC
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * 获取微信登录链接,返回{state:state,url:url}
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{object=}` - 
         */
        "fromPC": {
          url: urlBase + "/WeChatUsers/fromPC",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#fromWechat
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "fromWechat": {
          url: urlBase + "/WeChatUsers/fromWechat",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#oauth
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `code` – `{string=}` - 
         *
         *  - `state` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "oauth": {
          url: urlBase + "/WeChatUsers/oauth",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#phoneoauth
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `code` – `{string=}` - 
         *
         *  - `state` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "phoneoauth": {
          url: urlBase + "/WeChatUsers/phoneoauth",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#confirm
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * 微信登录验证,手机,PC端都用这个接口验证
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `state` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/WeChatUsers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#getCurrent
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/WeChatUsers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#updateOrCreate
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `WeChatUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#update
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#destroyById
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#removeById
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#getCachedCurrent
         * @methodOf lbServices.WeChatUser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.WeChatUser#login} or
         * {@link lbServices.WeChatUser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A WeChatUser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#isAuthenticated
         * @methodOf lbServices.WeChatUser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.WeChatUser#getCurrentId
         * @methodOf lbServices.WeChatUser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.WeChatUser#modelName
    * @propertyOf lbServices.WeChatUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `WeChatUser`.
    */
    R.modelName = "WeChatUser";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Form
 * @header lbServices.Form
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Form` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Form",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Forms/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Form.organization() instead.
        "prototype$__get__organization": {
          url: urlBase + "/Forms/:id/organization",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__findById__results
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Find a related item by id for results.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for results
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$__findById__results": {
          url: urlBase + "/Forms/:id/results/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__destroyById__results
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Delete a related item by id for results.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for results
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__results": {
          url: urlBase + "/Forms/:id/results/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__updateById__results
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Update a related item by id for results.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for results
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$__updateById__results": {
          url: urlBase + "/Forms/:id/results/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__findById__questions
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Find a related item by id for questions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$__findById__questions": {
          url: urlBase + "/Forms/:id/questions/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__destroyById__questions
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Delete a related item by id for questions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__questions": {
          url: urlBase + "/Forms/:id/questions/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__updateById__questions
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Update a related item by id for questions.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for questions
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$__updateById__questions": {
          url: urlBase + "/Forms/:id/questions/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__get__results
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Queries results of Form.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$__get__results": {
          isArray: true,
          url: urlBase + "/Forms/:id/results",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__create__results
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Creates a new instance in results of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$__create__results": {
          url: urlBase + "/Forms/:id/results",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__delete__results
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Deletes all results of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__results": {
          url: urlBase + "/Forms/:id/results",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__count__results
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Counts results of Form.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__results": {
          url: urlBase + "/Forms/:id/results/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__get__questions
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Queries questions of Form.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$__get__questions": {
          isArray: true,
          url: urlBase + "/Forms/:id/questions",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__create__questions
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Creates a new instance in questions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$__create__questions": {
          url: urlBase + "/Forms/:id/questions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__delete__questions
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Deletes all questions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__questions": {
          url: urlBase + "/Forms/:id/questions",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$__count__questions
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Counts questions of Form.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__questions": {
          url: urlBase + "/Forms/:id/questions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#create
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Forms",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#upsert
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Forms",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#exists
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Forms/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#findById
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Forms/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#find
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Forms",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#findOne
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Forms/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#updateAll
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Forms/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#deleteById
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Forms/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#count
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Forms/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#prototype$updateAttributes
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Forms/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#view
         * @methodOf lbServices.Form
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "view": {
          url: urlBase + "/Forms/view/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#pdf
         * @methodOf lbServices.Form
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "pdf": {
          url: urlBase + "/Forms/pdf/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Form#excel
         * @methodOf lbServices.Form
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "excel": {
          url: urlBase + "/Forms/excel/:id",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.forms.findById() instead.
        "::findById::OrganizationUser::forms": {
          url: urlBase + "/OrganizationUsers/:id/forms/:fk",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.forms.destroyById() instead.
        "::destroyById::OrganizationUser::forms": {
          url: urlBase + "/OrganizationUsers/:id/forms/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.forms.updateById() instead.
        "::updateById::OrganizationUser::forms": {
          url: urlBase + "/OrganizationUsers/:id/forms/:fk",
          method: "PUT"
        },

        // INTERNAL. Use OrganizationUser.forms() instead.
        "::get::OrganizationUser::forms": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/forms",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.forms.create() instead.
        "::create::OrganizationUser::forms": {
          url: urlBase + "/OrganizationUsers/:id/forms",
          method: "POST"
        },

        // INTERNAL. Use OrganizationUser.forms.destroyAll() instead.
        "::delete::OrganizationUser::forms": {
          url: urlBase + "/OrganizationUsers/:id/forms",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.forms.count() instead.
        "::count::OrganizationUser::forms": {
          url: urlBase + "/OrganizationUsers/:id/forms/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Form#updateOrCreate
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Form` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Form#update
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Form#destroyById
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Form#removeById
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Form#modelName
    * @propertyOf lbServices.Form
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Form`.
    */
    R.modelName = "Form";


        /**
         * @ngdoc method
         * @name lbServices.Form#organization
         * @methodOf lbServices.Form
         *
         * @description
         *
         * Fetches belongsTo relation organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        R.organization = function() {
          var TargetResource = $injector.get("OrganizationUser");
          var action = TargetResource["::get::Form::organization"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Vote
 * @header lbServices.Vote
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Vote` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Vote",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Votes/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Vote.organization() instead.
        "prototype$__get__organization": {
          url: urlBase + "/Votes/:id/organization",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#prototype$__findById__subitems
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Find a related item by id for subitems.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for subitems
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "prototype$__findById__subitems": {
          url: urlBase + "/Votes/:id/subitems/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#prototype$__destroyById__subitems
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Delete a related item by id for subitems.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for subitems
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__subitems": {
          url: urlBase + "/Votes/:id/subitems/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#prototype$__updateById__subitems
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Update a related item by id for subitems.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for subitems
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "prototype$__updateById__subitems": {
          url: urlBase + "/Votes/:id/subitems/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#prototype$__get__subitems
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Queries subitems of Vote.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "prototype$__get__subitems": {
          isArray: true,
          url: urlBase + "/Votes/:id/subitems",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#prototype$__create__subitems
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Creates a new instance in subitems of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "prototype$__create__subitems": {
          url: urlBase + "/Votes/:id/subitems",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#prototype$__delete__subitems
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Deletes all subitems of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__subitems": {
          url: urlBase + "/Votes/:id/subitems",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#prototype$__count__subitems
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Counts subitems of Vote.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__subitems": {
          url: urlBase + "/Votes/:id/subitems/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#create
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Votes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#upsert
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Votes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#exists
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Votes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#findById
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Votes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#find
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Votes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#findOne
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Votes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#updateAll
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Votes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#deleteById
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Votes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#count
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Votes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#prototype$updateAttributes
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Votes/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Vote#view
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "view": {
          url: urlBase + "/Votes/view/:id",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.votes.findById() instead.
        "::findById::OrganizationUser::votes": {
          url: urlBase + "/OrganizationUsers/:id/votes/:fk",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.votes.destroyById() instead.
        "::destroyById::OrganizationUser::votes": {
          url: urlBase + "/OrganizationUsers/:id/votes/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.votes.updateById() instead.
        "::updateById::OrganizationUser::votes": {
          url: urlBase + "/OrganizationUsers/:id/votes/:fk",
          method: "PUT"
        },

        // INTERNAL. Use OrganizationUser.votes() instead.
        "::get::OrganizationUser::votes": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/votes",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.votes.create() instead.
        "::create::OrganizationUser::votes": {
          url: urlBase + "/OrganizationUsers/:id/votes",
          method: "POST"
        },

        // INTERNAL. Use OrganizationUser.votes.destroyAll() instead.
        "::delete::OrganizationUser::votes": {
          url: urlBase + "/OrganizationUsers/:id/votes",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.votes.count() instead.
        "::count::OrganizationUser::votes": {
          url: urlBase + "/OrganizationUsers/:id/votes/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Vote#updateOrCreate
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vote` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Vote#update
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Vote#destroyById
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Vote#removeById
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Vote#modelName
    * @propertyOf lbServices.Vote
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Vote`.
    */
    R.modelName = "Vote";


        /**
         * @ngdoc method
         * @name lbServices.Vote#organization
         * @methodOf lbServices.Vote
         *
         * @description
         *
         * Fetches belongsTo relation organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        R.organization = function() {
          var TargetResource = $injector.get("OrganizationUser");
          var action = TargetResource["::get::Vote::organization"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Seckill
 * @header lbServices.Seckill
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Seckill` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Seckill",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Seckills/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Seckill.organization() instead.
        "prototype$__get__organization": {
          url: urlBase + "/Seckills/:id/organization",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__findById__arrangements
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Find a related item by id for arrangements.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for arrangements
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$__findById__arrangements": {
          url: urlBase + "/Seckills/:id/arrangements/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__destroyById__arrangements
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Delete a related item by id for arrangements.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for arrangements
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__arrangements": {
          url: urlBase + "/Seckills/:id/arrangements/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__updateById__arrangements
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Update a related item by id for arrangements.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for arrangements
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$__updateById__arrangements": {
          url: urlBase + "/Seckills/:id/arrangements/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__findById__results
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Find a related item by id for results.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for results
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$__findById__results": {
          url: urlBase + "/Seckills/:id/results/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__destroyById__results
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Delete a related item by id for results.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for results
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__results": {
          url: urlBase + "/Seckills/:id/results/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__updateById__results
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Update a related item by id for results.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `fk` – `{*}` - Foreign key for results
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$__updateById__results": {
          url: urlBase + "/Seckills/:id/results/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__get__arrangements
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Queries arrangements of Seckill.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$__get__arrangements": {
          isArray: true,
          url: urlBase + "/Seckills/:id/arrangements",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__create__arrangements
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Creates a new instance in arrangements of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$__create__arrangements": {
          url: urlBase + "/Seckills/:id/arrangements",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__delete__arrangements
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Deletes all arrangements of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__arrangements": {
          url: urlBase + "/Seckills/:id/arrangements",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__count__arrangements
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Counts arrangements of Seckill.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__arrangements": {
          url: urlBase + "/Seckills/:id/arrangements/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__get__results
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Queries results of Seckill.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$__get__results": {
          isArray: true,
          url: urlBase + "/Seckills/:id/results",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__create__results
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Creates a new instance in results of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$__create__results": {
          url: urlBase + "/Seckills/:id/results",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__delete__results
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Deletes all results of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__results": {
          url: urlBase + "/Seckills/:id/results",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$__count__results
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Counts results of Seckill.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__results": {
          url: urlBase + "/Seckills/:id/results/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#create
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Seckills",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#upsert
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Seckills",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#exists
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Seckills/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#findById
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Seckills/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#find
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Seckills",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#findOne
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Seckills/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#updateAll
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Seckills/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#deleteById
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Seckills/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#count
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Seckills/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#prototype$updateAttributes
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Seckills/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#view
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "view": {
          url: urlBase + "/Seckills/view/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Seckill#rest
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "rest": {
          url: urlBase + "/Seckills/rest/:id",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.seckills.findById() instead.
        "::findById::OrganizationUser::seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills/:fk",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.seckills.destroyById() instead.
        "::destroyById::OrganizationUser::seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.seckills.updateById() instead.
        "::updateById::OrganizationUser::seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills/:fk",
          method: "PUT"
        },

        // INTERNAL. Use OrganizationUser.seckills() instead.
        "::get::OrganizationUser::seckills": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/seckills",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.seckills.create() instead.
        "::create::OrganizationUser::seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills",
          method: "POST"
        },

        // INTERNAL. Use OrganizationUser.seckills.destroyAll() instead.
        "::delete::OrganizationUser::seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.seckills.count() instead.
        "::count::OrganizationUser::seckills": {
          url: urlBase + "/OrganizationUsers/:id/seckills/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Seckill#updateOrCreate
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Seckill` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Seckill#update
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Seckill#destroyById
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Seckill#removeById
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Seckill#modelName
    * @propertyOf lbServices.Seckill
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Seckill`.
    */
    R.modelName = "Seckill";


        /**
         * @ngdoc method
         * @name lbServices.Seckill#organization
         * @methodOf lbServices.Seckill
         *
         * @description
         *
         * Fetches belongsTo relation organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        R.organization = function() {
          var TargetResource = $injector.get("OrganizationUser");
          var action = TargetResource["::get::Seckill::organization"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Activity
 * @header lbServices.Activity
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Activity` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Activity",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Activities/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Activity.organization() instead.
        "prototype$__get__organization": {
          url: urlBase + "/Activities/:id/organization",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#create
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Activities",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#upsert
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Activities",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#exists
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Activities/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#findById
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Activities/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#find
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Activities",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#findOne
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Activities/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#updateAll
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Activities/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#deleteById
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Activities/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#count
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Activities/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#prototype$updateAttributes
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Activities/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#view
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "view": {
          url: urlBase + "/Activities/view/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Activity#ueContent
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `url` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `content` – `{string=}` - 
         */
        "ueContent": {
          url: urlBase + "/Activities/get-content",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.activities.findById() instead.
        "::findById::OrganizationUser::activities": {
          url: urlBase + "/OrganizationUsers/:id/activities/:fk",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.activities.destroyById() instead.
        "::destroyById::OrganizationUser::activities": {
          url: urlBase + "/OrganizationUsers/:id/activities/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.activities.updateById() instead.
        "::updateById::OrganizationUser::activities": {
          url: urlBase + "/OrganizationUsers/:id/activities/:fk",
          method: "PUT"
        },

        // INTERNAL. Use OrganizationUser.activities() instead.
        "::get::OrganizationUser::activities": {
          isArray: true,
          url: urlBase + "/OrganizationUsers/:id/activities",
          method: "GET"
        },

        // INTERNAL. Use OrganizationUser.activities.create() instead.
        "::create::OrganizationUser::activities": {
          url: urlBase + "/OrganizationUsers/:id/activities",
          method: "POST"
        },

        // INTERNAL. Use OrganizationUser.activities.destroyAll() instead.
        "::delete::OrganizationUser::activities": {
          url: urlBase + "/OrganizationUsers/:id/activities",
          method: "DELETE"
        },

        // INTERNAL. Use OrganizationUser.activities.count() instead.
        "::count::OrganizationUser::activities": {
          url: urlBase + "/OrganizationUsers/:id/activities/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Activity#updateOrCreate
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Activity` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Activity#update
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Activity#destroyById
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Activity#removeById
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Activity#modelName
    * @propertyOf lbServices.Activity
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Activity`.
    */
    R.modelName = "Activity";


        /**
         * @ngdoc method
         * @name lbServices.Activity#organization
         * @methodOf lbServices.Activity
         *
         * @description
         *
         * Fetches belongsTo relation organization.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - BaseItem id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `OrganizationUser` object.)
         * </em>
         */
        R.organization = function() {
          var TargetResource = $injector.get("OrganizationUser");
          var action = TargetResource["::get::Activity::organization"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.University
 * @header lbServices.University
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `University` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "University",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Universities/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.University#create
         * @methodOf lbServices.University
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `University` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Universities",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#upsert
         * @methodOf lbServices.University
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `University` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Universities",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#exists
         * @methodOf lbServices.University
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Universities/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#findById
         * @methodOf lbServices.University
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `University` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Universities/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#find
         * @methodOf lbServices.University
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `University` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Universities",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#findOne
         * @methodOf lbServices.University
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `University` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Universities/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#updateAll
         * @methodOf lbServices.University
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Universities/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#deleteById
         * @methodOf lbServices.University
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Universities/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#count
         * @methodOf lbServices.University
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Universities/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.University#prototype$updateAttributes
         * @methodOf lbServices.University
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `University` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Universities/:id",
          method: "PUT"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.University#updateOrCreate
         * @methodOf lbServices.University
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `University` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.University#update
         * @methodOf lbServices.University
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.University#destroyById
         * @methodOf lbServices.University
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.University#removeById
         * @methodOf lbServices.University
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.University#modelName
    * @propertyOf lbServices.University
    * @description
    * The name of the model represented by this $resource,
    * i.e. `University`.
    */
    R.modelName = "University";


    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
