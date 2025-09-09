"use client"

import ImageMouseTrail from "@/components/uilayouts/mousetrail"

const images = [
  "https://images.pexels.com/photos/30082445/pexels-photo-30082445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.unsplash.com/photo-1692606743169-e1ae2f0a960f?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1644141655284-2961181d5a02?q=80&w=3000&auto=format",
  "https://assets.lummi.ai/assets/QmNfwUDpehZyLWzE8to7QzgbJ164S6fQy8JyUWemHtmShj?auto=format&w=1500",
  "https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1200&auto=format",
  "https://assets.lummi.ai/assets/Qmb2P6tF2qUaFXnXpnnp2sk9HdVHNYXUv6MtoiSq7jjVhQ?auto=format&w=1500",
]

export default function GalleryPage() {
  return (
    <section className="relative w-full h-screen bg-gray-900 overflow-hidden top-0 m-0 p-0">
  <ImageMouseTrail
    items={images}
    maxNumberOfImages={7}
    distance={25}
    imgClass="sm:w-40 w-28 sm:h-48 h-36 rounded-xl shadow-lg"
    className="absolute top-0 left-0 w-full h-full"
  >
    <article className="relative z-50 flex flex-col items-center justify-center h-full text-center px-4">
    <h1
  className="lg:text-5xl md:text-4xl text-2xl text-white font-bold drop-shadow-2xl"
  style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
>
  Capturing Moments, Creating Memories
</h1>

    </article>
  </ImageMouseTrail>
</section>

  )
}
