import React from "react";
import NavLinkUserInfo from "./Components/NavLinkUserInfo";
import NavLinkTreatments from "./Components/NavLinkTreatments"
import NavLinkHealthInsurancePatient from "./Components/NavLinkHealthInsurancePatient";
import NavLinkHealthInsuranceConfiguration from './Components/NavLinkHealthInsuranceConfiguration';
import NavLinkGeneralSpecialitiesConfiguracion from './Components/NavLinkGeneralSpecialitiesConfiguracion'

const Components = {
  infoPaciente: NavLinkUserInfo,
  tratamientos:NavLinkTreatments,
  obrasPaciente:NavLinkHealthInsurancePatient,
  configuracionObras:NavLinkHealthInsuranceConfiguration,
  configuracionEspecialidadesGenerales: NavLinkGeneralSpecialitiesConfiguracion
};


export default (block,index,isSelected) => {


  const styleSelected = {
    padding: '20px 40px',
    borderBottom: `3px solid ${block.main_color}`
  }

  let component = (block.component)

  if (typeof Components[block.component] !== "undefined") {
    if(component === isSelected)
    {
      return React.createElement(Components[block.component], {
            block: block,
            main_color: block.main_color,
            style: styleSelected,
            url:block.url,
            key:index
          });
    }else
    {
      return React.createElement(Components[block.component], {
        block: block,
        main_color: block.main_color,
        style: {},
        url:block.url,
        key:index
      });
    }
    
  }
  return React.createElement(
    () => <div>El componente {block.component} no ha sido creado todavía.</div>,
  );
};
