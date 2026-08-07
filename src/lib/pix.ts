function tlv(id: string, value: string) {
  return id + String(value.length).padStart(2, "0") + value;
}

function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/** Gera o payload BR Code (Pix copia e cola) estático. */
export function buildPixPayload({
  key,
  name,
  city,
  amount,
  txid = "***",
}: {
  key: string;
  name: string;
  city: string;
  amount?: number;
  txid?: string;
}) {
  const merchant =
    tlv("00", "br.gov.bcb.pix") + tlv("01", key);

  let payload =
    tlv("00", "01") +
    tlv("26", merchant) +
    tlv("52", "0000") +
    tlv("53", "986") +
    (amount ? tlv("54", amount.toFixed(2)) : "") +
    tlv("58", "BR") +
    tlv("59", name.slice(0, 25)) +
    tlv("60", city.slice(0, 15)) +
    tlv("62", tlv("05", txid));

  payload += "6304";
  return payload + crc16(payload);
}
