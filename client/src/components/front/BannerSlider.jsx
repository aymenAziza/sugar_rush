import React, { useEffect, useState } from 'react'

export default function BannerSlider({ banners }) {
  const activeBanners = banners.filter((banner) => banner.is_active)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (activeBanners.length <= 1) return undefined

    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeBanners.length)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [activeBanners.length])

  if (activeBanners.length === 0) {
    return (
      <div className="front-slider front-card" style={{ padding: '24px' }}>
        <div className="front-slide active">
          <div className="front-slide-overlay">
            <h3>Fresh visuals coming soon</h3>
            <p>Publish banners from the back office to feature promotions here.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="front-slider">
      {activeBanners.map((banner, index) => (
        <div key={banner._id} className={`front-slide${index === current ? ' active' : ''}`}>
          <img src={banner.image} alt={banner.title} />
          <div className="front-slide-overlay">
            <p className="front-eyebrow" style={{ color: 'rgba(255,255,255,0.78)' }}>Featured</p>
            <h3>{banner.title}</h3>
            <p>{banner.link || 'Freshly baked drops, signature flavours, and warm cookie moments.'}</p>
          </div>
        </div>
      ))}

      <div className="front-slider-dots">
        {activeBanners.map((banner, index) => (
          <button
            key={banner._id}
            type="button"
            className={index === current ? 'active' : ''}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
