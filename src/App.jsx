import { useCallback, useState } from 'react'
import AuroraField from '@/components/AuroraField'
import SplineCanvas from '@/components/SplineCanvas'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import ClientShowcase from '@/components/ClientShowcase'
import Services from '@/components/Services'
import TechStack from '@/components/TechStack'
import WhyChoose from '@/components/WhyChoose'
import Process from '@/components/Process'
import Reviews from '@/components/Reviews'
import Pricing from '@/components/Pricing'
import SocialSection from '@/components/SocialSection'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import { scrollToId } from '@/lib/utils'

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingSeed, setBookingSeed] = useState(null)

  const openBooking = useCallback((seed = null) => {
    setBookingSeed(seed)
    setBookingOpen(true)
  }, [])

  const closeBooking = useCallback(() => {
    setBookingOpen(false)
    setBookingSeed(null)
  }, [])

  const handleBookDemo = useCallback(() => {
    openBooking()
  }, [openBooking])

  return (
    <>
      <AuroraField />
      <SplineCanvas />

      <div className="relative z-10">
        <Navbar onBookDemo={handleBookDemo} />

        <main id="main">
          <Hero onBookDemo={handleBookDemo} />
          <Work />
          <ClientShowcase onBookDemo={handleBookDemo} />
          <Services onBookDemo={handleBookDemo} />
          <TechStack />
          <WhyChoose />
          <Process onBookDemo={handleBookDemo} />
          <Reviews />
          <Pricing onBookDemo={handleBookDemo} />
          <SocialSection />
          <Footer onBookDemo={handleBookDemo} />
        </main>
      </div>

      <BookingModal
        open={bookingOpen}
        onClose={closeBooking}
        seed={bookingSeed}
      />
    </>
  )
}
