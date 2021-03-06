import AuthService from '../services/auth-service';
import Cookies from 'js-cookie';

export default async () => {
	if (Cookies.get('user')) {
		const user = Cookies.get('user');

		try {
			const { data } = await AuthService.getCurrentUser(user);
			return data;
		} catch (e) {
			const error = new Error("Not authorized!");
			Cookies.remove('user');
			error.status = 403;
			throw error;
		}
	} else {
		return null;
	}
}