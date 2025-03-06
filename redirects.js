const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Redirect from old pagination URL structure to new one
  const paginationRedirect = {
    source: '/aktuality/page/:pageNumber',
    destination: '/aktuality/stranka/:pageNumber',
    permanent: true, // This is a permanent redirect (301)
  }

  const redirects = [internetExplorerRedirect, paginationRedirect]

  return redirects
}

export default redirects
