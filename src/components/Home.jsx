import React, { useState } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import Topemployers from './Topemployers'
import Whyus from './Whyus'
import Faq from './Faq'
import FeaturesSection from './FeaturesSection'
import CTABanner from './Ctabanner'


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Navbar />
      <Header
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Topemployers/>
      <LatestJobs selectedCategory={selectedCategory} searchQuery={searchQuery} />
      <Whyus/>
      <FeaturesSection/>
      <CTABanner/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default Home