/* 常用正则表达式 */

/**
 * 电话号码
 * @param { string } value
 */
export const isPhone = value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);
