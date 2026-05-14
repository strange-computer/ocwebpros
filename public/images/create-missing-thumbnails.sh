#!/bin/bash
# Create SVG placeholders for all missing blog post images

missing_images=(
  "anaheim-citations:Anaheim Citation Building Guide:#FF6B35:#FFA500:Local SEO • NAP Consistency • Business Directories"
  "contractor-seo:Contractor SEO Orange County Guide:#4CAF50:#8BC34A:Construction • Home Services • Local Contractors"
  "dental-seo:Dental SEO HIPAA Guide:#2196F3:#03A9F4:Healthcare • Medical SEO • Patient Privacy"
  "ecommerce-seo:E-commerce SEO Case Study:#FF9800:#FF5722:Shopify • WooCommerce • Local Delivery"
  "fullerton-seo:Fullerton Local SEO Guide:#9C27B0:#673AB7:Education Hub • Downtown • Cal State"
  "irvine-gbp:Irvine Google Business Profile Guide:#795548:#5D4037:Business District • Tech Hub • Master-Planned"
  "legal-seo:Legal SEO Orange County Guide:#F44336:#E53935:Law Firms • Attorney Marketing • Compliance"
  "local-seo-playbook:Local SEO Playbook 2026:#607D8B:#455A64:Strategy • Optimization • Best Practices"
  "medspa-seo:Medical Spa SEO Guide:#00BCD4:#0097A7:Aesthetics • Wellness • Medical Tourism"
  "newport-beach-case-study:Newport Beach Case Study:#FFC107:#FF9800:Luxury Market • Waterfront • High-Net-Worth"
  "pricing-guide:SEO Pricing Guide 2026:#4CAF50:#8BC34A:Cost • ROI • Service Packages"
  "restaurant-seo:Restaurant SEO Orange County:#E91E63:#C2185B:Dining • Hospitality • Food Service"
  "seo-pricing:SEO Pricing Transparency:#9C27B0:#673AB7:Cost Analysis • Value • Investment"
  "seo-trends:SEO Trends 2026:#FF9800:#FF5722:AI • Algorithms • Future Strategies"
  "your-image:OCWebPros Blog:#607D8B:#455A64:Expert Insights • Orange County Focus"
)

echo "Creating SVG placeholders for ${#missing_images[@]} missing images..."

for item in "${missing_images[@]}"; do
  IFS=':' read -r filename title color1 color2 tagline <<< "$item"
  
  # Create SVG
  cat > "${filename}.svg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Gradient Background -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Decorative Elements -->
  <circle cx="900" cy="200" r="80" fill="#FFFFFF" opacity="0.1"/>
  <circle cx="950" cy="300" r="60" fill="#FFFFFF" opacity="0.1"/>
  <circle cx="850" cy="400" r="70" fill="#FFFFFF" opacity="0.1"/>
  
  <!-- Title -->
  <text x="600" y="250" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="42" font-weight="bold">
    ${title}
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="320" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="28">
    ${tagline}
  </text>
  
  <!-- Footer -->
  <text x="600" y="550" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24" opacity="0.8">
    OCWebPros.com | Orange County Local SEO Experts
  </text>
  
  <!-- Corner Logo -->
  <circle cx="100" cy="100" r="60" fill="#FFFFFF" opacity="0.2"/>
  <text x="100" y="110" text-anchor="middle" fill="${color1}" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
    OC
  </text>
</svg>
EOF
  
  echo "✅ Created ${filename}.svg"
done

echo ""
echo "All missing image placeholders created as SVG files."
echo ""
echo "Next steps:"
echo "1. Update blog post frontmatter to use .svg extension:"
echo "   sed -i '' 's|image: \"/images/\(.*\)\\.png\"|image: \"/images/\\1.svg\"|' src/pages/blog/*.md"
echo ""
echo "2. Or keep PNG references and convert SVGs to PNGs:"
echo "   for svg in *.svg; do convert \"\$svg\" \"\${svg%.svg}.png\"; done"
echo ""
echo "3. Commit and push changes:"
echo "   git add . && git commit -m 'Add missing blog post thumbnails' && git push"