export const getVisibleAccounts = state => {
  const {
    filters: { activePage, activeBureau, perPageCount },
    allIds,
    byId,
  } = state.accounts
  const beginPage = (activePage - 1) * perPageCount
  const endPage = beginPage + perPageCount

  if (!allIds.length) return []
  const allAccounts = allIds.map(id => byId[id])
  return activeBureau
    ? allAccounts
        .filter(account => activeBureau === account.bureau)
        .slice(beginPage, endPage)
    : allAccounts.slice(beginPage, endPage)
}
