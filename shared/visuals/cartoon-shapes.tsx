import * as React from "react"

// A playful random colorful blob with thick ink outline
export function CartoonBlob1({ className, fill = "#fef08a" }: { className?: string, fill?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill={fill} stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" 
      d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46C90.4,-32.9,96.1,-16.5,95.5,-0.4C94.8,15.7,87.8,31.4,77.5,44.2C67.3,57,53.8,66.9,39.4,74.5C24.9,82.1,9.4,87.4,-5.4,85.2C-20.2,83,-34.5,73.5,-48.3,64C-62.1,54.5,-75.4,45,-82.9,31.8C-90.4,18.6,-92,1.7,-88.7,-13.6C-85.3,-28.9,-77,-42.6,-65.4,-52.3C-53.8,-62,-38.9,-67.7,-25.2,-74C-11.5,-80.3,1.3,-87.3,16.2,-87C31,-86.6,45.8,-79,44.7,-76.4Z" transform="translate(100 100)" />
    </svg>
  )
}

export function CartoonBlob2({ className, fill = "#93c5fd" }: { className?: string, fill?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill={fill} stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" 
      d="M38.1,-63.3C50.1,-56,61.2,-46.8,70.9,-35C80.5,-23.2,88.7,-8.8,87.1,4.5C85.5,17.8,74.1,30.1,62.8,40.9C51.5,51.7,40.3,61,27.1,68.4C13.9,75.8,-1.3,81.3,-16.2,79.5C-31.1,77.6,-45.6,68.4,-58,56.9C-70.4,45.4,-80.6,31.6,-83.4,16.5C-86.2,1.4,-81.5,-15,-72.5,-27.8C-63.5,-40.6,-50.2,-49.8,-37.2,-56.6C-24.2,-63.4,-12.1,-67.8,1.4,-70C14.9,-72.2,29.8,-72,38.1,-63.3Z" transform="translate(100 100)" />
    </svg>
  )
}

export function CartoonBlob3({ className, fill = "#fca5a5" }: { className?: string, fill?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill={fill} stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" 
      d="M51.1,-64.1C65.5,-54.3,75.9,-38.7,81.9,-21.8C87.9,-4.8,89.5,13.5,82.4,28.6C75.2,43.7,59.2,55.4,43,62.9C26.8,70.3,10.4,73.4,-5.2,71.5C-20.8,69.5,-35.6,62.4,-47.9,52C-60.2,41.6,-70.1,27.9,-75.3,12.5C-80.5,-2.9,-81.1,-20,-73.4,-33.5C-65.7,-47,-49.7,-56.9,-34.5,-65C-19.3,-73.1,-5,-79.3,7.9,-77.8C20.8,-76.3,41.6,-72,51.1,-64.1Z" transform="translate(100 100)" />
    </svg>
  )
}

export function CartoonStarburst({ className, fill = "#a7f3d0" }: { className?: string, fill?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill={fill} stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
      d="M100,10 L120,70 L190,80 L140,110 L160,180 L100,140 L40,180 L60,110 L10,80 L80,70 Z" />
    </svg>
  )
}

export function CartoonStickerPin({ className, outline = "currentColor" }: { className?: string, outline?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fill="#f87171" d="M30,30 C30,20 70,20 70,30 C70,40 55,60 50,90 C45,60 30,40 30,30 Z" stroke={outline} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="50" cy="30" r="12" fill="#ef4444" />
      <path d="M45,25 Q50,20 55,25" stroke="rgba(255,255,255,0.7)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  )
}