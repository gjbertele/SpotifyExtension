window.webpackChunkclient_web = window.webpackChunkclient_web || [];
    window.webpackChunkclient_web.push([
        [Math.random()],
        {},
        (req) => {
            window.webpackRequire = req;
        }
    ]);

let boundFunctions = {};

(() => {
    const originalBind = Function.prototype.bind;

    Function.prototype.bind = function(...args) {
    
        if(args && args.length >= 2 && !isNaN(parseInt(args[1]))){
            let n = parseInt(args[1]);
            boundFunctions[n] = this;
            if(n == 48627) console.log(this);
        }

        const boundFn = originalBind.apply(this, args);
    
        return function(...callArgs) {
            return boundFn.apply(this, callArgs);
        };
    };
})();