import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCookies } from '../../services/cookieService'
import { getAllBanners } from '../../services/bannerService'
import { getHomeContent } from '../../services/homeContentService'
import BannerSlider from '../../components/front/BannerSlider'
import ProductCard from '../../components/front/ProductCard'

export default function Home() {
  const [featuredCookies, setFeaturedCookies] = useState([])
  const [banners, setBanners] = useState([])
  const [content, setContent] = useState({
    heroTitle: 'Small-batch cookies baked for late cravings, coffee breaks, and gift boxes.',
    heroSubtitle: 'Browse the Sugar Rush collection, discover signature flavours, and contact us for custom requests, events, or seasonal specials.',
    featuredTitle: 'Customer Favorites',
    featuredSubtitle: 'A selection of the cookies people ask for the most, from gooey classics to rich chocolate-loaded bakes.',
    aboutTitle: 'About Sugar Rush',
    aboutText: 'Sugar Rush is a cookie catalogue built around simple browsing: rich flavours, soft centers, quality ingredients, and a warm homemade feel.',
  })

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: cookies }, { data: bannerData }, { data: homeContent }] = await Promise.all([
          getAllCookies(),
          getAllBanners(),
          getHomeContent(),
        ])

        setFeaturedCookies(cookies.filter((cookie) => cookie.is_featured).slice(0, 6))
        setBanners(bannerData)
        setContent((prev) => ({ ...prev, ...homeContent }))
      } catch (error) {
        console.error('Failed to load home page', error)
      }
    }

    load()
  }, [])

  return (
    <div>
      <section className="front-hero">
        <div className="front-hero-copy">
          <p className="front-eyebrow">Cookies Shop</p>
          <h2>{content.heroTitle}</h2>
          <p>{content.heroSubtitle}</p>
          <div className="front-actions">
            <Link className="front-btn" to="/catalog">Browse Catalog</Link>
            <Link className="front-btn-secondary" to="/contact">Contact Us</Link>
          </div>
        </div>
        <BannerSlider banners={banners} />
      </section>

      <section className="front-section">
        <div className="front-section-head">
          <div>
            <p className="front-eyebrow">Featured</p>
            <h3 className="front-section-title">{content.featuredTitle}</h3>
            <p className="front-section-copy">{content.featuredSubtitle}</p>
          </div>
          <Link className="front-btn-secondary" to="/catalog">See all cookies</Link>
        </div>

        <div className="front-product-grid">
          {featuredCookies.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="front-section front-about">
        <div className="front-about-panel">
          <div className="front-about-panel-head">
            <p className="front-eyebrow">Why Customers Choose Us</p>
            <h3>Real cookies, clear choices, easy contact.</h3>
          </div>

          <div className="front-about-highlights">
            <div className="front-about-highlight">
              <strong>Small-Batch Variety</strong>
              <span>From classic chocolate chip to rich stuffed cookies, every product is presented with clear pricing and useful details.</span>
            </div>
            <div className="front-about-highlight">
              <strong>Made For Browsing</strong>
              <span>The website stays focused on discovery, so visitors can explore flavours without getting lost in checkout or account steps.</span>
            </div>
            <div className="front-about-highlight">
              <strong>Direct Requests</strong>
              <span>Customers can reach out for gift boxes, special occasions, or questions about ingredients and availability.</span>
            </div>
          </div>

          <div className="front-about-note">
            <span className="front-tag">Freshly baked feel</span>
            <span className="front-tag">Straightforward catalogue</span>
            <span className="front-tag">Custom order friendly</span>
          </div>
        </div>
        <div className="front-card">
          <p className="front-eyebrow">About</p>
          <h3 className="front-section-title">{content.aboutTitle}</h3>
          <p className="front-section-copy">{content.aboutText}</p>
          <p className="front-section-copy">
            The goal is simple: let visitors see what is available, understand the style of each cookie, and reach out quickly when they are ready to order or ask for something special.
          </p>
        </div>
      </section>
    </div>
  )
}
