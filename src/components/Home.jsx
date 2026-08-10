import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Latestjobs from './Latestjobs'
import Footer from './Footer'
import Topemployers from './Topemployers'
import Whyus from './Whyus'
import Faq from './Faq'
import FeaturesSection from './FeaturesSection'
import CTABanner from './Ctabanner'


const Home = () => {
  return (
    <div>
      <Navbar> </Navbar>
      <Header />
      <Topemployers/>
      <Latestjobs/>
      <Whyus/>
      <FeaturesSection/>
      <CTABanner/>
      <Faq/>
      <Footer/>
    
    </div>
  )
}

export default Home