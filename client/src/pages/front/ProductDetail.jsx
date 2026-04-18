import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCookie } from '../../services/cookieService'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getCookie(id)
        setProduct(data)
      } catch (error) {
        console.error('Failed to load product detail', error)
      }
    }

    load()
  }, [id])

  if (!product) {
    return <div className="front-card"><p className="front-section-copy">Loading product details...</p></div>
  }

  return (
    <div className="front-detail">
      <img className="front-detail-image" src={product.image} alt={product.name} />

      <div className="front-card front-detail-panel">
        <p className="front-eyebrow">{product.category?.name || 'Cookie Detail'}</p>
        <h2 className="front-section-title">{product.name}</h2>
        <p className="front-price">{product.price} TND</p>
        <p className="front-section-copy">{product.description || 'A handcrafted cookie made for sweet, simple browsing.'}</p>

        {product.ingredients?.length > 0 && (
          <>
            <p className="front-eyebrow" style={{ marginTop: '18px' }}>Ingredients</p>
            <ul className="front-ingredients">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </>
        )}

        <div className="front-tag-row">
          {product.tags?.map((tag) => (
            <span key={tag._id || tag} className="front-tag">{tag.name || tag}</span>
          ))}
        </div>

        <div className="front-actions">
          <Link className="front-btn" to="/contact">Ask About This Cookie</Link>
          <Link className="front-btn-secondary" to="/catalog">Back to Catalog</Link>
        </div>
      </div>
    </div>
  )
}
