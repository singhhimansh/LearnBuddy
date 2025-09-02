import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
/** 
Manage dynamic classes then handle conflicting classes to avoid unexpected outcomes returns a string of classNames
*/
export const cn = (...classes: ClassValue[]): string =>
  twMerge(clsx(...classes));

export const applyStyles =
  <T extends Record<string, string>>(baseStyles: T) =>
  (
    sx?: Partial<Record<keyof T | "error", ClassValue>>
  ): Record<keyof T | "error", string> => {
    const mergedStyles = {} as Record<keyof T | "error", string>;

    for (const key in baseStyles) {
      if (Object.prototype.hasOwnProperty.call(baseStyles, key)) {
        mergedStyles[key] = cn(baseStyles[key], sx?.[key]);
      }
    }

    if (sx?.error) {
      mergedStyles.error = cn(sx.error);
    }
    return mergedStyles;
  };

export const CoursesStatusMap: Record<string, string> = {
  notstarted: "Not Started",
  inprogress: "In Progress",
  completed: "Completed",
  archived: "Archived",
};
