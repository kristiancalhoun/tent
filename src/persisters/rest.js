/**
 * @requires tent.persisters
 * @requires jQuery
 * @name tent.persisters.rest
 * @namespace HTTP RESTful Persister using jQuery.ajax
 */
tent.declare('tent.persisters.rest', function(){

    /**
     * Combines URIs (only combines for paths, query and hash combining not supported)
     * @return {String} the URI that combines all arguments
     */
    tent.persisters.rest.uriCombine = function(){
        var uri = '';
        for (var i = 0, l = arguments.length; i < l; i++) {
            var strarg = arguments[i] + '';
            if (strarg) {
            
                if (strarg.match(/^[A-Za-z]+\:\/\//)) {
                    // is absolute, replace current uri
                    uri = strarg;
                }
                else {
                    if (uri.substr(uri.length - 1, 1) == '/') {
                        if (strarg.substr(0, 1) == '/') {
                            uri += strarg.substr(1);
                        }
                        else 
                            if (strarg.substr(0, 2) == './') {
                                uri += strarg.substr(2);
                            }
                            else {
                                uri += strarg;
                            }
                    }
                    else {
                        if (strarg.substr(0, 1) == '/') {
                            uri += strarg;
                        }
                        else 
                            if (strarg.substr(0, 2) == './') {
                                uri += strarg.substr(1);
                            }
                            else {
                                uri += '/' + strarg;
                            }
                    }
                }
            }
        }
		return uri;
    }
    	    
    /**
     * 	@private
     */
    tent.persisters.rest.createItemMapper = function(defaultOptions){
    
        if (!defaultOptions) {
            defaultOptions = {};
        }
        return function(data, options, map){
            var items;
            if (data instanceof Array) {
                items = data;
            }
            else {
                if (options.multi) {
                    var multiSelector = options.multiSelector || defaultOptions.multiSelector ||
                    function(d, opt){
                        var propName = opt.multiSelectorProperty || defaultOptions.multiSelectorProperty;
                        if (propName) {
                            return d[propName];
                        }
                        else {
                            for (var prop in d) {
                                if (d[prop] instanceof Array) {
                                    return d[prop];
                                }
                            }
                        }
                    };
                    items = multiSelector(data, options);
                }
                else {
                    var singleSelector = options.singleSelector || defaultOptions.singleSelector ||
                    function(d, opt){
                        var propName = opt.singleSelectorProperty || defaultOptions.singleSelectorProperty;
                        if (propName) {
                            return [d[propName]];
                        }
                        else {
                            return [d];
                        }
                    };
                    items = singleSelector(data, options);
                }
            }
            
            if (items) {
                for (var i = 0, l = items.length; i < l; i++) {
                    var item = items[i];
                    if (options.multi) {
                        var itemSelector = options.multiItemSelector || defaultOptions.multiItemSelector ||
                        function(d, opt){
                            var propName = opt.multiItemSelectorProperty || defaultOptions.multiItemSelectorProperty;
                            if (propName) {
                                return d[propName];
                            }
                            else {
                                return d;
                            }
                        };
                        item = itemSelector(item, options);
                    }
                    
                    if (item) {
                        var itemTransformer = options.itemTransformer || defaultOptions.itemTransformer;
                        if (itemTransformer) {
                            item = itemTransformer(item, options);
                        }
                    }
                    if (item) {
                        map(item, options);
                    }
                }
            }
        }
    }
    
    /**
     * 	@private
     */
    tent.persisters.rest.createChangeSerializer = function(defaultOptions){
    
        if (!defaultOptions) {
            defaultOptions = {};
        }
        return function(items, options){
            var data, chg;
            
            var serializer = options.itemSerializer || defaultOptions.itemSerializer ||
            function(local, op){
                if (local instanceof tent.entities.EntityLink) {
                    // EntityLinks not supported
                    return null;
                }
                var rmt;
				var idProperty = tent.entities.getIdPropertyName(local);
				if (local.__changeState__ === tent.entities.ChangeStates.DELETED) {
					rmt = {};
					if (local.rev) {
						rmt.rev = tent.pget(local, 'rev');
					}
				}
				else {
					rmt = tent.clone(local, {
						deep: true,
						onlyOwnProperties: true,
						attachedObjectsIds: true,
						attachedObjects: false,
						skipPrivates: true
					});
				}
				if (idProperty && local[idProperty]) {
					rmt[idProperty] = tent.pget(local, idProperty);
				}
				if (local._rev) {
					rmt._rev = tent.pget(local, '_rev');
				}

                if (local.__changeState__ === tent.entities.ChangeStates.DELETED) {
                    rmt._deleted = true;
                }
				return rmt;
            };
            
            
            if (items instanceof Array) {
            
				if (options.bulk){					
	                var dataItems = [];
	                var batch = options.batch || defaultOptions.batch || 0;
					var batchSize = batch;
					if ((!batch) || (batch < 1)){
						batchSize = items.length;
					}
					var limit = (options.offset || 0)+ batchSize;
					if (options.limit && options.limit < limit){
						limit = options.limit;
					}
	                for (var i = (options.offset || 0), l = limit; i < l; i++) {
	                    dataItems.push(serializer(items[i], options));
	                }
                
	                var wrapperProp = options.saveWrapperProperty || defaultOptions.saveWrapperProperty || 'docs';
	                var wrapper = options.itemsSaveWrapper || defaultOptions.itemsSaveWrapper ||
	                function(ditems, op){
	                    var d = {};
	                    d[wrapperProp] = ditems;
	                    return d;
	                };
	                return wrapper(dataItems, options);
				}else{
                    return serializer(items[options.offset || 0], options);
				}

            }
            else 
                if (typeof items == 'object') {
                    return serializer(items, options);
                }
        }
    }
    
    /**
     * 	@private
     */
    tent.persisters.rest.createChangeResponseMapper = function(defaultOptions){
    
        if (!defaultOptions) {
            defaultOptions = {};
        }
        return function(data, options, map){

				
            var items;
            if (data instanceof Array) {
                items = data;
            }
            else {
			
				var resultSelector = options.resultSelector || defaultOptions.resultSelector ||
				function(d, opt){
					if (!options.bulk){
						return [d];
					}
					var propName = opt.resultSelectorProperty || defaultOptions.resultSelectorProperty;
					if (propName) {
						return d[propName];
					}
					else {
						for (var prop in d) {
							if (d[prop] instanceof Array) {
								return d[prop];
							}
						}
					}
				};
				items = resultSelector(data, options);
            }
            
            if (items) {
                for (var i = 0, l = items.length; i < l; i++) {
                    var item = items[i];
                    
                    var itemSelector = options.resultItemSelector || defaultOptions.resultItemSelector ||
                    function(d, opt){
						if (!opt.bulk){
							return d;
						}
                        var propName = opt.resultItemSelectorProperty || defaultOptions.resultItemSelectorProperty;
                        if (propName) {
                            return d[propName];
                        }
                        else {
                            return d;
                        }
                    };
                    item = itemSelector(item, options);
                    
                    if (item) {
                        var itemTransformer = options.resultItemTransformer || defaultOptions.resultItemTransformer;
                        if (itemTransformer) {
                            item = itemTransformer(item, options);
                        }
                    }
                    if (item) {
                    
                    
                        var localChangeFinder = options.localChangeFinder || defaultOptions.localChangeFinder ||
                        function(ctx, remote, op){
                            if (ctx.hasChanges()) {
                                for (var j = 0, l = ctx.changes.items.length; j < l; j++) {
									var local = ctx.changes.items[j];
									var localIdProperty = tent.entities.getIdPropertyName(local);
									var remoteIdProperty = tent.entities.getIdPropertyName(remote);
									var remoteId = remote[remoteIdProperty || localIdProperty];
									if (remoteId && remoteId === local[localIdProperty || remoteIdProperty]){
                                        return j;
									}
                                }
                            }
                        };
                        
                        var localChangeIndex = localChangeFinder(options.context, item, options);
                        
                        if (!(typeof localChangeIndex == 'number' && localChangeIndex >= 0)) {
							if (!(options.unorderedResults || defaultOptions.unorderedResults)) {
								// if results are in order, the first change in the list, is next
								localChangeIndex = options.offset || 0;
							}
						}
						
                        if (typeof localChangeIndex == 'number' && localChangeIndex >= 0) {
                            map(item, localChangeIndex, options);
                        }
                    }
                }
            }
        }
    }
    	
    /**
     * Creates a new REST persister
     * @class a REST persister
     * @constructor
     */
    tent.persisters.rest.RestPersister = function RestPersister(){
    
        /**
         * Absolute base URI for this persister
         * @field
         * @type String
         */
        this.baseUri = 'http://127.0.0.1:5984/mydb';
        
        /**
         * Indicates if this persister is saving changes
         * @field
         * @type Boolean
         */
        this.saving = false;
        
        /**
         * Errors ocurred while saving
         * @field
         * @type Array
         */
        this.savingErrors = [];
        
        /**
         * Errors ocurred while loading
         * @field
         * @type Array
         */
        this.loadingErrors = [];
        
        /**
         * function that maps items from data obtained on load
         * @field
         * @type function()
         */
        this.loadItemMapper = null;
        
        /**
         * function that finds the local version of a loaded item
         * @field
         * @type function()
         */
        this.localItemFinder = function(context, remote){
            return context.first(function(item){
				var idProperty = tent.entities.getIdPropertyName(item);
				if (idProperty && item[idProperty === remote[idProperty]]){
					return true;
				}
			});
        };
        
        /**
         * function that compares a local item version with a loaded item
         * @field
         * @type function()
         */
        this.versionEquals = function(local, remote){
            return local._rev === remote._rev;
        };
        
        /**
         * function that updates local version field from a save response
         * @field
         * @type function()
         */
        this.updateLocalVersion = function(local, remote){
            local._rev = remote.rev || remote._rev;
			var idProperty = tent.entities.getIdPropertyName(local);
			var remoteId  = tent.entities.getId(remote) || remote[idProperty];
			if (!remoteId){
				if (!idProperty){
					idProperty = tent.entities.getIdPropertyName(remote);
				}
				if (local[idProperty] !== remoteId){
					local[idProperty] = remoteId;
				}
			}
        };
        
        /**
         * function that indicates if a loaded item is deleted
         * @field
         * @type function()
         */
        this.isDeleted = function(remote){
            return remote._deleted;
        };
        
        /**
         * function that serializes a change item
         * @field
         * @type function()
         */
        this.changeSerializer = null;
        
        /**
         * function that maps change responses to local changes
         * @field
         * @type function()
         */
        this.changeResponseMapper = null;
        
        /**
         * URI for bulk save operations (or null to use individual save requests)
         * @field
         * @type String
         */
        this.bulkSaveUri = null;
		
		/**
		 * Returns the URI to persist an item change
         * @field
         * @type function()
		 */
		this.getChangeItemUri = function(change){
			if (change instanceof tent.entities.EntityLink){
				// entity link not supported
				return null;
			}
			var uri = (tent.entities.getId(change) || '/')+'';
			if (change.__changeState__ == tent.entities.ChangeStates.DELETED){
				var hasQuery=false;
				if (change._rev){
					uri+=(hasQuery ? '&':'?')+ 'rev='+change._rev;
					hasQuery = true;
				}else if (change.rev){
					uri+=(hasQuery ? '&':'?')+ 'rev='+change.rev;
					hasQuery = true;
				}
			} 
			return uri;
		}
				
		/**
		 * Returns the http method to persist an item change
         * @field
         * @type function()
		 */
		this.getChangeItemMethod = function(change){
			if (change.__changeState__ === tent.entities.ChangeStates.DELETED){
				return 'DELETE';
			}
			if (change.__changeState__ === tent.entities.ChangeStates.MODIFIED){
				return 'PUT';
			}	
			if (tent.entities.getId(change)){
				return 'PUT';
			}
			return 'POST';
		}
    }
    
    /**
     * 	Load entities from an URL into a {@link tent.entities.Context}
     *  @param {tent.entities.Context} context
     *  @param {String} url that returns a JSON representation of entities
     *  @param {Object} [options] loading options
     *  @param {Boolean} [options.multi] indicates if the url will return a collection of entities
     *  @param {String} [options.credentials] http basic auth credentials in the form 'username:password' and base64 encoded
     *  @param {Object} [options.method] http method, default 'GET'
     *  @param {function()} [options.complete] function to call when operation is complete
     */
    tent.persisters.rest.RestPersister.prototype.load = function(context, url, options){
        try {
            if (!context) {
                throw 'a context is required for loading entities';
            }
            if (!url) {
                throw 'an url must be specified to load';
            }
            if (this.loading) {
                throw 'already loading entities';
            }
            this.loading = true;
            var persister = this;
            
            if (!options) {
                options = {};
            }
            var comp = options.complete;
			/**
			 * @ignore
			 */
            options.complete = function(r){
                persister.loading = false;
                if (r.error) {
                    persister.loadingErrors.push(r.error);
                }
                if (comp) {
                    comp(r);
                }
            };
            
            this.__load__(context, url, options);
        } 
        catch (err) {
            this.loadingErrors.push(err);
            this.loading = false;
            if (options.complete) {
                options.complete({
                    error: err
                });
            }			
		}
    }

    /**
     * 	@private
     */
    tent.persisters.rest.RestPersister.prototype.__load__ = function(context, url, options){
    
        if (typeof jQuery == 'undefined' || typeof jQuery.ajax == 'undefined') {
            throw 'jQuery.ajax is required in order to load entities';
        }
        
        url = tent.persisters.rest.uriCombine(this.baseUri, url);
        
        //options.credentials = 'YmVuamFtaW5lOnB5TGdvckNM';
        jQuery.ajax({
            context: {
                persister: this,
                context: context,
                options: options
            },
            url: url,
            beforeSend: function(req){
                if (options.credentials) {
                    req.setRequestHeader("Origin", document.location.protocol + "//" + document.location.host);
                    req.setRequestHeader("Authorization", "Basic " + options.credentials);
                }
            },
            type: options.method || 'GET',
            cache: !!options.cache,
            dataType: 'json',
            success: function(data, textStatus, req){
                var result = {
                    persister: this,
                    options: options
                };
                try {
                    this.persister.__processLoadResponse__(this.context, data, options, result);
                    result.ok = true;
                } 
                catch (err) {
                    result.error = err;
                }
                if (options.complete) {
                    options.complete(result);
                }
            },
            error: function(req, textStatus, error){
                var result = {
                    persister: this,
                    options: options,
                    error: {
                        type: textStatus,
                        errorThrown: error
                    }
                };
                if (options.complete) {
                    options.complete(result);
                }
            }
        });
    }
    
    /**
     * 	@private
     */
    tent.persisters.rest.RestPersister.prototype.__processLoadResponse__ = function(context, data, options, result){
        // load entities as unchanged
        
        if (options.context !== context) {
            options.context = context;
        }
        if (!this.loadItemMapper) {
            this.loadItemMapper = tent.persisters.rest.createItemMapper();
        }
		var persister = this;
        this.loadItemMapper(data, options, function(doc, opt){
        
            var local = persister.localItemFinder(context, doc);
            
            if (local) {
                if (local.__changeState__ === tent.entities.ChangeStates.MODIFIED ||
                local.__changeState__ === tent.entities.ChangeStates.DELETED) {
                    if (persister.versionEquals(local, doc)) {
                        // revision unchanged, local version is newer
                    }
                    else {
                        // revision changed, somebody else changed server version, conflict!
                        local.__loadErrors__.push({
                            error: 'conflict',
                            reason: 'document modified recently by another user'
                        });
                    }
                }
                else {
                    if (persister.isDeleted(doc)) {
                        // item deleted on the server
                        context.remove(local);
                        context.detach(local);
                    }
                    else {
                        // update local item with remote version
                        tent.pset(local, doc, true);
						
						// track changes in complex properties
						if (context.changeHandler){
							context.changeHandler.trackComplexProperties(local);							
						}
                    }
                    if (local.__loadErrors__) {
                        delete local.__loadErrors__;
                    }
                }
            }
            else {
                // attach new item as unchanged
                context.attach(doc);
            }
        });
    }

	/**
     * Persists all changes in a {@link tent.entities.Context}
	 * @param {tent.entities.Context} context
	 * @param {Object} [options] saving options
	 * @param {Boolean} [options.bulk] save in bulk mode (multiple changes in one request)
	 * @param {Number} [options.batch] batch size in bulk mode, number of changes to save in one request
	 * @param {String} [options.uri] uri to use (if none, it's use item or bulk save uri)
     * @param {String} [options.credentials] http basic auth credentials in the form 'username:password' and base64 encoded
     * @param {function()} [options.complete] function to call when operation is complete
     * @param {Number} [options.maxcount] maximum count of changes to save, otherwise all changes are saved
	 * @param {Number} [prevCount] number of saved changes on previous operation (internal use, for sequential requests)
	 */
    tent.persisters.rest.RestPersister.prototype.saveChanges = function(context, options, prevCount){
        try {
            if (!context) {
                throw 'a context is required for saving changes';
            }
            if (!options) {
                options = {};
            }
            if (options.context !== context) {
                options.context = context;
            }
            if (context.hasChanges()) {
                if (this.saving) {
                    throw 'Already saving changes';
                }
                this.saving = true;
                var persister = this;
                
                var comp = options.complete;
				
				/**
				 * @ignore
				 */
                options.complete = function(r){
                    persister.saving = false;
                    if (r.error) {
                        persister.savingErrors.push(r.error);
                    }
                    else 
                        if (typeof r.ok == 'undefined') {
                            r.ok = true;
                        }
					
					if ((r.ok && !r.error) && options.context.hasChanges() &&
						(!options.maxcount || (options.maxcount > r.count))) {
						persister.saveChanges(options.context, options, r.count);
					} else {						
	                    if (comp) {
	                        comp(r);
	                    }
					}
                };
                
                this.__persist__(context, options, prevCount);
            }
            else {
                if (options.complete) {
                    options.complete({
                        ok: true,
                        nochanges: true
                    });
                }
            }
        } 
        catch (err) {
            this.savingErrors.push(err);
            this.saving = false;
            if (options.complete) {
                options.complete({
					persister: this,
					options: options,
                    error: err
                });
            }
        }
    }
    
    /**
     * 	@private
     */
    tent.persisters.rest.RestPersister.prototype.__persist__ = function(context, options, prevCount){
    
        if (typeof jQuery == 'undefined' || typeof jQuery.ajax == 'undefined') {
            throw 'jQuery.ajax is required in order to persist changes';
        }
		
		var url, method, data;
		var change;
        
        if (options.bulk) {        
            // bulk save
			var bulkUri = options.uri || this.bulkSaveUri;
			if (!bulkUri){
				throw 'no bulk save uri provided';
			}
            url = tent.persisters.rest.uriCombine(this.baseUri, bulkUri);            
            data = this.__getPersistData__(context, options);
			context.markAsSaving(context.changes.items);
		} else {
			// save an individual change
			change = context.changes.items[options.offset || 0];
			context.markAsSaving(change);
			method = this.getChangeItemMethod(change);
			var changeUri = this.getChangeItemUri(change);
			if (changeUri) {
				url = tent.persisters.rest.uriCombine(this.baseUri, changeUri);
				data = this.__getPersistData__(context, options);
			}
		}
				
        if (data == null) {
            var result = {
                persister: this,
				options: options,
                ok: true,
                nochanges: true
            };
            if (options.complete) {
                options.complete(result);
            }
        }
        else {
            jQuery.ajax({
                context: {
                    persister: this,
                    context: context,
					options: options,
					prevCount: prevCount
                },
                url: url,
                beforeSend: function(req){
                    if (options.credentials) {
                        req.setRequestHeader("Origin", document.location.protocol + "//" + document.location.host);
                        req.setRequestHeader("Authorization", "Basic " + options.credentials);
                    }
                },
                type: method || options.method || 'POST',
                cache: false,
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json',
                success: function(data, textStatus, req){
                    var result = {
                        persister: this.persister,
						options: this.options
                    };
                    try {
                        this.persister.__processPersistResponse__(this.context, data, options, result);
						if (this.prevCount){
							result.count += this.prevCount;
						}
                        result.ok = true;
                    } 
                    catch (err) {
                        result.error = err;
                    }
                    if (options.complete) {
                        options.complete(result);
                    }
                },
                error: function(req, textStatus, error){
                    var result = {
                        persister: this.persister,
						options: this.options,
                        error: {
                            type: textStatus,
                            errorThrown: error
                        }
                    };
					if (this.prevCount){
						result.count += this.prevCount;
					}
                    if (options.complete) {
                        options.complete(result);
                    }
                }
            });
        }
    
    }
    
    /**
     * 	@private
     */
    tent.persisters.rest.RestPersister.prototype.__getPersistData__ = function(context, options){
        // Convert Context unsaved changes to JSON batch format
        
        if (!this.changeSerializer) {
            this.changeSerializer = tent.persisters.rest.createChangeSerializer();
        }
        
        var data = null;
        
        if (context.hasChanges()) {
            data = this.changeSerializer(context.changes.items, options);
        }
        
        return data;
    }
    
    /**
     * 	@private
     */
    tent.persisters.rest.RestPersister.prototype.__processPersistResponse__ = function(context, data, options, result){
        // mark saved entities as unchanged
        
        if (context.hasChanges()) {
        
            if (!this.changeResponseMapper) {
                this.changeResponseMapper = tent.persisters.rest.createChangeResponseMapper();
            }
            var persister = this;
            this.changeResponseMapper(data, options, function(remote, localChangeIndex, opt){
            
                var local = context.changes.items[localChangeIndex];
                if (remote.error) {
                    if (!local.__saveErrors__) {
                        local.__saveErrors__ = [];
                    }
                    local.__saveErrors__.push({
                        error: remote.error,
                        reason: remote.reason
                    });
                }
                else {
                    persister.updateLocalVersion(local, remote);
                    if (local.__saveErrors__) {
                        delete local.__saveErrors__;
                    }
                    context.acceptChanges(localChangeIndex);
					result.count = (result.count || 0)+1;
                }
            });
        }
        
    }
});

