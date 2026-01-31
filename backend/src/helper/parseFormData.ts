// src/helper/parseFormData.ts


/* ================= PARSE FORM DATA ================= */
export const parseFormData = (body: Record<string, any>) => {
  const result: any = {};

  for (const key in body) {
    if (!key.includes("[")) {
      result[key] = body[key];
      continue;
    }

    const keys = key.replace(/\]/g, "").split("[");
    let current = result;

    keys.forEach((k, index) => {
      if (index === keys.length - 1) {
        current[k] = body[key];
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    });
  }

  return result;
};
