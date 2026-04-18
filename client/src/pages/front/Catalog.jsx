import React, { useDeferredValue, useEffect, useMemo, useState } from 'react'
import ProductCard from '../../components/front/ProductCard'
import { getAllCookies } from '../../services/cookieService'
import { getAllCategories } from '../../services/categoryService'

export default function Catalog() {
  const [cookies, setCookies] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ search: '', category: '' })
  const deferredSearch = useDeferredValue(filters.search)

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: cookieData }, { data: categoryData }] = await Promise.all([
          getAllCookies(),
          getAllCategories(),
        ])
        setCookies(cookieData)
        setCategories(categoryData)
      } catch (error) {
        console.error('Failed to load catalog', error)
      }
    }

    load()
  }, [])

  const filteredCookies = useMemo(() => {
    return cookies.filter((cookie) => {
      const matchesSearch = cookie.name.toLowerCase().includes(deferredSearch.toLowerCase())
      const matchesCategory = !filters.category || cookie.category?._id === filters.category
      return matchesSearch && matchesCategory
    })
  }, [cookies, deferredSearch, filters.category])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="front-catalog-shell">
      <p className="front-eyebrow">Catalog</p>
      <h2 className="front-section-title">Browse every cookie</h2>
      <p className="front-section-copy">Use the filters below to find the flavours and collections you want.</p>

      <div className="front-filter-grid">
        <input
          className="front-input"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by cookie name"
        />
        <select className="front-select" name="category" value={filters.category} onChange={handleChange}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="front-section">
        <div className="front-product-grid">
          {filteredCookies.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {filteredCookies.length === 0 && <p className="front-section-copy">No cookies match those filters right now.</p>}
      </div>
    </div>
  )
}
