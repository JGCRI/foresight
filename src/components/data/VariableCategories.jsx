import { MdError, MdElectricBolt, MdGroups, MdFilterHdr, MdOutlineWindPower, MdDeviceThermostat, MdOutlineDesignServices, MdOutlineFactory  } from "react-icons/md";
import { GiCorn, GiFactory, GiWaterDrop, GiCow, GiMolecule  } from "react-icons/gi";
import { TbCoins, TbBuildingCommunity } from "react-icons/tb";
import { FaTruckMoving } from "react-icons/fa";

export const iconTypes = ["energy", "transport", "buildings", "industry", "water", "electricity", "socioeconomic - gdp", "socioeconomic - population", "agriculture", "livestock", "land", "emissions", "climate", "hydrogen", "other"];

/**
 * Returns the icon coresponding to a specific parameter name.
 * 
 * @param {string} param - The given parameter.
 * @param {object[]} guages - All current parameters. 
 * @returns {IconType} The icon for display.
 */
export const getIconParam = (param, guages) => {
  const found = (Array.isArray(guages)) ? guages.find(gauge => gauge.title === param) : "error";
  const guageCategory = found ? found.group : "error"
  return getIcon(guageCategory, true);
}

/**
 * Returns the icon for a given parameter category for display.
 * 
 * @param {string} category - The parameter category.
 * @param {boolean} custom - Whether the parameter was user uploaded or not. 
 * @returns {IconType} The icon for display.
 */
export const getIcon = (category, custom) => {
  switch(category) {
    case "energy":
      return <MdOutlineWindPower />;
    case "transport":
      return <FaTruckMoving />;
    case "buildings":
      return <TbBuildingCommunity />;
    case "industry":
      return <MdOutlineFactory />;
    case "water":
      return <GiWaterDrop />;
    case "electricity":
      return <MdElectricBolt />;
    case "socioeconomic - gdp":
      return <TbCoins />;
    case "socioeconomic - population":
      return <MdGroups />;
    case "agriculture":
      return <GiCorn />;
    case "livestock":
      return <GiCow />;
    case "land":
      return <MdFilterHdr />
    case "emissions":
      return <GiFactory />;
    case "climate":
      return <MdDeviceThermostat />;
    case "hydrogen":
      return <GiMolecule />;
    default:
      if(custom)
        return <MdOutlineDesignServices />;
      return <MdError />;
  }
}