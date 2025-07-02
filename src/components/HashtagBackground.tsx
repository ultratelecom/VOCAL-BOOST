'use client'

import React from 'react'

const HashtagBackground: React.FC = () => {
  const hashtags = [
    '#ALWAYSWARMUP',
    '#DONTQUIT', 
    '#USEYOURVOICE',
    '#BREATHCONTROL',
    '#FINDYOURRANGE',
    '#VOCALPOWER',
    '#STAYONTHEPITCH',
    '#SINGWITHPURPOSE',
    '#TRAINDAILY',
    '#BELIEVEINTHESOUND'
  ]

  // Create static hashtag lines that extend across entire screen width
  const createHashtagLine = () => {
    const hashtagString = hashtags.join(' ') + ' '
    // Repeat enough times to cover any screen width
    return Array(15).fill(hashtagString).join('')
  }

  // Generate static rows positioned across the page
  const rows = Array(60).fill(null).map((_, index) => ({
    content: createHashtagLine(),
    direction: index % 2 === 0 ? 'left' : 'right', // Alternate text alignment
    topOffset: index * 35, // Spread lines across the page
    leftOffset: (index % 4) * 25 // Stagger horizontal positions for variety
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="relative w-full h-full transform rotate-12 scale-125">
        {rows.map((row, index) => (
          <div
            key={index}
            className="absolute whitespace-nowrap text-gray-400 font-bold select-none"
                          style={{
                fontSize: '20px',
                letterSpacing: '1px',
                lineHeight: '1',
                top: `${row.topOffset}px`,
                left: `${row.direction === 'left' ? -row.leftOffset : row.leftOffset}%`,
                right: row.direction === 'right' ? `${row.leftOffset}%` : 'auto',
                opacity: 0.06,
                textAlign: row.direction === 'left' ? 'left' : 'right',
                width: '300%', // Much wider to ensure full coverage
                transform: 'translateX(-50%)', // Center the very wide text
              }}
          >
            {row.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HashtagBackground 