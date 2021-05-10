import React from "react"
import ContentLoader from "react-content-loader" 

const LogoLoader = () => (
  <ContentLoader 
    speed={1}
    width={700}
    height={300}
    viewBox="0 0 320 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="597" cy="228" r="20" /> 
    <circle cx="154" cy="76" r="73" />
  </ContentLoader>
)

export default LogoLoader;