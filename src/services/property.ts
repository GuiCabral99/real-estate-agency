import query from "../../infra/database/database";
import { Property } from "../types/property";

export async function getAllProperties() {
  const { rows } = await query("SELECT * FROM properties");
  return rows;
}

export async function getPropertyById(id: number) {
  const { rows } = await query("SELECT * FROM properties WHERE id = $1", [id]);
  return rows[0];
}

export async function createProperty(data: Property) {
  const {
    city,
    neighborhood,
    area,
    built_area,
    sale_price,
    rent_price,
    garage_spots,
    type,
  } = data;

  const { rows } = await query(
    `INSERT INTO properties (city, neighborhood, area, built_area, sale_price, rent_price, garage_spots, type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      city,
      neighborhood,
      area,
      built_area,
      sale_price,
      rent_price,
      garage_spots,
      type,
    ],
  );

  return rows[0];
}

export async function updateProperty(
  id: number,
  data: Property,
): Promise<Property | null> {
  const {
    city = null,
    neighborhood = null,
    area = null,
    built_area = null,
    sale_price = null,
    rent_price = null,
    garage_spots = null,
    type = null,
  } = data;

  const { rows } = await query(
    `UPDATE properties SET 
      city = COALESCE($1, city), 
      neighborhood = COALESCE($2, neighborhood),
      area = COALESCE($3, area), 
      built_area = COALESCE($4, built_area), 
      sale_price = COALESCE($5, sale_price),
      rent_price = COALESCE($6, rent_price), 
      garage_spots = COALESCE($7, garage_spots), 
      type = COALESCE($8, type)
    WHERE id = $9 RETURNING *`,
    [
      city,
      neighborhood,
      area,
      built_area,
      sale_price,
      rent_price,
      garage_spots,
      type,
      id,
    ],
  );

  return rows.length ? rows[0] : null;
}

export async function deleteProperty(id: number): Promise<{ message: string }> {
  await query("DELETE FROM properties WHERE id = $1", [id]);
  return { message: "Propriedade removida com sucesso." };
}
