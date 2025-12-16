import React from 'react'
import GallerySection from '../common/Gallery'
import UnderTheBonnet from '../common/UnderTheBonnet'
import VehicleDetailsSection from "../common/VehicleDetailsSection"
import VehicleDetailsPage from '../common/BuyHeader'
import { bonnetData, galleryImages, vehicleDetails, vehicleData } from "../Data/Gumtree/bonnetData"
const Gumtree = () => {


  return (
    <div>
      <VehicleDetailsPage vehicle={vehicleData} />
      <VehicleDetailsSection data={vehicleDetails} />
      <UnderTheBonnet items={bonnetData} />   {/* <- PASS DATA HERE */}
      <GallerySection images={galleryImages} />
    </div>
  )
}

export default Gumtree
