import { MdError, MdElectricBolt, MdGroups, MdFilterHdr, MdOutlineWindPower, MdDeviceThermostat, MdOutlineDesignServices, MdOutlineFactory  } from "react-icons/md";
import { GiCorn, GiFactory, GiWaterDrop, GiCow, GiMolecule  } from "react-icons/gi";
import { TbCoins, TbBuildingCommunity } from "react-icons/tb";
import { FaTruckMoving } from "react-icons/fa";

export const iconTypes = ["energy", "transport", "buildings", "industry", "water", "electricity", "socioeconomic - gdp", "socioeconomic - population", "agriculture", "livestock", "land", "emissions", "climate", "hydrogen", "other"];

export const getIconParam = (param, guages) => {
  const found = guages.find(gauge => gauge.title === param);
  const guageCategory = found ? found.group : "error"
  return getIcon(guageCategory, false);
}
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