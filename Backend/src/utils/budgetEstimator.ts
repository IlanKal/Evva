import { Op } from 'sequelize';
import Location from '../models/Location';
import Catering from '../models/Catering';
import Photographer from '../models/Photographer';
import DJ from '../models/DJ';
import Speaker from '../models/Speaker';

export async function estimateMinimumBudget(answers: Record<string, any>): Promise<number> {
  let total = 0;
  const guestCount = Number(answers.guestCount || 0);
  const duration = Number(answers.eventDurationHours || 0);

  console.log('🔍 Estimating minimum budget for event requirements...');
  console.log(`👥 Guests: ${guestCount}, ⏱ Duration: ${duration}h`);

  // 1. Location
  if (answers.needVenue) {
    const locations = await Location.findAll({
      where: {
        capacity: { [Op.gte]: guestCount },
      },
      order: [['price', 'ASC']],
    });
    const cheapestLocation = locations.find(loc => loc.price != null);
    if (cheapestLocation) {
      const price = Number(cheapestLocation.price);
      console.log(`🏠 Location: ${price}₪`);
      total += price;
    } else {
      console.log('⚠️ No suitable location found');
    }
  }

  // 2. Catering
  if (answers.needCatering) {
    const whereClause: any = {};
    if (answers.cateringKosher) whereClause.kosher = true;
    if (answers.cateringVegetarian) whereClause.vegetarian = true;
    if (answers.cateringVegan) whereClause.vegan = true;
    if (answers.cateringGlutenFree) whereClause.gluten_free = true;

    const caterings = await Catering.findAll({
      where: whereClause,
      order: [['price_per_person', 'ASC']],
    });
    const cheapest = caterings.find(c => c.price_per_person != null);
    if (cheapest) {
      const price = Number(cheapest.price_per_person) * guestCount;
      console.log(`🍽 Catering: ${price}₪ (${cheapest.price_per_person}₪ x ${guestCount} guests)`);
      total += price;
    } else {
      console.log('⚠️ No suitable catering found');
    }
  }

  // 3. Photographer
  if (answers.needPhotography) {
    const whereClause: any = {};
    if (answers.photoMagneticPrints) whereClause.has_magnets = true;
    if (answers.photoRegular) whereClause.has_stills = true;
    if (answers.photoVideoRecording) whereClause.has_video = true;

    const photographers = await Photographer.findAll({
      where: whereClause,
      order: [['price_per_hour', 'ASC']],
    });
    const cheapest = photographers.find(p => p.price_per_hour != null);
    if (cheapest) {
      const price = Number(cheapest.price_per_hour) * duration;
      console.log(`📸 Photographer: ${price}₪ (${cheapest.price_per_hour}₪ x ${duration}h)`);
      total += price;
    } else {
      console.log('⚠️ No suitable photographer found');
    }
  }

  // 4. DJ
  if (answers.needDJ) {
    const djs = await DJ.findAll({
      order: [['price_per_hour', 'ASC']],
    });
    const cheapest = djs.find(d => d.price_per_hour != null);
    if (cheapest) {
      const price = Number(cheapest.price_per_hour) * duration;
      console.log(`🎧 DJ: ${price}₪ (${cheapest.price_per_hour}₪ x ${duration}h)`);
      total += price;
    } else {
      console.log('⚠️ No suitable DJ found');
    }
  }

  // 5. Speaker
  if (answers.needSpeaker) {
    const speakers = await Speaker.findAll({
      order: [['price_per_lecture', 'ASC']],
    });
    const cheapest = speakers.find(s => s.price_per_lecture != null);
    if (cheapest) {
      const price = Number(cheapest.price_per_lecture);
      console.log(`🎤 Speaker: ${price}₪`);
      total += price;
    } else {
      console.log('⚠️ No suitable speaker found');
    }
  }

  console.log(`💰 Total minimum required budget: ${total}₪`);
  return total;
}
