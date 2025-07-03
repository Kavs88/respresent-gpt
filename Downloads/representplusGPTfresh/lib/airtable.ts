
import axios from "axios";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = "Artists";

interface GetArtistsOptions {
  featuredOnly?: boolean;
}

export async function getArtists(options?: GetArtistsOptions) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
  console.log("ENV - BASE_ID:", BASE_ID);
  console.log("ENV - API_KEY:", AIRTABLE_API_KEY ? "Loaded ✅" : "Missing ❌");
  console.log("Fetching from:", url);

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`
    }
  });
  
  let records = res.data.records;
  
  // Filter for featured artists if requested
  if (options?.featuredOnly) {
    records = records.filter((record: any) => record.fields.Featured === true);
  }
  
  return records;
}
