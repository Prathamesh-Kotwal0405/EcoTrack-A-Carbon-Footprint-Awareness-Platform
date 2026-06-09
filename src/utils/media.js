// Configuration and asset URLs for the EcoTrack Interactive Terrains

export const TERRAINS = [
  {
    id: "canopy",
    title: "The Canopy",
    subtitle: "Lush Forests & Green Havens",
    themeColor: "var(--forest-green)",
    glowColor: "var(--forest-green-glow)",
    description: "Forests are the lungs of the Earth, absorbing roughly 2.6 billion tonnes of carbon dioxide every year. However, deforestation and degradation release that carbon back into our atmosphere, threatening global biodiversity and warming the climate.",
    healthyFact: "A single mature tree absorbs about 22kg of CO2 per year, producing enough oxygen for two humans.",
    unhealthyFact: "We lose roughly 10 million hectares of forest every year, accounting for about 10-15% of global greenhouse emissions.",
    
    // Media assets
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80",
    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba273bfe4fa194000b4b20756708&profile_id=139&oauth2_token_id=57447761",
    
    // Interactive controls
    controlType: "slider",
    controlLabel: "Deforestation Rate",
    controlMin: 0,
    controlMax: 100,
    controlStep: 1,
    controlDefault: 20,
    controlUnit: "%",
    
    // State-based content changes
    states: {
      healthy: {
        title: "Thriving Canopy",
        description: "Dense, clean oxygen production, sheltering millions of species.",
        filterStyle: "contrast(1.1) saturate(1.2) brightness(1.0) grayscale(0)"
      },
      unhealthy: {
        title: "Deforested Barrenland",
        description: "High logging rates, releasing carbon, driving soil erosion and habitat collapse.",
        filterStyle: "contrast(0.9) saturate(0.5) brightness(0.65) grayscale(0.5) sepia(0.3)"
      }
    }
  },
  {
    id: "deep",
    title: "The Deep",
    subtitle: "Vibrant Oceans & Coral Reefs",
    themeColor: "var(--ocean-teal)",
    glowColor: "var(--ocean-teal-glow)",
    description: "Our oceans absorb over 90% of excess heat and about 30% of carbon emissions. Rising temperatures and marine debris lead to acidification, coral bleaching, and the destruction of complex marine webs.",
    healthyFact: "Ocean phytoplankton produce over 50% of the Earth's oxygen, acting as our largest carbon sink.",
    unhealthyFact: "By 2050, it is estimated that there will be more plastic by weight than fish in the ocean.",
    
    // Media assets
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80",
    videoUrl: "https://player.vimeo.com/external/435674703.sd.mp4?s=4f305f85a5356e1511a0e0520287e07129529120&profile_id=165&oauth2_token_id=57447761",
    
    // Interactive controls
    controlType: "toggle",
    controlLabel: "Clean Oceans Initiative",
    controlDefault: true,
    
    // State-based content changes
    states: {
      healthy: {
        title: "Azure Coral Reefs",
        description: "Vibrant reefs, clean water, and complex biodiverse marine ecosystems.",
        filterStyle: "contrast(1.1) saturate(1.3) brightness(1.0) hue-rotate(0deg)"
      },
      unhealthy: {
        title: "Acidified & Plastic-Polluted Sea",
        description: "Bleached corals, rising temperatures, and floating synthetic debris.",
        filterStyle: "contrast(0.95) saturate(0.4) brightness(0.75) hue-rotate(-30deg) sepia(0.2)"
      }
    }
  },
  {
    id: "grid",
    title: "The Grid",
    subtitle: "Urban Spaces & Clean Energy",
    themeColor: "var(--solar-amber)",
    glowColor: "var(--solar-amber-glow)",
    description: "Cities consume 78% of the world's energy and produce more than 70% of greenhouse gases. The transition from coal/gas grids to solar, wind, and public transport is the single largest factor in urban footprint reduction.",
    healthyFact: "Electric transit and solar grids can reduce urban air pollution by up to 80%, extending human life expectancy.",
    unhealthyFact: "Over 90% of urban residents breathe air that exceeds WHO health safety guidelines.",
    
    // Media assets
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80",
    videoUrl: "https://player.vimeo.com/external/454992523.sd.mp4?s=ff7ba269a84a62506e7a2df251f28bcf692fb470&profile_id=165&oauth2_token_id=57447761",
    
    // Interactive controls
    controlType: "toggle",
    controlLabel: "Renewable Power Grid",
    controlDefault: false,
    
    // State-based content changes
    states: {
      healthy: {
        title: "Zero-Emission Smart City",
        description: "Powered by solar/wind, utilizing electric mass transit, with clean, breathable air.",
        filterStyle: "contrast(1.1) saturate(1.1) brightness(1.05) grayscale(0)"
      },
      unhealthy: {
        title: "Fossil Fuel Smog Grid",
        description: "Coal power stations and heavy internal combustion traffic producing heavy particulate smog.",
        filterStyle: "contrast(0.85) saturate(0.8) brightness(0.7) grayscale(0.2) sepia(0.4)"
      }
    }
  },
  {
    id: "cryosphere",
    title: "The Cryosphere",
    subtitle: "Majestic Glaciers & Ice Sheets",
    themeColor: "var(--glacial-blue)",
    glowColor: "var(--glacial-blue-glow)",
    description: "Our poles act as the Earth's air conditioner, reflecting sunlight back into space. Melting glaciers cause sea levels to rise and release trapped ancient methane, setting off a dangerous warming feedback loop.",
    healthyFact: "Bright white ice sheets reflect up to 90% of solar radiation, cooling the planet (the Albedo Effect).",
    unhealthyFact: "The Arctic is warming nearly four times faster than the rest of the world, losing 1.2 trillion tons of ice annually.",
    
    // Media assets
    imageUrl: "https://images.unsplash.com/photo-1520315342629-6ea920342047?auto=format&fit=crop&w=1920&q=80",
    videoUrl: "https://player.vimeo.com/external/485906806.sd.mp4?s=01ccbf8a77914de13a290264db3158c3db08cb7b&profile_id=165&oauth2_token_id=57447761",
    
    // Interactive controls
    controlType: "slider",
    controlLabel: "Global Temperature Rise",
    controlMin: 0,
    controlMax: 40, // Represents 0.0 to 4.0 °C
    controlStep: 1,
    controlDefault: 12, // Represents 1.2 °C
    controlUnit: "°C",
    
    // State-based content changes
    states: {
      healthy: {
        title: "Permafrost & Glacial Majesty",
        description: "Solid ice caps reflecting sunlight, keeping global climates stable.",
        filterStyle: "contrast(1.15) saturate(1.2) brightness(1.0) grayscale(0)"
      },
      unhealthy: {
        title: "Runaway Deglaciation",
        description: "Rapid melting, rising sea levels, and feedback loops due to loss of surface reflection.",
        filterStyle: "contrast(0.9) saturate(0.6) brightness(0.8) hue-rotate(20deg) sepia(0.1)"
      }
    }
  }
];

