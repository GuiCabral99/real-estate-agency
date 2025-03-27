import { beforeAll, describe, expect, test } from "vitest";
import { deleteAllProperties } from "../../src/services/property";

describe("Tests with all properties", () => {
  let propertyId;
  const body = {
    city: "Barretos",
    neighborhood: "Centro",
    area: 100,
    built_area: 50,
    sale_price: 500000,
    rent_price: 2500,
    garage_spots: 2,
    type: "house",
  };

  beforeAll(async () => {
    await deleteAllProperties();
  });

  test("Should create a property", async () => {
    const req = await fetch("http://localhost:3000/api/properties", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const newProperty = await req.json();
    propertyId = await newProperty.id;
    expect(newProperty.city).toBe("Barretos");
  });

  test("Should return all properties", async () => {
    const req = await fetch("http://localhost:3000/api/properties");
    const properties = await req.json();
    expect(properties.length).toBeGreaterThanOrEqual(1);
    expect(properties[0].city).toBe("Barretos");
  });

  test("Should return a property through its id", async () => {
    const req = await fetch(
      `http://localhost:3000/api/properties/${propertyId}`,
    );
    const property = await req.json();
    expect(property.city).toBe("Barretos");
  });

  test("Should modificate a property", async () => {
    const req = await fetch(
      `http://localhost:3000/api/properties/${propertyId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          city: "Olimpia",
        }),
      },
    );
    const property = await req.json();
    expect(property.city).toBe("Olimpia");
  });

  test("Should delete a property", async () => {
    await fetch(`http://localhost:3000/api/properties/${propertyId}`, {
      method: "DELETE",
    });

    const req = await fetch(
      `http://localhost:3000/api/properties/${propertyId}`,
    );
    const property = await req.json();
    expect(property).toHaveProperty("error");
  });
});
