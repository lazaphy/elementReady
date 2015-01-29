var elementReady = function(id, fn){
 	if(typeof id === 'string' && typeof fn === 'function'){
 		if($E(id) !== null){
 			fn();
 		}else{
	 		var flag = document.implementation.hasFeature('MutationEvents', '2.0');

			var excuteFn = function(arr){
				for(var i=0; i<arr.length; i++){
					arr[i]();
				}
			}

	 		if(window.elementReadyFunctions === undefined){
	 			if(flag){
	 				document.addEventListener('DOMNodeInserted', function(e){
	 					if(e.target == $E(id)){
	 						document.removeEventListener('DOMNodeInserted', arguments.callee, false);
	 						excuteFn(elementReadyFunctions[id]);
	 					}
	 				},false);
	 			}else {
	 				var timer;
	 				var observeFn = function (){
	 					timer = setTimeout(function(){
	 						if($E(id) !== null){
	 							clearTimeout(timer);
	 							excuteFn(elementReadyFunctions[id]);
	 						}else{
	 							arguments.callee();
	 						}
	 					},200)
	 				}
	 				observeFn();
	 			}
	 			window.elementReadyFunctions = {};
	 		}
	 		
	 		if(elementReadyFunctions[id] === undefined){
	 			elementReadyFunctions[id] = [];
	 			elementReadyFunctions[id].push(fn);
	 		}else {
	 			elementReadyFunctions[id].push(fn);
	 		}
 		}
 		
		
 	}else{
 		throw "arguments are invalid";
 	}
 	

 }