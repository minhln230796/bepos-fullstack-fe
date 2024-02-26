import * as React from 'react'
import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
  total: number
  currentPage: number
  num?: number
}
const Pagination = ({ total, currentPage, num = 10 }: PaginationProps) => {
  const pages = Math.ceil(total / num)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const generateLink = (page: number) => {
    let url = `${pathname}?page=${page}`
    if (searchParams.get('search_key')) {
      url += `&search_key=${searchParams.get('search_key')}`
    }
    return url
  }
  const getListPages = () => {
    const items = []
    if (pages > 10) {
      if (currentPage > 2 && currentPage < pages - 2) {
        items.push(...[currentPage - 1, currentPage, 0, pages - 1, pages])
      } else {
        items.push(...[1, 2, 0, pages - 1, pages])
      }
    } else {
      for (let i = 0; i < pages; i++) {
        items.push(i + 1)
      }
    }
    return items
  }

  const generatePaginationPage = (page: number) => {
    if (page == 0) {
      return (
                <div key={page}
                      className={'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20'}
                >
                    ...
                </div>
      )
    } else {
      return (
                <Link key={page}
                      href={generateLink(page)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${currentPage == page ? 'bg-slate-500' : 'hover:bg-gray-50'}`}
                >
                    {page}
                </Link>
      )
    }
  }

  const listPages = getListPages()

  return <div className="flex items-center justify-center bg-white px-4 py-3 sm:px-6">
        <div className="sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Link
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        href={generateLink(1)}
                    >
                        <span className="sr-only">Previous</span>
                        <HiChevronDoubleLeft className="h-5 w-5" aria-hidden="true"/>
                    </Link>
                    <Link
                        className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        href={generateLink(currentPage > 1 ? currentPage - 1 : currentPage)}
                    >
                        <span className="sr-only">Previous</span>
                        <HiChevronLeft className="h-5 w-5" aria-hidden="true"/>
                    </Link>
                    {listPages.map(item => generatePaginationPage(item))}
                    <Link
                        className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        href={generateLink(currentPage < pages ? currentPage + 1 : currentPage)}
                    >
                        <span className="sr-only">Next</span>
                        <HiChevronRight className="h-5 w-5" aria-hidden="true"/>
                    </Link>
                    <Link
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        href={generateLink(pages)}
                    >
                        <span className="sr-only">Previous</span>
                        <HiChevronDoubleRight className="h-5 w-5" aria-hidden="true"/>
                    </Link>
                </nav>
            </div>
        </div>
    </div>
}

export default Pagination
