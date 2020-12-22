import * as bcrypt from'bcrypt';

export const utils = {
	hashPassword : password => {
		return new Promise((resolve,reject) => {
			bcrypt.genSalt(parseInt(process.env.saltRounds), function(err, salt) {
			    bcrypt.hash(password, salt, function(err, hash) {
			    	resolve(hash);
			    });
			});
		});
  	}

}