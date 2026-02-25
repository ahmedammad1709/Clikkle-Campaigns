
import api from '../utilities/axios';

const fetchTags = async (
	sortBy = 'name',
	search = '',
	direction = 1,
	pageNo = 1
) => {
	const response = await api.get(`/user/tags?sortBy=${sortBy}&search=${search}&direction=${direction}&page=${pageNo}`);
	return response.data;
};

export default fetchTags;
