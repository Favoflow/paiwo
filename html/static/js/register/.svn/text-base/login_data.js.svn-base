function login(){
	var email = document.getElementById('login_email').value;
	var pwd = document.getElementById('login_pwd').value;

	
	$.ajax({
		url: '/path/to/file',
		type: 'default GET (Other values: POST)',
		dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: {
			   email: email,
	           password : pwd,
	      	   remember : 1},
	    success:login_result  	   
	})
	
	
}

function login_result(data){
	if(data.error_id == 0){

	}else{
		alert('登陆错误')
	}
}