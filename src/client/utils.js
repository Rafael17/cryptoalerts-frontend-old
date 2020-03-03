import Cookies from 'js-cookie';

const Util = {
	isLogin: () => {
		if (Cookies.get("login")) {
	        return true;
	    }

	    return false;
	}
}

export default Util;