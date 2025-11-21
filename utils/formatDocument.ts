import { IForm } from "@/types";

export const findField = (fieldsContainer: any, matcher: string | RegExp) => {
  const arr = asArray(fieldsContainer);
  return arr.find((f: any) => {
    if (!f) return false;
    const name = (f.name ?? f.id ?? '').toString().toLowerCase();
    if (typeof matcher === 'string') return name === matcher.toLowerCase() || name.includes(matcher.toLowerCase());
    return matcher.test(name);
  });
}

export const getFieldValue = (field: any) => {
  if (!field) return null;
  if (typeof field.value !== 'undefined') return field.value;
  if (typeof field === 'string') return field;
  return field.text ?? field.raw ?? null;
}

export const mapMindeeFieldsToForm = (fields: any): Partial<IForm> => {
  if (!fields) return {};

  const mapped: Partial<IForm> = {};

  if (fields.document_number?.value) mapped.idNumber = String(fields.document_number.value);

  if (fields.document_type?.value) mapped.typeOfDocument = String(fields.document_type.value);
  if (fields.nationality?.value) mapped.nationality = String(fields.nationality.value);

  if (fields.date_of_birth?.value) {
    mapped.birthDate = parseDateString(String(fields.date_of_birth.value));
  } else {
    const mrzFields = fields.mrz?.fields;
    if (mrzFields) {
      const f = findField(mrzFields, /birth|date_of_birth|dob|dateofbirth/);
      const val = getFieldValue(f);
      if (val) mapped.birthDate = parseDateString(String(val));
    }
  }

  if (fields.support_number?.value) mapped.supportNumber = String(fields.support_number.value);

  const givenVal = fields.given_names?.value ?? null;
  const surnamesVal = fields.surnames?.value ?? null;

  if (givenVal) mapped.name = String(givenVal).trim();
  if (surnamesVal) {
    const parts = String(surnamesVal).trim().split(/\s+/);
    mapped.firstLastName = parts[0] ?? '';
    mapped.secondLastName = parts.slice(1).join(' ') ?? '';
  }

  if ((!mapped.name || !mapped.firstLastName) && fields.mrz?.fields) {
    const mrzGiven = findField(fields.mrz.fields, /given|names|firstname|name/);
    const mrzSurn = findField(fields.mrz.fields, /surname|surnames|lastname|last/);
    const mg = getFieldValue(mrzGiven);
    const ms = getFieldValue(mrzSurn);
    if (!mapped.name && mg) mapped.name = String(mg);
    if (!mapped.firstLastName && ms) {
      const p = String(ms).trim().split(/\s+/);
      mapped.firstLastName = p[0] ?? '';
      mapped.secondLastName = p.slice(1).join(' ') ?? '';
    }
  }

  if (fields.sex?.value) mapped.gender = String(fields.sex.value);
  else {
    const fSex = fields.mrz && findField(fields.mrz.fields, /sex|gender/);
    const vSex = getFieldValue(fSex);
    if (vSex) mapped.gender = String(vSex);
  }

  if (fields.place_of_birth?.value) {
  }

  if (!mapped.nationality && fields.mrz?.fields) {
    const fNat = findField(fields.mrz.fields, /nationality|country/);
    const vNat = getFieldValue(fNat);
    if (vNat) mapped.nationality = String(vNat);
  }

  return mapped;
}

const parseDateString = (value?: string | null) => {
  if (!value) return { day: '', month: '', year: '' };
  const v = value.trim();
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (iso.test(v)) {
    const [y, m, d] = v.split('-');
    return { day: d, month: m, year: y };
  }
  const sl = /^\d{2}\/\d{2}\/\d{4}$/;
  if (sl.test(v)) {
    const [d, m, y] = v.split('/');
    return { day: d, month: m, year: y };
  }
  const compact = /^\d{8}$/;
  if (compact.test(v)) {
    const y = v.slice(0, 4);
    const m = v.slice(4, 6);
    const d = v.slice(6, 8);
    return { day: d, month: m, year: y };
  }
  const numbers = v.match(/\d{2,4}/g);
  if (numbers && numbers.length >= 3) {
    const [a, b, c] = numbers.slice(0, 3);
    if (a.length === 4) return { day: b.padStart(2, '0'), month: c.padStart(2, '0'), year: a };
    return { day: a.padStart(2, '0'), month: b.padStart(2, '0'), year: c };
  }
  return { day: '', month: '', year: '' };
}

const asArray = (v: any[] | undefined | null): any[] => {
  if (!v) return [];
  return Array.isArray(v) ? v : Object.values(v as any);
}

