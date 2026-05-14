#!/bin/bash
# Create placeholder thumbnails for blog posts

# City data: name, color1, color2, tagline
cities=(
  "anaheim:#FF6B35:#FFA500:Disneyland • Convention Center • Resort District"
  "garden-grove:#4CAF50:#8BC34A:Little Saigon • Vietnamese Business Hub • Cultural SEO"
  "healthcare:#2196F3:#03A9F4:HIPAA Compliance • Medical SEO • Patient Privacy"
  "huntington-beach:#00BCD4:#0097A7:Surf City USA • Beach Tourism • Coastal SEO"
  "laguna-beach:#9C27B0:#673AB7:Arts Colony • Coastal Destination • Festival SEO"
  "mission-viejo:#FF9800:#FF5722:Master-Planned Community • Professional Services • Lake Area"
  "newport-beach-real-estate:#795548:#5D4037:Luxury Real Estate • Waterfront Properties • High-Net-Worth"
  "orange-city:#FFC107:#FF9800:Historic Plaza • Chapman University • Search Challenge"
  "santa-ana:#F44336:#E53935:Government SEO • Non-Profit Marketing • Community Services"
  "tustin:#607D8B:#455A64:Legacy Field • The District • Old Town Optimization"
)

for city in "${cities[@]}"; do
  IFS=':' read -r name color1 color2 tagline <<< "$city"
  
  # Create SVG
  cat > "${name}-seo.svg" << EOF
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
  
  <!-- Decorative Element -->
  <circle cx="900" cy="200" r="80" fill="#FFFFFF" opacity="0.1"/>
  <circle cx="950" cy="300" r="60" fill="#FFFFFF" opacity="0.1"/>
  <circle cx="850" cy="400" r="70" fill="#FFFFFF" opacity="0.1"/>
  
  <!-- Title -->
  <text x="600" y="250" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
    $(echo ${name//-/ } | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}; print}') SEO Guide
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
  
  echo "Created ${name}-seo.svg"
done

echo ""
echo "All placeholder thumbnails created as SVG files."
echo "For PNG conversion, install ImageMagick and run:"
echo "  for svg in *-seo.svg; do convert \"\$svg\" \"\${svg%.svg}.png\"; done"
echo ""
echo "To use SVGs directly, update frontmatter to use .svg extension:" 
echo "  image: \"/images/anaheim-seo.svg\""