import { apiConfig } from './api';

export const crudService = {
    _get,
    _getAll,
    _getAllData,
    _post,
    _put,
    _delete
};
function _get(type, id) {
    return apiConfig.get(`/${type}/${id}`)        
}

function _getAllData(type, filter) {
    return apiConfig.get(`/${type}`, { params: filter })
}

function _getAll(type, filterData) {
    let filters = []
    let filter = []
    if (filterData) {
        if (filterData.filters) {
            filterData.filters.map(filter => {
                filters.push({
                    name: filter.column.field,
                    value: filter.value
                })
                return null
            })
        }

        filter = {
            page: filterData.page + 1,
            pageSize: filterData.pageSize,
            search: filterData.search,
            orderBy: filterData.orderBy ? filterData.orderBy.field : null,
            orderDirection: filterData.orderDirection,
            filters: JSON.stringify(filters),
        }
    }

    return apiConfig.get(`/${type}`, { params: filter })
}
function _post(type, data) {
    return apiConfig.post(`/${type}`, data)
}
function _put(type, id, data) {
    return apiConfig.put(`/${type}/${id}`, data)
}
function _delete(type, id) {
    return apiConfig.delete(`/${type}/${id}`)
}