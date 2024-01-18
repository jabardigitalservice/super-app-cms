export const state = () => ({
  search: '',
  query: {
    pageSize: 5,
    page: 1,
    nameFilter: '',
    sortType: 'desc',
    sortBy: 'date'
  },
  pagination: {
    currentPage: 1,
    totalRows: 0,
    itemsPerPage: 5,
    itemsPerPageOptions: []
  }
})

export const mutations = {
  setQuery (state, query) {
    state.query = query
  },
  setPagination (state, pagination) {
    state.pagination = pagination
  },
  setSearch (state, search) {
    state.search = search
  }
}
