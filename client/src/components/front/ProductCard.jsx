import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="front-card front-product-card">
      <img className="front-product-image" src={product.image} alt={product.name} />
      <div className="front-product-copy">
        <p className="front-eyebrow">{product.category?.name || 'Cookie'}</p>
        <h3>{product.name}</h3>
        <p className="front-section-copy">{product.description || 'Freshly baked and ready to delight every craving.'}</p>
        <p className="front-price">{product.price} TND</p>
        <div className="front-tag-row">
          {product.is_featured && <span className="front-tag">Featured</span>}
          {product.ingredients?.slice(0, 2).map((ingredient) => (
            <span key={ingredient} className="front-tag">{ingredient}</span>
          ))}
        </div>
        <div className="front-actions">
          <Link className="front-btn-secondary" to={`/catalog/${product._id}`}>View Details</Link>
        </div>
      </div>
    </article>
  )
}
