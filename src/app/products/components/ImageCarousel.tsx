'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/card.module.css'

export function ImageCarousel({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0)

  const handlePreviousImage = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1)
      return
    }
    setCurrentImage(currentImage - 1)
  }

  const handleNextImage = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0)
      return
    }
    setCurrentImage(currentImage + 1)
  }

  return (
    <div className={styles.carousel}>
      <button className={''} onClick={handlePreviousImage}>
        {'<'}
      </button>
      <Image
        src={images[currentImage]}
        alt="product image"
        width={260}
        height={180}
      />
      <button className={''} onClick={handleNextImage}>
        {'>'}
      </button>
    </div>
  )
}
