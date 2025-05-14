// src/services/filterRelevantSuppliers.ts
import { Op } from "sequelize";
import { EventRequest, Supplier, Location, Catering, DJ, Photographer, Speaker } from "../models";
import {
    LocationPreferences,
    CateringPreferences,
    DJPreferences,
    PhotographerPreferences,
    LecturerPreferences,
  } from "../types/EventPreferences"; 



//  שליפת פרטי הבקשה של הלקוח
// כדאי לשקול עטיפה של הקוד הזה בטריי וקאץ או טיפול מרכזי בארור
export const filterRelevantSuppliers = async (requestId: number) => {
  const eventRequest = await EventRequest.findByPk(requestId);
  if (!eventRequest) {
    throw new Error("❌ Event request not found");
  }


//שליפת משתנים מתוך הבקשה
  const {
    event_date,
    budget,
    guest_count,
    location,
    location_preferences,
    catering_preferences,
    dj_preferences,
    photographer_preferences,
    lecturer_preferences,
  } = eventRequest.get() as {
    event_date: string;
    budget: number;
    guest_count: number;
    location?: string;
    location_preferences?: LocationPreferences;
    catering_preferences?: CateringPreferences;
    dj_preferences?: DJPreferences;
    photographer_preferences?: PhotographerPreferences;
    lecturer_preferences?: LecturerPreferences;
  };


  // המרה מהתאריך הרצוי של הלקוח ליום בשבוע (לבדיקת זמינות הספקים)
  const eventDay = new Date(event_date).toLocaleDateString("en-US", { weekday: "long" });


  // פונקציה כללית לפי זמינות ימים ולפי האזור 
  const filterByAvailabilityAndRegion = (region?: string) => {
    const regionCondition =
      !region || region === "All"
        ? {}
        : {
            region: {
              [Op.or]: [region, "All"],
            },
          };
  
    return {
      [Op.and]: [
        regionCondition,
        {
          available_days: {
            [Op.contains]: [eventDay],
          },
        },
      ],
    };
  };

  const result: any = {};

  // מיקומים
  if (location_preferences) {
    const whereLocation: any = {
    };
    if (location_preferences.parking !== undefined) {
      whereLocation.parking = location_preferences.parking;
    }
    if (guest_count) {
        whereLocation.capacity = { [Op.gte]: guest_count };
      }
      if (budget) {
        whereLocation.price = { [Op.lte]: Number(budget) };
      }

    const locations = await Location.findAll({
      where: whereLocation,
      include: [
        {
          model: Supplier,
          where: filterByAvailabilityAndRegion(location), 
        },
      ],
    });
    result.locations = locations;
  }

  // קייטרינג
  if (catering_preferences) {
    const whereCatering: any = {};
    if (catering_preferences.kosher) whereCatering.kosher = true;
    if (catering_preferences.vegetarian) whereCatering.vegetarian = true;
    if (catering_preferences.vegan) whereCatering.vegan = true;
    if (catering_preferences.gluten_free) whereCatering.gluten_free = true;
  
    if (budget && guest_count) {
      whereCatering.price_per_person = {
        [Op.lte]: Number(budget) / guest_count,
      };
    }
  
    const catering = await Catering.findAll({
      where: whereCatering,
      include: [
        {
          model: Supplier,
          where: filterByAvailabilityAndRegion(location),
        },
      ],
    });
    result.catering = catering;
  }
  

  // DJ
  if (dj_preferences) {
    const whereDJ: any = {};
    if (dj_preferences.music_styles?.length) {
      whereDJ.music_styles = {
        [Op.overlap]: dj_preferences.music_styles,        
      };
    }
  
    if (budget) {
      whereDJ.price_per_hour = {
        [Op.lte]:  Number(budget)
      };
    }
  
    const djs = await DJ.findAll({
      where: whereDJ,
      include: [
        {
          model: Supplier,
          where: filterByAvailabilityAndRegion(location),
        },
      ],
    });
    result.djs = djs;
  }
  

  // צלם
  if (photographer_preferences) {
    const wherePhoto: any = {};
    if (photographer_preferences.has_stills) wherePhoto.has_stills = true;
    if (photographer_preferences.has_video) wherePhoto.has_video = true;
    if (photographer_preferences.has_magnets) wherePhoto.has_magnets = true;
  
    if (budget) {
      wherePhoto.price_per_hour = {
        [Op.lte]: Number(budget),
      };
    }
  
    const photographers = await Photographer.findAll({
      where: wherePhoto,
      include: [
        {
          model: Supplier,
          where: filterByAvailabilityAndRegion(location),
        },
      ],
    });
    result.photographers = photographers;
  }
  

  // מרצה
  if (lecturer_preferences) {
    const whereSpeaker: any = {};
    
    if (budget) {
      whereSpeaker.price_per_lecture = {
        [Op.lte]: Number(budget),
      };
    }
  
    const speakers = await Speaker.findAll({
      where: whereSpeaker,
      include: [
        {
          model: Supplier,
          where: filterByAvailabilityAndRegion(location),
        },
      ],
    });
    result.speakers = speakers;
  }
  
  return result;
};
