var FileMakerWrapper = function(filename) {
    this._q = {};
    this._counter = 0;
    this.PerformScript = async function(script, parameter, timeout, success, error) {
        var id = this._counter ++;
        var param = {
            id: id,
            scriptParameter: parameter,
            scriptName: script
        };
        try {
        		var timeOut = 100 ;
						var delay = 0 ; var incr = 1 ;
						while ( ( typeof FileMaker == "undefined" ) && ( delay < timeOut )  ) {
								delay = delay + incr ;
								await this._sleep ( incr ) ;	
						}
          	FileMaker.PerformScript('_fmBridgit.webhook', JSON.stringify(param));
        } catch (e) {
						alert ( 'Error waiting for FileMaker, please allow JavaScript to perform FileMaker scripts...');
        };
        if (success === undefined) {
            return this._registerPromise(id);
        } else {
            this._q[id] = {
                resolve: success,
                reject: error
            };
        };
    }
    this.callback = function(param){
    		try {
            let data = JSON.parse(param);
        		this._applyPromise(data.id, data.success, data.error);
    		} catch (e) {
        	alert(e.message);
    		}
    }
    this.returnResult = function(param){
			return this.PerformScript( "_fmBridgit.returnResult", JSON.stringify ( param ) ) 
    }
    this._registerPromise = function(id) {
        var promise = new Promise(function(resolve, reject) {
            this._q[id] = {
                resolve: resolve,
                reject: reject
            };
        }.bind(this));
        return promise;
    }
    this._applyPromise = function(id, success, error) {
        var deferred = this._q[id];
        if (success) {
            deferred.resolve(success);
        } else if (error) {
            deferred.reject(error);
        }
    }
    this._sleep = function (ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
		}
};
try {
    var fmBridgit = new FileMakerWrapper();
} catch (e) {
    alert("error");
}
