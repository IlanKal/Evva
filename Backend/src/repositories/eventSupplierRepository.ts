import EventSupplier from "../models/EventSupplier";
import { Op } from "sequelize";
import { sequelize } from "../config/db";

export const addSupplierToEvent = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.create({ event_id, supplier_id });
};

export const removeSupplierFromEvent = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.destroy({
    where: { event_id, supplier_id }
  });
};

export const getSuppliersByEvent = async (eventId: string) => {
  return await EventSupplier.findAll({
    where: { event_id: eventId }
  });
};

export const findByEventAndSupplier = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.findOne({ where: { event_id, supplier_id } });
};

export const updateSupplierChoice = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.update(
    {
      approval_status: "CHOSEN",
      chosen_at: new Date(),
      is_final: false,
    },
    {
      where: { event_id, supplier_id },
    }
  );
};

export const createSupplierChoice = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.create({
    event_id,
    supplier_id,
    approval_status: "CHOSEN",
    chosen_at: new Date(),
    is_final: false,
  });
};

export const clearPreviousChosenSupplier = async (
  event_id: number,
  supplier_type: string,
  new_supplier_id: number
) => {
  const [results] = await sequelize.query(
    `
    UPDATE event_suppliers es
    SET approval_status = 'BACKUP', is_final = false
    FROM suppliers s
    WHERE es.supplier_id = s.supplier_id
      AND es.event_id = :event_id
      AND s.supplier_type = :supplier_type
      AND es.approval_status = 'CHOSEN'
      AND es.supplier_id != :new_supplier_id
  `,
    {
      replacements: { event_id, supplier_type, new_supplier_id },
    }
  );

  return results;
};


export const confirmSupplierStatus = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.update(
    {
      approval_status: "APPROVED",
      approved_at: new Date(),
      is_final: true,
    },
    {
      where: { event_id, supplier_id },
    }
  );
};

export const deleteOtherSuppliersOfSameType = async (
  event_id: number,
  supplier_type: string,
  confirmed_supplier_id: number
) => {
  const [results] = await sequelize.query(
    `
    DELETE FROM event_suppliers es
    USING suppliers s
    WHERE es.supplier_id = s.supplier_id
      AND es.event_id = :event_id
      AND s.supplier_type = :supplier_type
      AND es.supplier_id != :confirmed_supplier_id
  `,
    {
      replacements: {
        event_id,
        supplier_type,
        confirmed_supplier_id,
      },
    }
  );

  return results;
};

export const declineSupplierStatus = async (event_id: number, supplier_id: number) => {
  return await EventSupplier.update(
    {
      approval_status: "DECLINED",
      declined_at: new Date(),
      is_final: true,
    },
    {
      where: { event_id, supplier_id },
    }
  );
};