import EventSupplier from "../models/EventSupplier";
import Supplier from "../models/Supplier";
import DJ from "../models/DJ";
import Photographer from "../models/Photographer";
import Catering from "../models/Catering";
import Speaker from "../models/Speaker";
import Location from "../models/Location";
import event from "../models/event"; 
import EventRequest from "../models/EventRequest";

// תרגום מסטטוס טכני לסטטוס עסקי
const mapStatus = (
  suppliers: EventSupplier[]
): "APPROVED" | "DECLINED" | "PENDING" | "NOT_CHOSEN" => {
  if (suppliers.some((s) => s.approval_status === "APPROVED")) return "APPROVED";
  if (suppliers.some((s) => s.approval_status === "CHOSEN")) return "PENDING";
  if (suppliers.some((s) => s.approval_status === "DECLINED")) return "DECLINED";
  return "NOT_CHOSEN";
};

// פונקציה שמחזירה include דינמי לפי סוג הספק
const getModelIncludeByType = (type: string) => {
  switch (type) {
    case "dj":
      return [{ model: DJ, as: "djs" }];
    case "photographer":
      return [{ model: Photographer, as: "photographers" }];
    case "catering":
      return [{ model: Catering, as: "caterings" }];
    case "speaker":
      return [{ model: Speaker, as: "speakers" }];
    case "location":
      return [{ model: Location, as: "locations" }];
    default:
      return [];
  }
};

export const getEventSupplierStatus = async (event_id: number) => {
  // שלב 1 – שליפת האירוע והבקשה
  const eventInstance = await event.findOne({
    where: { event_id },
    include: [{
  model: EventRequest,
  as: "EventRequest"
}]
  });

  if (!eventInstance) {
    throw new Error("Event not found");
  }

  const eventRequest = (eventInstance as any).EventRequest?.toJSON();

  // שלב 2 – שליפת הספקים לפי קטגוריה
  const typeMapping = {
  dj: "dj_preferences",
  photographer: "photographer_preferences",
  catering: "catering_preferences",
  speaker: "lecturer_preferences",
  location: "location_preferences",
};

// בודק לפי שדות לא null בבקשת האירוע
const allTypes = Object.entries(typeMapping)
  .filter(([_, preferenceKey]) => eventRequest?.[preferenceKey] !== null)
  .map(([type]) => type);


  const result: {
    [supplier_type: string]: {
      status: "APPROVED" | "DECLINED" | "PENDING" | "NOT_CHOSEN";
      suppliers: any[];
    };
  } = {};

  for (const type of allTypes) {
    const suppliers = await EventSupplier.findAll({
      where: { event_id },
      include: [
        {
          model: Supplier,
          as: "Supplier",
          where: { supplier_type: type },
          include: getModelIncludeByType(type),
        },
      ],
    });

    const status = mapStatus(suppliers);

    if (status === "APPROVED") {
      const approved = suppliers.find((s) => s.approval_status === "APPROVED");
      result[type] = {
        status,
        suppliers: approved
          ? [{
              ...approved.Supplier?.toJSON(),
              approval_status: approved.approval_status,
            }]
          : [],
      };
    } else {
      const sortedList = [...suppliers].sort((a, b) => {
        if (a.approval_status === "SUGGESTED") return -1;
        if (b.approval_status === "SUGGESTED") return 1;
        return 0;
      });

      result[type] = {
        status,
        suppliers: sortedList.map((s) => ({
          ...s.Supplier?.toJSON(),
          approval_status: s.approval_status,
        })),
      };
    }
  }

  return {
    event_id,
    event_request: eventRequest,
    supplier_status_by_type: result,
  };
};