export const DAILY_CHALLENGES = [
  {
    id: "bike_commute",
    title: "Active Commute",
    description: "Biked, walked, or took public transport instead of driving.",
    carbonSaved: 2.1, // in kg CO2e
    category: "transport"
  },
  {
    id: "plant_diet",
    title: "Green Plate",
    description: "Enjoyed fully plant-based (vegan or vegetarian) meals today.",
    carbonSaved: 3.4,
    category: "food"
  },
  {
    id: "unplug_standby",
    title: "Vampire Power Slayer",
    description: "Unplugged unused chargers, appliances, and turned off lights.",
    carbonSaved: 0.6,
    category: "energy"
  },
  {
    id: "no_plastic",
    title: "Zero Waste Hero",
    description: "Used reusable bags, water bottles, and avoided single-use packaging.",
    carbonSaved: 0.4,
    category: "waste"
  },
  {
    id: "lower_temp",
    title: "Thermostat Setback",
    description: "Lowered heating or raised cooling by 2°C (or used natural ventilation).",
    carbonSaved: 1.2,
    category: "energy"
  }
];

export const INSIGHTS = [
  {
    id: "diet",
    title: "The Impact of What We Eat",
    category: "Food",
    readTime: "3 min read",
    highlight: "Animal agriculture accounts for nearly 14.5% of global greenhouse gas emissions.",
    tips: [
      "Swapping beef for beans or lentils just once a week saves over 300kg of CO2 per year.",
      "Food waste in landfills produces methane, which is 28 times more potent than CO2. Shop smart!",
      "Buying local, seasonal food reduces food miles and energy spent on greenhouse agriculture."
    ]
  },
  {
    id: "energy",
    title: "Smarter Home Energy Use",
    category: "Energy",
    readTime: "4 min read",
    highlight: "Heating and cooling make up over 50% of the average home's utility carbon footprint.",
    tips: [
      "Switching to LED light bulbs consumes 75-80% less energy and lasts 25 times longer.",
      "Wash clothes in cold water. Up to 90% of washing machine energy is used simply to heat the water.",
      "Ensure proper insulation and seal window drafts to reduce heating/cooling waste by 15%."
    ]
  },
  {
    id: "transport",
    title: "Greening Your Commute",
    category: "Transport",
    readTime: "3 min read",
    highlight: "A single return flight from London to New York produces more emissions than the average person in 50 countries does in a year.",
    tips: [
      "For distances under 3 kilometers, consider walking or cycling. It is free and zero-carbon.",
      "Carpooling or taking public transit cuts your individual trip emissions by 50% to 80%.",
      "Drive smoothly: avoiding rapid acceleration and braking can improve fuel mileage by up to 30%."
    ]
  }
];
