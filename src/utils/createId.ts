export const nowDate = new Date().toISOString();

export const createId = ():number => Date.parse(nowDate)
