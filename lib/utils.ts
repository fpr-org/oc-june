import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ConversionTooltipPayload = {
  categoryName: string
  fromValue: string
  fromUnitName: string
  fromUnitSymbol: string
  toValue: string
  toUnitName: string
  toUnitSymbol: string
}

export function getConversionTooltipContent(payload: ConversionTooltipPayload) {
  const safeFromValue = payload.fromValue?.trim() || "0"
  const safeToValue = payload.toValue?.trim() || "0"

  return {
    title: `${payload.categoryName} conversion`,
    resultLine: `${safeFromValue} ${payload.fromUnitSymbol} = ${safeToValue} ${payload.toUnitSymbol}`,
    formulaLine: `${safeToValue} ${payload.toUnitName} = ${safeFromValue} ${payload.fromUnitName}`,
  }
}
