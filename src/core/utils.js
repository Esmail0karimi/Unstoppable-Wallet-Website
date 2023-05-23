import Decimal from 'decimal.js'

export function truncate(str, maxLength = 14) {
  if (!str || str.length <= maxLength) return str

  const charsToShow = maxLength - 3,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2)

  return str.substring(0, frontChars) + '...' + str.substring(str.length - backChars)
}

export function subtractDiscount(discount, amount) {
  if (!discount) {
    return amount
  }

  return amount - (discount / 1000 * amount)
}

export function rawAmountToRate(amount) {
  if (!amount) return amount
  return amount / 1000 * 100
}

export function convertFromRawAmount(rawAmount, decimals) {
  return new Decimal(rawAmount).div(new Decimal(10).pow(decimals)).toNumber()
}

export function convertToRawAmount(amount, decimals) {
  return new Decimal(amount).mul(new Decimal(10).pow(decimals)).toNumber()
}

export function convertToDecimals(amount, fromDecimals, toDecimals) {
  if (fromDecimals > toDecimals) {
    return new Decimal(amount).div(new Decimal(10).pow(fromDecimals - toDecimals))
  } else if (fromDecimals < toDecimals) {
    return new Decimal(amount).mul(new Decimal(10).pow(toDecimals - fromDecimals))
  } else {
    return amount
  }
}
