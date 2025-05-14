import * as XLSX from 'xlsx';

export interface GuestInput {
  full_name: string;
  email: string;
  phone?: string;
}

/**
 * Parses an uploaded Excel buffer to an array of GuestInput.
 * @param buffer The file buffer (from multer)
 * @returns GuestInput[]
 */
export function parseExcelToGuests(buffer: Buffer): GuestInput[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawData = XLSX.utils.sheet_to_json<any>(sheet, { defval: '' });

  const guests: GuestInput[] = [];

  rawData.forEach((row, index) => {
    const fullName = row.full_name?.trim();
    const email = row.email?.trim();
    const phone = row.phone?.toString().trim();

    if (!fullName || !email) {
      // Skip rows missing mandatory fields
      console.warn(`Row ${index + 2} skipped: missing full_name or email`);
      return;
    }

    guests.push({
      full_name: fullName,
      email,
      phone: phone || undefined,
    });
  });

  return guests;
}
