exports.mainResponse = function (res, type, msg, data) {
	//   console.log(data.body);
	let status = 200;
	if (type === "success") {
	  var resData = {
		status: 'success',
		message: msg,
		data: data,
	  };
	  status = 200;
	}
	else if (type === "no-route"){
		var resData = {
		  status: 'failed',
		  message: msg,
		  data: data,
		};
		status = 404;
	}
	else if (type === "validation"){
		var resData = {
		  status: 'failed',
		  message: msg,
		  data: data,
		};
		status = 400;
	}
	else if (type === "unauthorized"){
		var resData = {
		  status: 'failed',
		  message: msg,
		  data: data,
		};
		status = 401;
	} 
	else if (type === "failed") {
	  var resData = {
		status: 'failed',
		message: msg,
	  };
	  status = 200;
	}
	else {
	  var resData = {
		status: 'failed',
		message: msg,
		data: data,
	  };
	  status = 500;
	}
	return res.status(status).json(resData);
};