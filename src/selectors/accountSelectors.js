export const getFilteredAccounts = state => {
  const {
    filters: { activeBureau },
    allIds,
    byId,
  } = state.accounts

  if (!allIds.length) return []
  const allAccounts = allIds.map(id => byId[id])

  return activeBureau
    ? allAccounts.filter(account => activeBureau === account.bureau)
    : allAccounts
}

export const getVisibleAccounts = state => {
  const {
    filters: { activePage, rowsPerPage },
  } = state.accounts
  const beginPage = activePage * rowsPerPage
  const endPage = beginPage + rowsPerPage
  return getFilteredAccounts(state).slice(beginPage, endPage)
}

export const getTotalVisibleCount = state => getFilteredAccounts(state).length

export const getActivePage = state => state.accounts.filters.activePage

export const getRowsPerPage = state => state.accounts.filters.rowsPerPage

export const getActiveBureau = state => state.accounts.filters.activeBureau
